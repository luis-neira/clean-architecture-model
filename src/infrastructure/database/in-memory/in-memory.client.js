'use strict';

const _Abstract_DbClient = require('../interfaces/db-client.abstract');

const InMemoryClient = (function () {
  let dialect = '';

  return class InMemoryClient extends _Abstract_DbClient {
    constructor() {
      super();
      Object.freeze(this);
    }
    static setDialect(dbDialect) {
      dialect = dbDialect;
    }
    async connect() {
      return null;
    }
    async close() {
      return null;
    }
    getDialect() {
      return dialect;
    }
    getConnection() {
      return null;
    }
  };
})();

module.exports = InMemoryClient;
