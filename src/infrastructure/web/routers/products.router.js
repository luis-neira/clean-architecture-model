'use strict';

const { Router } = require('express');

const ProductsRouter = (function () {
  let _addProductController = {};
  let _deleteProductController = {};
  let _updateProductController = {};
  let _getProductByIdController = {};
  
  let _router = {};

  class ProductsRouter {
    constructor(controllers) {
      _addProductController = controllers.addProductController;
      _deleteProductController = controllers.deleteProductController;
      _updateProductController = controllers.updateProductController;
      _getProductByIdController = controllers.getProductByIdController;
      _router = Router();
      configRouter();
    }

    getRouter() {
      return _router;
    }
  }

  function configRouter() {
    _router.post(
      '/api/v1/products',
      _addProductController.getRequestHandler()
    );
    _router.get(
      '/api/v1/products/:id',
      _getProductByIdController.getRequestHandler()
    );
    _router.delete(
      '/api/v1/products',
      _deleteProductController.getRequestHandler()
    );
    _router.put(
      '/api/v1/products',
      _updateProductController.getRequestHandler()
    );
  }

  return ProductsRouter;
})();

module.exports = { ProductsRouter };
