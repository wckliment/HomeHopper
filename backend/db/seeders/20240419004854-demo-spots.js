'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // Define your schema in the options object for the production environment
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: "456 Pixar St",
        city: "Emeryville",
        state: "California",
        country: "United States of America",
        lat: 37.832492,
        lng: -122.283468,
        name: "Pixar Studios",
        description: "Creativity lives here",
        price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 3,
        address: "789 Marvel Ave",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.052235,
        lng: -118.243683,
        name: "Marvel Headquarters",
        description: "Home of the Superheroes",
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Removed the entry for ownerId 4
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Disney Lane', '456 Pixar St', '789 Marvel Ave'] }
    }, {});
  }
};

