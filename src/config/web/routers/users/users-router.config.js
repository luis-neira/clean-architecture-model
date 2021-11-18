'use strict';

const {
  UsersRouter
} = require('../../../../infrastructure/web/routers/users.router');

module.exports = class UsersRouterConfig {
  constructor() {}

  getRouter(controllers) {
    return new UsersRouter(controllers);
  }
};
