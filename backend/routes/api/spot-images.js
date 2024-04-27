const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');



// DELETE a spot image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    // Find the image and include the associated Spot to check ownership
    const image = await SpotImage.findByPk(imageId, {
      include: {
        model: Spot,
        attributes: ['ownerId']
      }
    });

    // Check if image exists and if the user owns the spot
    if (!image || image.Spot.ownerId !== userId) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    // Delete the image
    await image.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
