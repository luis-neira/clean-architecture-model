'use strict';

const {
  OrdersRouter
} = require('../../../../infrastructure/web/routers/orders.router');

module.exports = class OrdersRouterConfig {
  constructor() {}

  getRouter(controllers) {
    return new OrdersRouter(controllers);
  }
};
