'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/7031405/pexels-photo-7031405.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/7031404/pexels-photo-7031404.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/7031414/pexels-photo-7031414.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/7031412/pexels-photo-7031412.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/7031411/pexels-photo-7031411.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/9557600/pexels-photo-9557600.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/4502973/pexels-photo-4502973.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/4916534/pexels-photo-4916534.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/4940760/pexels-photo-4940760.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/19604928/pexels-photo-19604928/free-photo-of-modern-house-with-pool-on-patio.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/5129555/pexels-photo-5129555.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/137102/pexels-photo-137102.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/9197067/pexels-photo-9197067.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/771023/pexels-photo-771023.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      url: {
        [Op.in]: [
          'https://images.pexels.com/photos/7031405/pexels-photo-7031405.jpeg',
          'https://images.pexels.com/photos/7031404/pexels-photo-7031404.jpeg',
          'https://images.pexels.com/photos/7031414/pexels-photo-7031414.jpeg',
          'https://images.pexels.com/photos/7031412/pexels-photo-7031412.jpeg',
          'https://images.pexels.com/photos/7031411/pexels-photo-7031411.jpeg',
          'https://images.pexels.com/photos/9557600/pexels-photo-9557600.jpeg',
          'https://images.pexels.com/photos/4502973/pexels-photo-4502973.jpeg',
          'https://images.pexels.com/photos/4916534/pexels-photo-4916534.jpeg',
          'https://images.pexels.com/photos/4940760/pexels-photo-4940760.jpeg',
          'https://images.pexels.com/photos/19604928/pexels-photo-19604928/free-photo-of-modern-house-with-pool-on-patio.jpeg',
          'https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg',
          'https://images.pexels.com/photos/5129555/pexels-photo-5129555.jpeg',
          'https://images.pexels.com/photos/137102/pexels-photo-137102.jpeg',
          'https://images.pexels.com/photos/9197067/pexels-photo-9197067.jpeg',
          'https://images.pexels.com/photos/771023/pexels-photo-771023.jpeg'
        ]
      }
    }, {});
  }
};
