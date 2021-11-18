'use strict';

const UsersRouterConfig = require('./users');
const ProductsRouterConfig = require('./products');
const OrdersRouterConfig = require('./orders');

const RoutersConfig = (function () {
  let _controllersDictionary = {};

  class RoutersConfig {
    constructor(controllersDictionary) {
      _controllersDictionary = controllersDictionary;
    }

    getRouters() {
      const configsDictionary = {
        users: new UsersRouterConfig(),
        products: new ProductsRouterConfig(),
        orders: new OrdersRouterConfig()
      };

      return makeRoutersList(configsDictionary);
    }
  }

  function makeRoutersList(configsDictionary) {
    const configs = Object.entries(configsDictionary);

    return configs.reduce((accum, [key, config]) => {
      accum.push(config.getRouter(_controllersDictionary[key]));
      return accum;
    }, []);
  }

  return RoutersConfig;
})();

module.exports = RoutersConfig;
