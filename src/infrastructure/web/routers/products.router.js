'use strict';

const Router = require('express').Router;

module.exports.ProductsRouter = class ProductsRouter {
  constructor(controllers) {
    this.addProductsController = controllers.addProductsController;
    this.getProductByIdController = controllers.getProductByIdController;
    this.deleteProductController = controllers.deleteProductController;
    this.updateProductController = controllers.updateProductController;
    this.router = Router();
    this.configRouter();
  }

  configRouter() {
    const router = this.router;
    router.post(
      '/api/v1/products',
      this.addProductsController.getRequestHandler()
    );
    router.get(
      '/api/v1/products/:id',
      this.getProductByIdController.getRequestHandler()
    );
    router.delete(
      '/api/v1/products',
      this.deleteProductController.getRequestHandler()
    );
    router.put(
      '/api/v1/products',
      this.updateProductController.getRequestHandler()
    );
  }

  getRouter() {
    return this.router;
  }
};
