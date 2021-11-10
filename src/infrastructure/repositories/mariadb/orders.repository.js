'use strict';

const { sequelize } = require('../../orm/sequelize');
const { OrderMap } = require('../../../common/mappers');

module.exports = class OrderRepository {
  constructor() {
    this._db = sequelize;
    this.model = this._db.model('Order');
  }

  async add(order) {
    const orderRawData = OrderMap.toPersistence(order);

    const addedOrder = await this.model.create(orderRawData);

    return OrderMap.toDomain(addedOrder.toJSON());
  }

  async getById(orderId) {
    const foundOrder = await this.model.findOne({
      where: { id: orderId }
    });

    if (!foundOrder) return null;

    return OrderMap.toDomain(foundOrder.toJSON());
  }

  async update(newRawOrderData) {
    const foundOrder = await this.model.findOne({
      where: { id: newRawOrderData.id }
    });

    if (!foundOrder) return null;

    Reflect.deleteProperty(newRawOrderData, 'id');

    foundOrder.set({
      ...newRawOrderData
    });

    await foundOrder.save();

    return OrderMap.toDomain(foundOrder.toJSON());
  }

  async delete(rawOrderData) {
    const foundOrder = await this.model.findOne({
      where: { id: rawOrderData.id }
    });

    if (!foundOrder) return null;

    await foundOrder.destroy();

    return OrderMap.toDomain(foundOrder.toJSON());
  }
};
