'use strict';

const Http_Server = require('./src/infrastructure/web/server');
const main = require('./src/main');

const PORT = process.env.PORT || 3000;

const expressApp = main();

const server = Http_Server.create(expressApp);

server.listen(PORT);
