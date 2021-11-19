'use strict';

const express = require('express');
const pinoHttp = require('./middlewares/vendors/pino-http');

const errorHandler = require('./middlewares/error-handler');
const errorLogger = require('./middlewares/error-logger');
const notFoundHandler = require('./middlewares/not-found-handler');

const ExpressApp = (function () {
  //** private props */
  let _app = new WeakMap();
  let _routers = new WeakMap();
  let _options = new WeakMap();
  let _appInitialized = new WeakMap();

  //** private methods */
  let _initApp = new WeakMap();
  let _setAppSettings = new WeakMap();
  let _setMiddleWare = new WeakMap();
  let _setAppRouter = new WeakMap();
  let _setErrorHander = new WeakMap();

  class ExpressApp {
    constructor(routers = [], options = {}) {
      _app.set(this, express());
      _routers.set(this, routers);
      _options.set(this, options);

      _initApp.set(this, () => {
        if (_appInitialized.has(this) === false) {
          const setAppSettings = _setAppSettings.get(this);
          const setMiddleWare = _setMiddleWare.get(this);
          const setAppRouter = _setAppRouter.get(this);
          const setErrorHander = _setErrorHander.get(this);

          setAppSettings();
          setMiddleWare();
          setAppRouter();
          setErrorHander();

          _appInitialized.set(this, true);
        }
      });

      _setAppSettings.set(this, () => {
        const app = _app.get(this);

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
      });

      _setMiddleWare.set(this, () => {
        const app = _app.get(this);

        app.use(pinoHttp);
      });

      _setAppRouter.set(this, () => {
        const app = _app.get(this);
        const routers = _routers.get(this);

        routers.forEach((router) => {
          app.use(router.getRouter());
        });
      });

      _setErrorHander.set(this, () => {
        const app = _app.get(this);

        app.use(notFoundHandler);
        app.use(errorLogger);
        app.use(errorHandler);
      });
    }

    build() {
      const initApp = _initApp.get(this);
      initApp();

      return _app.get(this);
    }
  }

  return ExpressApp;
})();

module.exports = ExpressApp;
