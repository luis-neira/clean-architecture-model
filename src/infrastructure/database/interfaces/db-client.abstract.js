'use strict';

module.exports = class _Abstract_DbClient {
  async connect() {
    throw new Error('Abstract method "connect" not implemented');
  }
  async close() {
    throw new Error('Abstract method "close" not implemented');
  }
  getDialect() {
    throw new Error('Abstract method "getDialect" not implemented');
  }
  getConnection() {
    throw new Error('Abstract method "getConnection" not implemented');
  }
};
