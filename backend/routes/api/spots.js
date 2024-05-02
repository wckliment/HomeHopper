const express = require('express');
const { Spot, Review, SpotImage, Reviewimage, User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


/**
 * Formats a Date object to a string in the format 'YYYY-MM-DD HH:MM:SS'.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string.
 */
function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

const validateSpot = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Spot name is required.'),
  check('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number.'),
  // Add more validators as needed
  handleValidationErrors
];

const validateReviewInput = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be a number between 1 and 5.'),
  handleValidationErrors
];

// Validator middleware
const validateBooking = [
  check('startDate')
    .isISO8601()
    .withMessage('startDate must be a valid date in YYYY-MM-DD format')
    .custom((value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new Error("startDate cannot be in the past");
      }
      return true;
    }),
  check('endDate')
    .isISO8601()
    .withMessage('endDate must be a valid date in YYYY-MM-DD format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
  handleValidationErrors
];



// GET all spots

router.get('/', async (req, res) => {
  // Extract query parameters with defaults
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 20;
  const minLat = req.query.minLat;
  const maxLat = req.query.maxLat;
  const minLng = req.query.minLng;
  const maxLng = req.query.maxLng;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;

  const where = {}; // Filter conditions

  // Add latitude and longitude filters
  if (minLat && maxLat) {
    where.lat = { [Op.between]: [minLat, maxLat] };
  } else {
    if (minLat) where.lat = { [Op.gte]: minLat };
    if (maxLat) where.lat = { [Op.lte]: maxLat };
  }

  if (minLng && maxLng) {
    where.lng = { [Op.between]: [minLng, maxLng] };
  } else {
    if (minLng) where.lng = { [Op.gte]: minLng };
    if (maxLng) where.lng = { [Op.lte]: maxLng };
  }

  // Add price filters
  if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
  if (maxPrice) where.price = { [Op.lte]: parseFloat(maxPrice) };

  try {
    const totalSpots = await Spot.count({ where });
    const spots = await Spot.findAll({
      where,
      include: [{
        model: Review,
        as: 'Reviews',
        attributes: ['stars'] // Fetching 'stars' instead of 'rating'
      }],
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
      limit: size,
      offset: (page - 1) * size
    });

    const spotsWithAvgRating = spots.map(spot => {
      const stars = spot.Reviews.map(review => review.stars); // Using 'stars' field
      const avgRating = stars.length ? stars.reduce((a, b) => a + b, 0) / stars.length : null;
      return {
        ...spot.get({ plain: true }),
        avgRating // Adding dynamically calculated average rating
      };
    });

    res.status(200).json({
      Spots: spotsWithAvgRating,
      page,
      size,
      totalPages: Math.ceil(totalSpots / size)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews by a Spot's Id
router.get('/:spotId/reviews', async (req, res, next) => {
  const spotId = req.params.spotId;
  try {
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        { model: User, as: 'User', attributes: ['id', 'firstName', 'lastName'] },
        { model: Reviewimage, as: 'ReviewImages', attributes: ['id', 'url'] }
      ]
    });

    if (!reviews.length) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Filter out reviews that do not have associated images
    const filteredReviews = reviews.filter(review => review.ReviewImages.length > 0);

    if (!filteredReviews.length) {
      return res.status(404).json({ message: "No reviews with images found for this spot" });
    }

    // Restructure each review to match the desired output format
    const formattedReviews = filteredReviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: formatDate(review.createdAt), // Assuming formatDate is defined as shown previously
      updatedAt: formatDate(review.updatedAt),
      User: {
        id: review.User.id,
        firstName: review.User.firstName,
        lastName: review.User.lastName
      },
      ReviewImages: review.ReviewImages.map(image => ({
        id: image.id,
        url: image.url
      }))
    }));

    res.status(200).json({ Reviews: formattedReviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    next(error);
  }
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  try {
    // Assuming req.user is set by the requireAuth middleware and contains the user's ID
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
      where: { ownerId: ownerId },
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt', 'avgRating', 'previewImage']
    });
    res.status(200).json({ Spots: spots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get Details of a Spot from an ID
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
          as: 'Reviews', // Ensure this alias matches your model association
          attributes: ['id', 'stars'] // Fetch 'id' and 'stars' for avg calculation
        },
        {
          model: SpotImage,
          as: 'SpotImages', // Ensure this alias matches your model association
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'owner', // Ensure this alias matches your model association
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Calculate average stars
    let avgRating = null;
    if (spot.Reviews.length > 0) {
      const sumStars = spot.Reviews.reduce((acc, review) => acc + review.stars, 0);
      avgRating = sumStars / spot.Reviews.length;
    }

    // Prepare the data according to the specifications
    const response = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: spot.Reviews.length,
      avgRating: avgRating,  // Include the dynamically calculated average stars
      SpotImages: spot.SpotImages.map(image => ({
        id: image.id,
        url: image.url,
        preview: image.preview
      })),
      Owner: {
        id: spot.owner.id,
        firstName: spot.owner.firstName,
        lastName: spot.owner.lastName
      }
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Failed to fetch spot details', error);
    res.status(500).json({ error: error.message });
  }
});

//Create a Spot
const validateSpotCreation = [
  check('address').not().isEmpty().withMessage('Street address is required'),
  check('city').not().isEmpty().withMessage('City is required'),
  check('state').not().isEmpty().withMessage('State is required'),
  check('country').not().isEmpty().withMessage('Country is required'),
  check('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be within -90 and 90'),
  check('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be within -180 and 180'),
  check('name').isLength({ min:5, max: 50 }).withMessage('Name must be more than 5 characters and less than 50 characters'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

router.post('/', requireAuth, validateSpotCreation, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  try {
    const newSpot = await Spot.create({
      ownerId: req.user.id, // Assuming req.user is populated by the requireAuth middleware
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(201).json(newSpot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Add an image to a spot based on the spots id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  try {
    const spot = await Spot.findByPk(spotId);

    // Check if spot exists and belongs to the current user
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: You do not own this spot" });
    }

    // Create the image
    const image = await SpotImage.create({
      spotId,
      url,
      preview
    });

    return res.status(201).json({
      id:image.id,
      url: image.url,
      preview: image.preview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Edit a Spot
const validateSpotUpdate = [
  check('address').not().isEmpty().withMessage('Street address is required'),
  check('city').not().isEmpty().withMessage('City is required'),
  check('state').not().isEmpty().withMessage('State is required'),
  check('country').not().isEmpty().withMessage('Country is required'),
  check('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be within -90 and 90'),
  check('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be within -180 and 180'),
  check('name').isLength({ min: 5, max: 50 }).withMessage('Name must be more than 5 characters and less than 50 characters'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('price').isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

router.put('/:spotId', requireAuth, validateSpotUpdate, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: You do not own this spot" });
    }

    // Update the spot
    spot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });
    await spot.save();

    res.status(200).json(spot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: You do not own this spot" });
    }

    await spot.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReviewInput, async (req, res, next) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  // Log incoming request details
  console.log("Attempting to post a new review:");
  console.log("User ID:", userId, "Spot ID:", spotId, "Review:", review, "Stars:", stars);

  try {
    // Check if the spot exists
    console.log("Checking if spot exists with ID:", spotId);
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      console.error("No spot found with ID:", spotId);
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check for an existing review by this user for this spot
    console.log("Checking for existing review by user ID:", userId, "for spot ID:", spotId);
    const existingReview = await Review.findOne({
      where: {
        userId: userId,
        spotId: spotId
      }
    });
    if (existingReview) {
      console.error("Review already exists for user:", userId, "and spot:", spotId);
      return res.status(409).json({ message: "User already has a review for this spot" }); // Changed from 500 to 409
    }

    // Create the new review
    console.log("Creating new review for user ID:", userId, "at spot ID:", spotId);
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });

    console.log("Review created successfully:", newReview);
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ message: "Validation error", errors: error.errors.map(e => e.message) });
    } else {
      next(error);
    }
  }
});


// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const bookings = await Booking.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Check if the current user is the owner of the spot
    const isOwner = spot.ownerId === userId;
    const response = bookings.map(booking => {
      if (isOwner) {
        return {
          User: {
            id: booking.User.id,
            firstName: booking.User.firstName,
            lastName: booking.User.lastName
          },
          id: booking.id,
          spotId: booking.spotId,
          userId: booking.userId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt
        };
      } else {
        return {
          spotId: booking.spotId,
          startDate: booking.startDate,
          endDate: booking.endDate
        };
      }
    });

    res.status(200).json({ Bookings: response });
  } catch (error) {
    console.error('Failed to fetch bookings for spot', error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//Create a Booking from a Spot based on the Spot's id

router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
      return res.status(403).json({ message: "Cannot book your own spot" });
    }

    // Check for booking conflicts
    const existingBooking = await Booking.findOne({
      where: {
        spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate]
            }
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
        }
      });
    }

    // Create the booking
    const booking = await Booking.create({
      userId,
      spotId,
      startDate,
      endDate
    });

    res.status(200).json(booking);
  } catch (error) {
    console.error('Failed to create booking', error);
    res.status(500).json({ message: "Internal server error" });
  }
});





module.exports = router;
