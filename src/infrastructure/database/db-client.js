'use strict';

const logger = require('../../common/logger');

module.exports = class DatabaseClient {
  constructor(dialect) {
    this.dialect = dialect;
  }

  async connect() {
    if (this.dialect === 'mariadb') {
      const { sequelize } = require('../orm/sequelize');
      try {
        await sequelize.authenticate();
        await sequelize.sync();
        logger.info('Connection to database: Successfully established');
      } catch (err) {
        logger.error({ err }, 'Unable to connect to the database');
      }
    }
  }

  static async closeConnections(dbDialect) {
    const dbConnections = {
      mariadb: async function () {
        const { sequelize } = require('../orm/sequelize');
        await sequelize.close;
        logger.info('All database connections: Closed');
      },
      inMemory: async () => undefined
    };

    const closeConnections = dbConnections[dbDialect] || dbConnections.inMemory;

    await closeConnections();
  }
};
