'use strict';

require('dotenv').config(); 

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.FLOAT,
      allowNull: true
    }, options);

    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.FLOAT,
      allowNull: true
    }, options);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Spots', 'lat', {
      type: Sequelize.FLOAT,
      allowNull: false
    }, options);

    await queryInterface.changeColumn('Spots', 'lng', {
      type: Sequelize.FLOAT,
      allowNull: false
    }, options);
  }
};
