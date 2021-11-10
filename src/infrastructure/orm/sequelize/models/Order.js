'use strict';

const { DataTypes, Model } = require('sequelize');

class Order extends Model {}

function initOrderModel(sequelize) {
  Order.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      productsIds: {
        type: DataTypes.JSON,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true
        }
      },
      isPayed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          max: 1,
          min: 0
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
      modelName: 'Order', // We need to choose the model name
      tableName: 'orders',
      timestamps: true
    }
  );
}

module.exports = { Order, initOrderModel };
