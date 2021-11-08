'use strict';

const {
  OrdersRouter
} = require('../../../../infrastructure/web/routers/orders.router');

module.exports = class OrdersRouterConfig {
  static getOrdersRouter(controllers) {
    return new OrdersRouter(controllers);
  }
};
