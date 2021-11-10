'use strict';

require('make-promises-safe');

const DatabaseClient = require('./src/infrastructure/database/db-client');
const Http_Server = require('./src/infrastructure/web/server');
const initApp = require('./src/app');

const start = async () => {

  const dbClient = new DatabaseClient(process.env.DB_DIALECT);

  await dbClient.connect()

  const expressApp = initApp(dbClient.dialect);

  const server = Http_Server.create(expressApp);

  server.listen(process.env.PORT || 3000);
};

start();
