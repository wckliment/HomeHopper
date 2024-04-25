'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Spot, { foreignKey: 'spotId', onDelete: 'CASCADE', as: 'Spot' });
      Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'User' });
      Review.hasMany(models.Reviewimage, { foreignKey: 'reviewId', onDelete: 'CASCADE', as: 'ReviewImages' });
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
