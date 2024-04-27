const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, Spot, User } = require('../../db/models');
const { Op } = require("sequelize");



// Validator middleware for booking dates
const validateBookingDates = [
  check('startDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('startDate must be a valid date in YYYY-MM-DD format'),
  check('endDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('endDate must be a valid date in YYYY-MM-DD format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
  handleValidationErrors
];



// Validator middleware
const validateBooking = [
  check('startDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('startDate must be a valid date in YYYY-MM-DD format')
    .custom((value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new Error("startDate cannot be in the past");
      }
      return true;
    }),
  check('endDate')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('endDate must be a valid date in YYYY-MM-DD format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
  handleValidationErrors
];

// get all current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  try {
    // Assuming req.user.id contains the ID of the authenticated user
    const userId = req.user.id;

    const bookings = await Booking.findAll({
      where: { userId },
      include: [{
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
      }],
      order: [['createdAt', 'DESC']] // Ordering by creation date, newest first
    });

    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate.toISOString().split('T')[0], // format as "YYYY-MM-DD"
      endDate: booking.endDate.toISOString().split('T')[0],     // format as "YYYY-MM-DD"
      createdAt: booking.createdAt.toISOString(),                // keep the full timestamp
      updatedAt: booking.updatedAt.toISOString(),                // keep the full timestamp
      Spot: {
        ...booking.Spot.get({ plain: true }),
        lat: parseFloat(booking.Spot.lat),
        lng: parseFloat(booking.Spot.lng),
        price: parseInt(booking.Spot.price, 10)
      }
    }));


    res.status(200).json({ Bookings: bookings });
  } catch (error) {
    console.error('Failed to fetch bookings', error);
    res.status(500).json({ message: "Internal server error" });
  }
});





// POST a new booking for a spot
router.post('/spots/:spotId/bookings', requireAuth, validateBooking, async (req, res) => {
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


// PUT - Update an existing booking
router.put('/bookings/:bookingId', requireAuth, validateBookingDates, async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to edit this booking" });
    }

    if (new Date(booking.endDate) < new Date()) {
      return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    // Check for booking conflicts except with the current booking
    const conflict = await Booking.findOne({
      where: {
        id: { [Op.ne]: bookingId },
        spotId: booking.spotId,
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

    if (conflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking"
        }
      });
    }

    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    console.error('Failed to update booking', error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE - Delete an existing booking
router.delete('/bookings/:bookingId', requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  try {
    const booking = await Booking.findByPk(bookingId, {
      include: [{
        model: Spot,
        attributes: ['ownerId']
      }]
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // Check if the booking belongs to the user or if the spot belongs to the user
    const isOwner = booking.userId === userId || booking.Spot.ownerId === userId;

    // Prevent deletion if the booking has already started
    if (new Date(booking.startDate) <= new Date()) {
      return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    if (!isOwner) {
      return res.status(403).json({ message: "Unauthorized to delete this booking" });
    }

    await booking.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error('Failed to delete booking', error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
