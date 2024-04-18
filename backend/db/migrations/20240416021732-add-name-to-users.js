'use strict';
//temp
//p
// Same approach to handling options as in create-user.js
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Use tableName with options for specifying schema when modifying the table
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema }, 'firstName', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema }, 'lastName', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    // Use tableName with options for specifying schema when modifying the table
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'firstName');
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'lastName');
  }
};
