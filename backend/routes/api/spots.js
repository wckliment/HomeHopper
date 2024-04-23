const express = require('express');
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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

// GET all spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll({
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
    });
    res.status(200).json({ Spots: spots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  try {
    // Assuming req.user is set by the requireAuth middleware and contains the user's ID
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
      where: { ownerId: ownerId },
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt']
    });
    res.status(200).json({ Spots: spots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:spotId', async (req, res) => {
  try {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
          attributes: ['id', 'userId', 'spotId', 'rating', 'review'],
          as: 'reviews'
        },
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview'],
          as: 'spotImages'
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
          as: 'owner'
        }
      ]
    });
        if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    res.status(200).json(result);
  } catch (error) {
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
  check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
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
      id: image.id,
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
  check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
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





module.exports = router;
