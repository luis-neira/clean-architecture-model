'use strict';

const { createTerminus } = require('@godaddy/terminus');

const DatabaseClient = require('../../../infrastructure/database/db-client');
const logger = require('../../../common/logger');

module.exports = class ServerConfig {
  constructor(server) {
    this.server = server;
  }

  async beforeShutdown() {
    logger.info('Server is starting cleanup');
    return;
  }

  async onSignal() {
    logger.info('All server connections: Closed');

    await DatabaseClient.closeConnections(process.env.DB_DIALECT);
    return;
  }

  async onShutdown() {
    logger.info('Cleanup finished, server is shutting down');
    return;
  }

  configure() {
    return createTerminus(this.server, {
      logger: logger.info,
      signals: ['SIGINT', 'SIGTERM'],
      timeout: 20000,
      healthChecks: {
        '/healthcheck': () => Promise.resolve()
      },
      beforeShutdown: this.beforeShutdown,
      onSignal: this.onSignal,
      onShutdown: this.onShutdown
    });
  }
};
