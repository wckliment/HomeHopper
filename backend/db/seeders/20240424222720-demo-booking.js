'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: new Date(2023, 4, 10), // Using JavaScript Date constructor: Year, Month (0-indexed), Day
        endDate: new Date(2023, 4, 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date(2023, 5, 15),
        endDate: new Date(2023, 5, 20),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date(2023, 6, 1),
        endDate: new Date(2023, 6, 3),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      [Op.or]: [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date(2023, 4, 10).toISOString().slice(0, 10), // ISO string format for YYYY-MM-DD
          endDate: new Date(2023, 4, 12).toISOString().slice(0, 10)
        },
        {
          spotId: 1,
          userId: 2,
          startDate: new Date(2023, 5, 15).toISOString().slice(0, 10),
          endDate: new Date(2023, 5, 20).toISOString().slice(0, 10)
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date(2023, 6, 1).toISOString().slice(0, 10),
          endDate: new Date(2023, 6, 3).toISOString().slice(0, 10)
        }
      ]
    });
  }
};
