'use strict';

const Router = require('express').Router;

module.exports.OrdersRouter = class OrdersRouter {
  constructor(controllers) {
    this.addOrderController = controllers.addOrderController;
    this.getOrderByIdController = controllers.getOrderByIdController;
    this.updateOrderController = controllers.updateOrderController;
    this.deleteOrderController = controllers.deleteOrderController;
    this.router = Router();
    this.configRouter();
  }

  configRouter() {
    const router = this.router;
    router.post(
      '/api/v1/orders',
      this.addOrderController.getRequestHandler()
    );
    router.get(
      '/api/v1/orders/:id',
      this.getOrderByIdController.getRequestHandler()
    );
    router.put(
      '/api/v1/orders/',
      this.updateOrderController.getRequestHandler()
    );
    router.delete(
      '/api/v1/orders/',
      this.deleteOrderController.getRequestHandler()
    );
  }

  getRouter() {
    return this.router;
  }
};
