'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review_Images extends Model {
    static associate(models) {
      Review_Images.belongsTo(models.review, { foreignKey: 'reviewId', onDelete: 'CASCADE' });
    }
  }
  Review_Images.init({
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review_Images',
    tableName: 'Review_Images', // Specify the correct table name here
  });
  return Review_Images;
};
