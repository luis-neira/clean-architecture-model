'use strict';

const { Server } = require('http');

const ServerConfig = require('../../config/web/server/server.config');
const logger = require('../../common/logger');

class HttpServer extends Server {
  configure() {
    setConfig(this);
    setErrorHandler(this);
    setListeningHandler(this);
  }
}

function setConfig(server) {
  const serverConfig = new ServerConfig(server);
  serverConfig.process();
}

function setErrorHandler(server) {
  server.on('error', (err) => {
    logger.error(err);
    process.exit(1);
  });
}

function setListeningHandler(server) {
  server.on('listening', () => {
    logger.info(
      `Server up & running at http://localhost:${server.address().port}`
    );
  });
}

module.exports = HttpServer;
