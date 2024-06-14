'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 4,
        address: "123 Victory Circle",
        city: "Santa Clause",
        state: "IN",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Santa Clause: Nearby Attractions and Cozy Getaway",
        description: "A snowy getaway for those that love an adventure.",
        price: 215,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 2,
        address: "123 Maple Grove Lane, Suite 4B",
        city: "Manhattan",
        state: "NY",
        country: "United States of America",
        lat: 37.832492,
        lng: -122.283468,
        name: "Chic City Haven: Modern Flat with Stunning Views",
        description: "Stylish urban flat with city views, modern art, WiFi, and parking.",
        price: 325,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: "465 Elmwood Ave",
        city: "Carbondale",
        state: "IL",
        country: "United States of America",
        lat: 34.052235,
        lng: -118.243683,
        name: "Urban Family Living: The American Dream",
        description: "Modern house with stunning views. Dog not included.",
        price: 385,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 5,
        address: "5897 Woodhaven Circle",
        city: "Cherry Hills",
        state: "CO",
        country: "United States of America",
        lat: 31.056235,
        lng: -116.245683,
        name: "Lavish Luxury Home Available To Stay",
        description: "Luxurious home located in metro Denver. Breathtaking architecture, spacious Rooms, 7 bed, 8 bath house.",
        price: 725,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        ownerId: 1,
        address: "1313 Eerie Hollow Lane",
        city: "Shadowville",
        state: "MO",
        country: "United States of America",
        lat: 32.256383,
        lng: -114.243683,
        name: "The Haunted Haven on Eerie Hollow",
        description: "Welcome to Eerie Hollow! This haunted mansion features creaky floors, ghostly whispers, and eerie shadows. Perfect for thrill-seekers and paranormal enthusiasts!",
        price: 485,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {

        ownerId: 6,
        address: "123 Seaside Ln",
        city: "Nantucket",
        state: "MA",
        country: "United States of America",
        lat: 37.256383,
        lng: -110.243683,
        name: "Seaside Serenity Cottage",
        description: "Charming coastal cottage with stunning ocean views and cozy decor.",
        price: 520,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 5,
        address: "456 Brickstone Ave, Apt 12B",
        city: "New York",
        state: "NY",
        country: "United States of America",
        lat: 32.256383,
        lng: -117.243683,
        name: "Brickstone Haven Apartments",
        description: "Modern brick apartment with city views, stylish interiors, and convenient amenities.",
        price: 395,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ownerId: 1,
        address: "789 Lone Star Lane, Apt 5C",
        city: "Houston",
        state: "TX",
        country: "United States of America",
        lat: 31.256383,
        lng: -115.243683,
        name: "Lone Star Studio Retreat",
        description: "Contemporary studio apartment in downtown Houston with great city views and cozy comfort.",
        price: 285,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

 async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: [
        '123 Victory Circle',
        '123 Maple Grove Lane, Suite 4B',
        '465 Elmwood Ave',
        '5897 Woodhaven Circle',
        '1313 Eerie Hollow Lane',
        '123 Seaside Ln',
        '456 Brickstone Ave, Apt 12B',
        '789 Lone Star Lane, Apt 5C'
      ]}
    }, {});
  }
};
