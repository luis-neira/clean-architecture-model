'use strict';

const SequelizeClient = require('./sequelize');
const InMemoryClient = require('./in-memory');
const constants = require('../../config/constants');

function DatabaseClientFactory() {}

DatabaseClientFactory.prototype.create = (dbDialect) => {
  return selectDatabaseClient(dbDialect);
};

function selectDatabaseClient(dbDialect) {
  const databaseClients = {
    [constants.dbDialects.MARIA_DB]: SequelizeClient,
    [constants.dbDialects.IN_MEMORY]: InMemoryClient
  };

  if (dbDialect in databaseClients) {
    const DatabaseClient = databaseClients[dbDialect];
    DatabaseClient.setDialect(dbDialect);
    return DatabaseClient;
  }

  InMemoryClient.setDialect(constants.dbDialects.IN_MEMORY);
  return InMemoryClient;
}

module.exports = DatabaseClientFactory;
