const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Review, User, Spot, Reviewimage } = require('../../db/models');



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




// PUT - Update an existing review
router.put('/:reviewId', requireAuth, validateReviewUpdate, async (req, res, next) => {
  console.log('Put - Edit existing review');
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
    console.log(existingReview, 'existingReview', userId, 'userId', reviewId, 'reviewId');


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



// POST an image to a review
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const userId = req.user.id;

  try {
    // Check if the review exists and belongs to the current user
    const review = await Review.findOne({
      where: {
        id: reviewId,
        userId: userId // ensures the review belongs to the current user
      }
    });

    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found or doesn't belong to the current user"
      });
    }

    // Check if the review already has 10 images
    const countImages = await Reviewimage.count({
      where: { reviewId: review.id }
    });

    if (countImages >= 10) {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached"
      });
    }

    // Create the new review image
    const newImage = await Reviewimage.create({
      reviewId: review.id,
      url: url
    });

    res.status(200).json(newImage);
  } catch (error) {
    console.error('Failed to add image to review:', error);
    next(error);
  }
});

module.exports = router;
