'use strict';

const { createServer } = require('http');

const serverConfig = require('../../config/web/server');
const logger = require('../../common/logger');

module.exports = class Http_Server {
  constructor(webApp) {
    this._initServer = createServer(webApp);
    this._setConfig();
    this._setErrorHandler();
    this._setListener();
  }

  static create(webApp) {
    const init = new Http_Server(webApp);
    return init._server;
  }

  _setConfig() {
    this._server = serverConfig(this._initServer);
  }

  _setErrorHandler() {
    this._server.on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  }

  _setListener() {
    this._server.on('listening', () => {
      logger.info(
        `Server up & running at http://localhost:${this._server.address().port}`
      );
    });
  }
};
