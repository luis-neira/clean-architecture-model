'use strict';

const { createTerminus } = require('@godaddy/terminus');

const DatabaseClient = require('../../../infrastructure/database/db-client');
const logger = require('../../../common/logger');

class ServerConfig {
  constructor(server) {
    this.server = server;
    Object.freeze(this);
  }

  process() {
    return createTerminus(this.server, {
      logger: (msg, err) => {
        logger.error({ err }, msg);
      },
      signals: ['SIGINT', 'SIGTERM'],
      timeout: 20000,
      healthChecks: {
        '/healthcheck': () => Promise.resolve()
      },
      beforeShutdown: beforeShutdown,
      onSignal: onSignal,
      onShutdown: onShutdown
    });
  }
}

async function beforeShutdown() {
  logger.info('Server is starting cleanup');
  return;
}

async function onSignal() {
  logger.info('All server connections: Closed');
  const databaseClient = DatabaseClient.getInstance();
  await databaseClient.close();
  return;
}

async function onShutdown() {
  logger.info('Cleanup finished, server is shutting down');
  return;
}

module.exports = ServerConfig;
