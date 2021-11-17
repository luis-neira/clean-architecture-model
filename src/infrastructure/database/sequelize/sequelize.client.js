'use strict';

const logger = require('../../../common/logger');
const _Abstract_DbClient = require('../interfaces/db-client.abstract');

const SequelizeClient = (function () {
  let connection = null;
  let dialect = '';

  return class SequelizeClient extends _Abstract_DbClient {
    constructor() {
      super();
      Object.freeze(this);
    }

    static setDialect(dbDialect) {
      dialect = dbDialect;
    }

    async connect() {
      try {
        const { sequelize } = require('../../orm/sequelize');

        await sequelize.authenticate();

        logger.info('Database connection: Successfully established');

        connection = sequelize;
      } catch (err) {
        logger.error({ err }, 'Unable to connect to the database');
      }

      try {
        await connection.sync();
        logger.info('Database synchronization: Successful');
      } catch (err) {
        logger.error({ err }, 'Unable to synchronize with database');

        connection = null;
      }
    }

    async close() {
      if (connection === null) return null;
      await connection.close();
      logger.info('Database connection: Successfully closed');
    }

    getConnection() {
      return connection;
    }

    getDialect() {
      return dialect;
    }
  };
})();

module.exports = SequelizeClient;
