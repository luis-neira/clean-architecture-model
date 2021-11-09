'use strict';

const util = require('util');

const { createTerminus } = require('@godaddy/terminus');

const logger = require('../../../common/logger');

const sleep = util.promisify(setTimeout);

module.exports = function serverConfig(server) {
  async function beforeShutdown() {
    logger.info('Server is starting cleanup');
    return;
  }

  async function onSignal() {
    logger.info('All server connections: Closed');
    await sleep(5000);
    return;
  }

  async function onShutdown() {
    logger.info('Cleanup finished, server is shutting down');
    return;
  }

  return createTerminus(server, {
    logger: logger.info,
    signals: ['SIGINT', 'SIGTERM'],
    timeout: 20000,
    healthChecks: {
      '/healthcheck': () => Promise.resolve()
    },
    beforeShutdown,
    onSignal,
    onShutdown
  });
};
