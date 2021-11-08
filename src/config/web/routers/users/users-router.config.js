'use strict';

const {
  UsersRouter
} = require('../../../../infrastructure/web/routers/users.router');

module.exports = class UsersRouterConfig {
  static getUsersRouter(controllers) {
    return new UsersRouter(controllers);
  }
};
