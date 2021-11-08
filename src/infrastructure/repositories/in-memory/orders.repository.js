'use strict';

const { v4: uuidv4 } = require('uuid');

const { inMemorydb } = require('../../database');
const { OrderMap } = require('../../../common/mappers');

module.exports = class OrderRepository {
  _db = inMemorydb;

  async add(order) {
    try {
      const { orders } = this._db;
      if (!order.id) order.id = uuidv4();

      orders.push(OrderMap.toPersistence(order));
      const persistedOrder = orders[orders.length - 1];
      return OrderMap.toDomain(persistedOrder);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async update(order) {
    try {
      const { orders } = this._db;
      const orderIndex = orders.findIndex((u) => u.id === order.id);
      if (orderIndex < 0) return null;

      orders[orderIndex] = order;
      const persistedOrder = orders[orderIndex];
      return OrderMap.toDomain(persistedOrder);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async delete(order) {
    try {
      const { orders } = this._db;
      const orderIndex = orders.findIndex((u) => u.id === order.id);
      if (orderIndex < 0) return null;

      const deletedOrder = orders.splice(orderIndex, 1);
      const persistedOrder = deletedOrder[0];
      return OrderMap.toDomain(persistedOrder);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const { orders } = this._db;
      const persistedOrder = orders.find((u) => u.id === id);
      if (!persistedOrder) return null;

      return OrderMap.toDomain(persistedOrder);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }
};
