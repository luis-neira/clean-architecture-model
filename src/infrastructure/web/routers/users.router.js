'use strict';

const Router = require('express').Router;

module.exports.UsersRouter = class UsersRouter {
  constructor(controllers) {
    this.addUserController = controllers.addUserController;
    this.deleteUserController = controllers.deleteUserController;
    this.updateUserController = controllers.updateUserController;
    this.getUserByIdController = controllers.getUserByIdController;
    this.router = Router();
    this.configRouter();
  }

  configRouter() {
    const router = this.router;
    router.post(
      '/api/v1/users',
      this.addUserController.getRequestHandler()
    );
    router.delete(
      '/api/v1/users',
      this.deleteUserController.getRequestHandler()
    );
    router.put(
      '/api/v1/users',
      this.updateUserController.getRequestHandler()
    );
    router.get(
      '/api/v1/users/:id',
      this.getUserByIdController.getRequestHandler()
    );
  }

  getRouter() {
    return this.router;
  }
};
