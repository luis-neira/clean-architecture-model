'use strict';

const { Router } = require('express');

const OrdersRouter = (function () {
  let _router = new WeakMap();

  class OrdersRouter {
    constructor(controllers) {
      const router = Router();

      router.post(
        '/api/v1/orders',
        controllers.addOrderController.getRequestHandler()
      );
      router.get(
        '/api/v1/orders/:id',
        controllers.getOrderByIdController.getRequestHandler()
      );
      router.delete(
        '/api/v1/orders/',
        controllers.deleteOrderController.getRequestHandler()
      );
      router.put(
        '/api/v1/orders/',
        controllers.updateOrderController.getRequestHandler()
      );

      _router.set(this, router);
    }

    getRouter() {
      return _router.get(this);
    }
  }

  return OrdersRouter;
})();

module.exports = { OrdersRouter };
