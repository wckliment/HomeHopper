'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviewimage', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Review',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down (queryInterface, Sequelize)  {
  options.tableName = "Reviewimage";
  await queryInterface.dropTable(options);
  }
};
