'use strict';

const UsersRouterConfig = require('./users');
const ProductsRouterConfig = require('./products');
const OrdersRouterConfig = require('./orders');

const RoutersConfig = (function () {
  let _makeRoutersList = new WeakMap();

  class RoutersConfig {
    constructor(controllersDictionary) {

      _makeRoutersList.set(this, (configsDictionary) => {
        const configs = Object.entries(configsDictionary);

        return configs.reduce((accum, [key, config]) => {
          accum.push(config.getRouter(controllersDictionary[key]));
          return accum;
        }, []);
      });
    }

    getRouters() {
      const configsDictionary = {
        users: new UsersRouterConfig(),
        products: new ProductsRouterConfig(),
        orders: new OrdersRouterConfig()
      };

      const makeRoutersList = _makeRoutersList.get(this);
      return makeRoutersList(configsDictionary);
    }
  }

  return RoutersConfig;
})();

module.exports = RoutersConfig;
