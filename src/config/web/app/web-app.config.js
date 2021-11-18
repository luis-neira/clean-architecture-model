'use strict';

const ExpressApp = require('../../../infrastructure/web/express-app');

const WebAppConfig = (function () {
  let _routers = [];
  let _options = {};

  return class WebAppConfig {
    constructor(routers, options) {
      _routers = routers;
      _options = options;
    }

    getExpressApp() {
      return new ExpressApp(_routers, _options);
    }
  };
})();

module.exports = WebAppConfig;
