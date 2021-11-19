'use strict';

const logger = require('../../../common/logger');
const _Abstract_DbClient = require('../interfaces/db-client.abstract');

const SequelizeClient = (function () {
  let _dialect = new WeakMap();
  let _connection = new WeakMap();

  class SequelizeClient extends _Abstract_DbClient {
    constructor() {
      super();
      Object.freeze(this);
    }

    static setDialect(dbDialect) {
      _dialect.set(this, dbDialect);
    }

    async connect() {
      try {
        const { sequelize } = require('../../orm/sequelize');

        await sequelize.authenticate();

        logger.info('Database connection: Successfully established');

        _connection.set(this, sequelize);
      } catch (err) {
        logger.error({ err }, 'Unable to connect to the database');
        return;
      }

      try {
        const connection = _connection.get(this);
        await connection.sync();
        logger.info('Database synchronization: Successful');
      } catch (err) {
        logger.error({ err }, 'Unable to synchronize with database');

        _connection.delete(this);
      }
    }

    async close() {
      if (_connection.has(this) === false) return null;
      const connection = _connection.get(this);
      await connection.close();
      logger.info('Database connection: Successfully closed');
    }

    getConnection() {
      return _connection.get(this);
    }

    getDialect() {
      return _dialect.get(this.constructor);
    }
  }

  return SequelizeClient;
})();

module.exports = SequelizeClient;
