'use strict';

require('make-promises-safe');

const DatabaseClient = require('./src/infrastructure/database/db-client');
const HttpServer = require('./src/infrastructure/web/server');
const App = require('./src/app');

class Main {
  static async run() {
    const databaseClient = DatabaseClient.getInstance();

    await databaseClient.connect();

    const app = new App(databaseClient.getDialect());

    const server = HttpServer.create(app.init());

    server.listen(process.env.PORT || 3000);
  }
}

Main.run();
