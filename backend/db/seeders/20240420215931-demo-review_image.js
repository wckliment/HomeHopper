'use strict';

const { Review_Images } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Review_Images table
    await Review_Images.bulkCreate([
      {
        reviewId: 1,
        url: "https://example.com/image1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 2,
        url: "https://example.com/image2.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        reviewId: 3,
        url: "https://example.com/image3.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Review_Images', null, {});
  }
};
