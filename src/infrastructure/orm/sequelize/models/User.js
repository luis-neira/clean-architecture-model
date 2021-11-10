'use strict';

const { DataTypes, Model } = require('sequelize');

class User extends Model {}

function initUserModel(sequelize) {
  User.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 31]
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      gender: {
        type: DataTypes.TINYINT(1).UNSIGNED,
        allowNull: false,
        validate: {
          max: 2,
          min: 0
        }
      },
      meta: {
        type: DataTypes.JSON,
        allowNull: false,
      }
    },
    {
      // Other model options go here
      sequelize: sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
      tableName: 'users',
      timestamps: true
    }
  );
}

module.exports = { User, initUserModel };
