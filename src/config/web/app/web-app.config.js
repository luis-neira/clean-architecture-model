'use strict';

const ExpressApp = require('../../../infrastructure/web/express-app');

module.exports = class WebAppConfig {

  static getExpressApp(routers, options) {
    return new ExpressApp(routers, options);
  }

};
