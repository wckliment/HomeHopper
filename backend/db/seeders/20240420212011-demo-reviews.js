'use strict';

const { Review} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in the options object for the production environment
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Reviews table
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: "Went skiing, hiking, and played in the snow!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        review: "Moden art made me feel like I was in a museum! Was so much fun.",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        review: "Truly the American Dream Neighboor living never felt better.",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        userId: 5,
        review: "Huge house but was way too expensive!",
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
 {
        spotId: 3,
        userId: 1,
        review: "Was an amazing adventure. Our family was so impressed can't wait to come back!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    });
  }
};
