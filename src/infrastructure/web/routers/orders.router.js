'use strict';

const { Router } = require('express');

const OrdersRouter = (function () {
  let _addOrderController = {};
  let _deleteOrderController = {};
  let _updateOrderController = {};
  let _getOrderByIdController = {};
  
  let _router = {};

  class OrdersRouter {
    constructor(controllers) {
      _addOrderController = controllers.addOrderController;
      _deleteOrderController = controllers.deleteOrderController;
      _updateOrderController = controllers.updateOrderController;
      _getOrderByIdController = controllers.getOrderByIdController;
      _router = Router();
      configRouter();
    }

    getRouter() {
      return _router;
    }
  }

  function configRouter() {
    _router.post(
      '/api/v1/orders',
      _addOrderController.getRequestHandler()
    );
    _router.get(
      '/api/v1/orders/:id',
      _getOrderByIdController.getRequestHandler()
    );
    _router.put(
      '/api/v1/orders/',
      _updateOrderController.getRequestHandler()
    );
    _router.delete(
      '/api/v1/orders/',
      _deleteOrderController.getRequestHandler()
    );
  }

  return OrdersRouter;
})();

module.exports = { OrdersRouter };
