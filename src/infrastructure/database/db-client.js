'use strict';

const logger = require('../../common/logger');

class _Abstract_DbClient {
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
}



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
        const { sequelize } = require('../orm/sequelize');

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



class MongodbClient {}



const DatabaseClientFactory = (function () {
  function DatabaseClientFactory() {}

  DatabaseClientFactory.prototype.create = (dbDialect) => {
    return selectDatabaseClient(dbDialect);
  };

  function selectDatabaseClient(dbDialect) {
    const databaseClients = {
      mariadb: SequelizeClient,
      inMemory: InMemoryClient
    };

    if (dbDialect in databaseClients) {
      const DatabaseClient = databaseClients[dbDialect];
      DatabaseClient.setDialect(dbDialect);
      return DatabaseClient;
    }

    InMemoryClient.setDialect('inMemory');
    return InMemoryClient;
  }

  return DatabaseClientFactory;
})();



function makeSingelton(ConcreteClass) {
  let instance = null;

  return {
    getInstance() {
      if (instance === null) {
        instance = new ConcreteClass();
      }

      return instance;
    }
  };
}


const databaseClientFactory = new DatabaseClientFactory();

const DatabaseClient = databaseClientFactory.create(process.env.DB_DIALECT);

module.exports = makeSingelton(DatabaseClient);
