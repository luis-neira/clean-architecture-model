'use strict';

const { Router } = require('express');

const UsersRouter = (function () {
  let _addUserController = {};
  let _deleteUserController = {};
  let _updateUserController = {};
  let _getUserByIdController = {};
  
  let _router = {};

  class UsersRouter {
    constructor(controllers) {
      _addUserController = controllers.addUserController;
      _deleteUserController = controllers.deleteUserController;
      _updateUserController = controllers.updateUserController;
      _getUserByIdController = controllers.getUserByIdController;
      _router = Router();
      configRouter();
    }

    getRouter() {
      return _router;
    }
  }

  function configRouter() {
    _router.post(
      '/api/v1/users',
      _addUserController.getRequestHandler()
    );
    _router.delete(
      '/api/v1/users',
      _deleteUserController.getRequestHandler()
    );
    _router.put(
      '/api/v1/users',
      _updateUserController.getRequestHandler()
    );
    _router.get(
      '/api/v1/users/:id',
      _getUserByIdController.getRequestHandler()
    );
  }

  return UsersRouter;
})();

module.exports = { UsersRouter };
