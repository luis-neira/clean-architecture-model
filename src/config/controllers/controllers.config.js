'use strict';

const UsersControllersConfig = require('./users');
const ProductsControllersConfig = require('./products');
const OrdersControllersConfig = require('./orders');

const ControllersConfig = (function () {
  let _useCases = {};

  class ControllersConfig {
    constructor(useCases) {
      _useCases = useCases;
    }

    getControllers() {
      const configsDictionary = {
        users: new UsersControllersConfig(),
        products: new ProductsControllersConfig(),
        orders: new OrdersControllersConfig()
      };

      return makeControllersDictionary(configsDictionary);
    }
  }

  function makeControllersDictionary(configsDictionary) {
    const configs = Object.entries(configsDictionary);

    return configs.reduce((accum, [key, config]) => {
      accum[key] = config.getAllControllers(_useCases[key]);
      return accum;
    }, {});
  }

  return ControllersConfig;
})();

module.exports = ControllersConfig;
