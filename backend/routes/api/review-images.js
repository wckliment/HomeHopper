const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Reviewimage, Review } = require('../../db/models');



// DELETE a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    // Find the image including the associated Review to check ownership
    const image = await Reviewimage.findByPk(imageId, {
      include: [{
        model: Review,
        attributes: ['userId']
      }]
    });

    // Check if the image exists and if the user owns the review
    if (!image || image.Review.userId !== userId) {
      return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    // Delete the image
    await image.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    // Handle any other errors
    res.status(500).json({ message: "Failed to delete the image", error: error.message });
  }
});

module.exports = router;
