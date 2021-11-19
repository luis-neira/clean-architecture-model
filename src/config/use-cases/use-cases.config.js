'use strict';

const UsersUseCasesConfig = require('./users');
const ProductsUseCasesConfig = require('./products');
const OrdersUseCasesConfig = require('./orders');

const UseCasesConfig = (function () {
  let _makeUseCasesDictionary = new WeakMap();

  class UseCasesConfig {
    constructor(repos) {

      _makeUseCasesDictionary.set(this, (configsDictionary) => {
        const configs = Object.entries(configsDictionary);

        return configs.reduce((accum, [key, config]) => {
          accum[key] = config.getAllUseCases(repos);
          return accum;
        }, {});
      });
    }

    getUseCases() {
      const configsDictionary = {
        users: new UsersUseCasesConfig(),
        products: new ProductsUseCasesConfig(),
        orders: new OrdersUseCasesConfig()
      };

      const makeUseCasesDictionary = _makeUseCasesDictionary.get(this);
      return makeUseCasesDictionary(configsDictionary);
    }
  }

  return UseCasesConfig;
})();

module.exports = UseCasesConfig;
