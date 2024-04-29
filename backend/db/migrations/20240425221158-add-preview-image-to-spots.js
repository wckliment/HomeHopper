'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log("Adding previewImage column to Spots table...");
      await queryInterface.addColumn({ tableName: 'Spots', schema: options.schema }, 'previewImage', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      });
      console.log("Column added.");
    } catch (error) {
      console.error("Error adding column:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      console.log("Removing previewImage column from Spots table...");
      await queryInterface.removeColumn({ tableName: 'Spots', schema: options.schema }, 'previewImage');
      console.log("Column removed.");
    } catch (error) {
      console.error("Error removing column:", error);
    }
  }
};
