'use strict';

const express = require('express');
const pinoHttp = require('./middlewares/vendors/pino-http');

const errorHandler = require('./middlewares/error-handler');
const errorLogger = require('./middlewares/error-logger');
const notFoundHandler = require('./middlewares/not-found-handler');

module.exports = class ExpressApp {
  _app;
  _options;
  _appInitialized = false;
  _routers;

  constructor(routers = [], options = {}) {
    this._app = express();
    this._options = options;
    this._routers = routers;
  }

  build() {
    this._initApp();
    return this._app;
  }

  _initApp() {
    if (!this._appInitialized) {
      this._setAppSettings();
      this._setMiddleWare();
      this._setAppRouter();
      this._setErrorHander();
      this._appInitialized = true;
    }
  }

  _setAppSettings() {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  _setMiddleWare() {
    this._app.use(pinoHttp);
  }

  _setAppRouter() {
    this._routers.forEach((router) => {
      this._app.use(router.getRouter());
    });
  }

  _setErrorHander() {
    this._app.use(notFoundHandler);
    this._app.use(errorLogger);
    this._app.use(errorHandler);
  }
};
