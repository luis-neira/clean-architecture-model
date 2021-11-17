'use strict';

const DatabaseClientFactory = require('./db-client.factory');
const { makeSingelton } = require('../../common/helpers/singelton');

const databaseClientFactory = new DatabaseClientFactory();

const DatabaseClient = databaseClientFactory.create(process.env.DB_DIALECT);

module.exports = makeSingelton(DatabaseClient);
