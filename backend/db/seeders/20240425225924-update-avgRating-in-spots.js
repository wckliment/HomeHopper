'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in the options object for the production environment
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Spots', {
      avgRating: Sequelize.literal(`CASE
        WHEN address = '123 Disney Lane' THEN '4.5'
        WHEN address = '456 Pixar St' THEN '4.8'
        WHEN address = '789 Marvel Ave' THEN '4.7'
        ELSE avgRating
      END`)
    }, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('Spots', {
      avgRating: null
    }, {});
  }
};
