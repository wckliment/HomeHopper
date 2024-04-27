'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in the options object for the production environment
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Spot', {
      previewImage: Sequelize.literal(`CASE
        WHEN address = '123 Disney Lane' THEN 'https://example.com/disney.jpg'
        WHEN address = '456 Pixar St' THEN 'https://example.com/pixar.jpg'
        WHEN address = '789 Marvel Ave' THEN 'https://example.com/marvel.jpg'
        ELSE previewImage
      END`)
    }, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Spot', {
      previewImage: null
    }, {});
  }
};
