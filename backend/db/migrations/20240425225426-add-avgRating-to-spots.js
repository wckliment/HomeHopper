'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn({ tableName: 'Spots', schema: options.schema }, 'avgRating', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn({ tableName: 'Spots', schema: options.schema }, 'avgRating');
  }
};
