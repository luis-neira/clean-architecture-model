'use strict';

const {
  ProductsRouter
} = require('../../../../infrastructure/web/routers/products.router');

module.exports = class ProductsRouterConfig {
  constructor() {}

  getRouter(controllers) {
    return new ProductsRouter(controllers);
  }
};
