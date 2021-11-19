'use strict';

const { Router } = require('express');

const ProductsRouter = (function () {
  let _router = new WeakMap();

  class ProductsRouter {
    constructor(controllers) {
      const router = Router();

      router.post(
        '/api/v1/products',
        controllers.addProductController.getRequestHandler()
      );
      router.get(
        '/api/v1/products/:id',
        controllers.getProductByIdController.getRequestHandler()
      );
      router.delete(
        '/api/v1/products',
        controllers.deleteProductController.getRequestHandler()
      );
      router.put(
        '/api/v1/products',
        controllers.updateProductController.getRequestHandler()
      );

      _router.set(this, router);
    }

    getRouter() {
      return _router.get(this);
    }
  }

  return ProductsRouter;
})();

module.exports = { ProductsRouter };
