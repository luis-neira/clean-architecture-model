'use strict';

const UsersControllersConfig = require('./users');
const ProductsControllersConfig = require('./products');
const OrdersControllersConfig = require('./orders');

const ControllersConfig = (function () {
  let _makeControllersDictionary = new WeakMap();

  class ControllersConfig {
    constructor(useCases) {
      
      _makeControllersDictionary.set(this, (configsDictionary) => {
        const configs = Object.entries(configsDictionary);

        return configs.reduce((accum, [key, config]) => {
          accum[key] = config.getAllControllers(useCases[key]);
          return accum;
        }, {});
      });
    }

    getControllers() {
      const configsDictionary = {
        users: new UsersControllersConfig(),
        products: new ProductsControllersConfig(),
        orders: new OrdersControllersConfig()
      };

      const makeControllersDictionary = _makeControllersDictionary.get(this);
      return makeControllersDictionary(configsDictionary);
    }
  }

  return ControllersConfig;
})();

module.exports = ControllersConfig;
