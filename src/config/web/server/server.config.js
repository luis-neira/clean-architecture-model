'use strict';

const util = require('util');

const { createTerminus } = require('@godaddy/terminus');

const sleep = util.promisify(setTimeout);

module.exports = function serverConfig(server) {
  async function beforeShutdown() {
    console.log('Server is starting cleanup');
    return;
  }

  async function onSignal() {
    console.log('All server connections: Closed');
    await sleep(5000);
    return;
  }

  async function onShutdown() {
    console.log('Cleanup finished, server is shutting down');
    return;
  }

  return createTerminus(server, {
    logger: console.log,
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
