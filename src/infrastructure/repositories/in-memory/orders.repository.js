'use strict';

const { v4: uuidv4 } = require('uuid');

const inMemorydb = require('../../orm/in-memory');
const { OrderMap } = require('../../../common/mappers');

const OrdersRepository = (function () {
  let _db = inMemorydb;

  return class OrdersRepository {
    constructor() {}

    async add(order) {
      const { orders } = _db;
      if (!order.id) order.id = uuidv4();

      orders.push(OrderMap.toPersistence(order));
      const persistedOrder = orders[orders.length - 1];
      return OrderMap.toDomain(persistedOrder);
    }

    async update(order) {
      const { orders } = _db;
      const orderIndex = orders.findIndex((u) => u.id === order.id);
      if (orderIndex < 0) return null;

      orders[orderIndex] = order;
      const persistedOrder = orders[orderIndex];
      return OrderMap.toDomain(persistedOrder);
    }

    async delete(order) {
      const { orders } = _db;
      const orderIndex = orders.findIndex((u) => u.id === order.id);
      if (orderIndex < 0) return null;

      const deletedOrder = orders.splice(orderIndex, 1);
      const persistedOrder = deletedOrder[0];
      return OrderMap.toDomain(persistedOrder);
    }

    async getById(id) {
      const { orders } = _db;
      const persistedOrder = orders.find((u) => u.id === id);
      if (!persistedOrder) return null;

      return OrderMap.toDomain(persistedOrder);
    }
  };
})();

module.exports = OrdersRepository;
