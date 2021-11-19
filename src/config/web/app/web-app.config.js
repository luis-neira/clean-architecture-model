'use strict';

const ExpressApp = require('../../../infrastructure/web/express-app');

const WebAppConfig = (function () {
  let _routers = new WeakMap();
  let _options = new WeakMap();

  class WebAppConfig {
    constructor(routers, options) {
      _routers.set(this, routers);
      _options.set(this, options);
    }

    getExpressApp() {
      const routers = _routers.get(this);
      const options = _options.get(this);

      return new ExpressApp(routers, options);
    }
  }

  return WebAppConfig;
})();

module.exports = WebAppConfig;
