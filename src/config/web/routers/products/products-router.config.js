'use strict';

const {
  ProductsRouter
} = require('../../../../infrastructure/web/routers/products.router');

module.exports = class ProductsRouterConfig {
  static getProductsRouter(controllers) {
    return new ProductsRouter(controllers);
  }
};
