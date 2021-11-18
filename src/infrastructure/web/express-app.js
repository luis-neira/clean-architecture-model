'use strict';

const express = require('express');
const pinoHttp = require('./middlewares/vendors/pino-http');

const errorHandler = require('./middlewares/error-handler');
const errorLogger = require('./middlewares/error-logger');
const notFoundHandler = require('./middlewares/not-found-handler');

const ExpressApp = (function () {
  let _app;
  let _routers;
  let _options;
  let _appInitialized = false;

  class ExpressApp {
    constructor(routers = [], options = {}) {
      _app = express();
      _routers = routers;
      _options = options;
    }

    build() {
      initApp();
      return _app;
    }
  }

  function initApp() {
    if (!_appInitialized) {
      setAppSettings();
      setMiddleWare();
      setAppRouter();
      setErrorHander();
      _appInitialized = true;
    }
  }

  function setAppSettings() {
    _app.use(express.json());
    _app.use(express.urlencoded({ extended: true }));
  }

  function setMiddleWare() {
    _app.use(pinoHttp);
  }

  function setAppRouter() {
    _routers.forEach((router) => {
      _app.use(router.getRouter());
    });
  }

  function setErrorHander() {
    _app.use(notFoundHandler);
    _app.use(errorLogger);
    _app.use(errorHandler);
  }

  return ExpressApp;
})();

module.exports = ExpressApp;
