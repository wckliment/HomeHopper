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
        review: "Great place to learn programming!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 2,
        review: "Awesome creativity hub!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 3,
        review: "Amazing superhero experience!",
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 2,
        review: "Very informative courses!",
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    });
  }
};
