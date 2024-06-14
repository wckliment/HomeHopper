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
        url: 'https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/158228/home-farmhouse-old-house-old-farmhouse-158228.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/221502/pexels-photo-221502.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/442116/pexels-photo-442116.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/577697/pexels-photo-577697.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/1510173/pexels-photo-1510173.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/533157/pexels-photo-533157.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: 'https://images.pexels.com/photos/9139178/pexels-photo-9139178.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/462205/pexels-photo-462205.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/7535020/pexels-photo-7535020.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: 'https://images.pexels.com/photos/7545789/pexels-photo-7545789.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/08/16/03/47/exterior-1597094_1280.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/07/13/23/43/chefs-kitchen-1515844_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/08/16/03/39/home-1597079_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://images.pexels.com/photos/238377/pexels-photo-238377.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2016/08/16/03/47/exterior-1597096_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2022/10/09/02/16/haunted-house-7508035_1280.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2020/03/18/17/01/old-house-4944818_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2015/02/08/09/47/urban-628274_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2021/08/27/14/08/abandoned-house-6578755_1280.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: 'https://images.pexels.com/photos/3714192/pexels-photo-3714192.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/1328032/pexels-photo-1328032.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/322316/pexels-photo-322316.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/2131853/pexels-photo-2131853.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/2138921/pexels-photo-2138921.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/19573734/pexels-photo-19573734/free-photo-of-facade-of-a-building.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/19573751/pexels-photo-19573751/free-photo-of-an-entrance-to-the-building.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/3837464/pexels-photo-3837464.jpeg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/14998334/pexels-photo-14998334/free-photo-of-facade-of-white-apartment-building-under-white-sky.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/6758782/pexels-photo-6758782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/6758785/pexels-photo-6758785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/6758786/pexels-photo-6758786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/6758787/pexels-photo-6758787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
          'https://images.pexels.com/photos/463734/pexels-photo-463734.jpeg',
          'https://images.pexels.com/photos/158228/home-farmhouse-old-house-old-farmhouse-158228.jpeg',
          'https://images.pexels.com/photos/221502/pexels-photo-221502.jpeg',
          'https://images.pexels.com/photos/442116/pexels-photo-442116.jpeg',
          'https://images.pexels.com/photos/577697/pexels-photo-577697.jpeg',
          'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
          'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
          'https://images.pexels.com/photos/1510173/pexels-photo-1510173.jpeg',
          'https://images.pexels.com/photos/533157/pexels-photo-533157.jpeg',
          'https://images.pexels.com/photos/9139178/pexels-photo-9139178.jpeg',
          'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
          'https://images.pexels.com/photos/462205/pexels-photo-462205.jpeg',
          'https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg',
          'https://images.pexels.com/photos/7535020/pexels-photo-7535020.jpeg',
          'https://images.pexels.com/photos/7545789/pexels-photo-7545789.jpeg',
          'https://cdn.pixabay.com/photo/2016/08/16/03/47/exterior-1597094_1280.jpg',
          'https://cdn.pixabay.com/photo/2016/07/13/23/43/chefs-kitchen-1515844_1280.jpg',
          'https://cdn.pixabay.com/photo/2016/08/16/03/39/home-1597079_1280.jpg',
          'https://images.pexels.com/photos/238377/pexels-photo-238377.jpeg',
          'https://cdn.pixabay.com/photo/2016/08/16/03/47/exterior-1597096_1280.jpg',
          'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_1280.jpg',
          'https://cdn.pixabay.com/photo/2022/10/09/02/16/haunted-house-7508035_1280.jpg',
          'https://cdn.pixabay.com/photo/2020/03/18/17/01/old-house-4944818_1280.jpg',
          'https://cdn.pixabay.com/photo/2015/02/08/09/47/urban-628274_1280.jpg',
          'https://cdn.pixabay.com/photo/2021/08/27/14/08/abandoned-house-6578755_1280.jpg',
          'https://images.pexels.com/photos/3714192/pexels-photo-3714192.jpeg',
          'https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg',
          'https://images.pexels.com/photos/1328032/pexels-photo-1328032.jpeg',
          'https://images.pexels.com/photos/322316/pexels-photo-322316.jpeg',
          'https://images.pexels.com/photos/2131853/pexels-photo-2131853.jpeg',
          'https://images.pexels.com/photos/2138921/pexels-photo-2138921.jpeg',
          'https://images.pexels.com/photos/19573734/pexels-photo-19573734/free-photo-of-facade-of-a-building.jpeg',
          'https://images.pexels.com/photos/19573751/pexels-photo-19573751/free-photo-of-an-entrance-to-the-building.jpeg',
          'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg',
          'https://images.pexels.com/photos/3932930/pexels-photo-3932930.jpeg',
          'https://images.pexels.com/photos/3837464/pexels-photo-3837464.jpeg',
          'https://images.pexels.com/photos/14998334/pexels-photo-14998334/free-photo-of-facade-of-white-apartment-building-under-white-sky.jpeg',
          'https://images.pexels.com/photos/6758782/pexels-photo-6758782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/6758785/pexels-photo-6758785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/6758786/pexels-photo-6758786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/6758787/pexels-photo-6758787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ]
      }
    }, {});
  }
};
