'use strict';

const { DataTypes, Model } = require('sequelize');

class Product extends Model {}

function initProductModel(sequelize) {
  Product.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 160]
        }
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      price: {
        type: DataTypes.JSON,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 20]
        }
      },
      meta: {
        type: DataTypes.JSON,
        allowNull: false
      }
    },
    {
      // Other model options go here
      sequelize: sequelize, // We need to pass the connection instance
      modelName: 'Product', // We need to choose the model name
      tableName: 'products',
      timestamps: true
    }
  );
}

module.exports = { Product, initProductModel };
