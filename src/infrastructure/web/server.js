'use strict';

const { createServer } = require('http');

const ServerConfig = require('../../config/web/server/server.config');
const logger = require('../../common/logger');

module.exports = class HttpServer {
  constructor(webApp) {
    this._initServer = createServer(webApp);
    this._setConfig();
    this._setErrorHandler();
    this._setListener();
  }

  static create(webApp) {
    const init = new HttpServer(webApp);
    return init._server;
  }

  _setConfig() {
    const serverConfig = new ServerConfig(this._initServer);
    this._server = serverConfig.configure()
  }

  _setErrorHandler() {
    this._server.on('error', (err) => {
      logger.error(err);
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
