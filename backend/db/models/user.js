'use strict';
const {Model, Validator} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30], // minimum 4 characters, maximum 30 characters
        isNotEmail(value) {
          if (/\S+@\S+\.\S+/.test(value)) {
            throw new Error('Username cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256], // minimum 3 characters, maximum 256 characters
        isEmail: true  // must be a valid email format
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,  // Changed to STRING for practical reasons; adjust as needed for binary
      allowNull: false,
      validate: {
        len: [60, 60] // must be exactly 60 characters
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
