'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.spot, { foreignKey: 'spotId', onDelete: 'CASCADE' });
      Review.belongsTo(models.user, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Review.hasMany(models.review_Images, { foreignKey: 'reviewId', onDelete: 'CASCADE' });
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
