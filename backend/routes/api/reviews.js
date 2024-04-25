const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, User, Spot, Reviewimage } = require('../../db/models');

const validateReviewInput = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 10 })
    .withMessage('Review must be at least 10 characters long.'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be a number between 1 and 5.'),
  handleValidationErrors
];

const validateReviewUpdate = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

//Get all reviews of the current user

router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        { model: User, as: 'User', attributes: ['id', 'firstName', 'lastName'] },
        { model: Spot, as: 'Spot', attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'] },
        { model: Reviewimage, as: 'ReviewImages', attributes: ['id', 'url'] }
      ]
    });
    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    next(error);
  }
});

// Get all reviews for a specific spot
router.get('/spots/:spotId/reviews', async (req, res, next) => {
  const spotId = req.params.spotId;
  try {
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
      ]
    });
    if (!reviews.length) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    next(error);
  }
});

// POST a new review for a spot
router.post('/spots/:spotId/reviews', requireAuth, validateReviewInput, async (req, res, next) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    const existingReview = await Review.findOne({
      where: {
        userId: userId,
        spotId: spotId
      }
    });
    if (existingReview) {
      return res.status(500).json({ message: "User already has a review for this spot" });
    }
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });
    res.status(201).json(newReview);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ message: "Validation error", errors: error.errors.map(e => e.message) });
    } else {
      next(error);
    }
  }
});

// PUT - Update an existing review
router.put('/reviews/:reviewId', requireAuth, validateReviewUpdate, async (req, res, next) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  try {
    const existingReview = await Review.findOne({
      where: {
        id: reviewId,
        userId: userId
      }
    });

    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    res.status(200).json({
      id: existingReview.id,
      userId: existingReview.userId,
      spotId: existingReview.spotId,
      review: existingReview.review,
      stars: existingReview.stars,
      createdAt: existingReview.createdAt,
      updatedAt: new Date() // Ensure updated date is current
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ message: "Validation error", errors: error.errors.map(e => e.message) });
    } else {
      next(error);
    }
  }
});

module.exports = router;
