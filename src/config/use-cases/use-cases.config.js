'use strict';

const UsersUseCasesConfig = require('./users');
const ProductsUseCasesConfig = require('./products');
const OrdersUseCasesConfig = require('./orders');

const UseCasesConfig = (function () {
  let _repos = {};

  class UseCasesConfig {
    constructor(repos) {
      _repos = repos;
    }

    getUseCases() {
      const configsDictionary = {
        users: new UsersUseCasesConfig(),
        products: new ProductsUseCasesConfig(),
        orders: new OrdersUseCasesConfig()
      };

      return makeUseCasesDictionary(configsDictionary);
    }
  }

  function makeUseCasesDictionary(configsDictionary) {
    const configs = Object.entries(configsDictionary);

    return configs.reduce((accum, [key, config]) => {
      accum[key] = config.getAllUseCases(_repos);
      return accum;
    }, {});
  }

  return UseCasesConfig;
})();

module.exports = UseCasesConfig;
