'use strict';

const { sequelize } = require('../../orm/sequelize');
const { OrderMap } = require('../../../common/mappers');

const OrdersRepository = (function () {
  let _model = new WeakMap();

  class OrdersRepository {
    constructor() {
      _model.set(this, sequelize.model('Order'));
    }

    async add(order) {
      const orderRawData = OrderMap.toPersistence(order);

      const model = _model.get(this);
      const addedOrder = await model.create(orderRawData);

      return OrderMap.toDomain(addedOrder.toJSON());
    }

    async getById(orderId) {
      const model = _model.get(this);
      const foundOrder = await model.findOne({
        where: { id: orderId }
      });

      if (!foundOrder) return null;

      return OrderMap.toDomain(foundOrder.toJSON());
    }

    async update(newRawOrderData) {
      const model = _model.get(this);
      const foundOrder = await model.findOne({
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
      const model = _model.get(this);
      const foundOrder = await model.findOne({
        where: { id: rawOrderData.id }
      });

      if (!foundOrder) return null;

      await foundOrder.destroy();

      return OrderMap.toDomain(foundOrder.toJSON());
    }
  }

  return OrdersRepository;
})();

module.exports = OrdersRepository;
