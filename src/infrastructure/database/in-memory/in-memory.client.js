'use strict';

const _Abstract_DbClient = require('../interfaces/db-client.abstract');

const InMemoryClient = (function () {
  let _dialect = new WeakMap();

  return class InMemoryClient extends _Abstract_DbClient {
    constructor() {
      super();
      Object.freeze(this);
    }
    static setDialect(dbDialect) {
      _dialect.set(this, dbDialect);
    }
    async connect() {
      return null;
    }
    async close() {
      return null;
    }
    getDialect() {
      return _dialect.get(this.constructor);
    }
    getConnection() {
      return null;
    }
  };
})();

module.exports = InMemoryClient;
