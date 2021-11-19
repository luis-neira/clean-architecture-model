'use strict';

const DatabaseClientFactory = require('./db-client.factory');
const SingeltonFactory = require('../../common/helpers/singelton');

const databaseClientFactory = new DatabaseClientFactory();

const DatabaseClient = databaseClientFactory.create(process.env.DB_DIALECT);

const singeltonFactory = new SingeltonFactory();

const SingeltonDatabaseClient = singeltonFactory.create(DatabaseClient);

module.exports = SingeltonDatabaseClient;
