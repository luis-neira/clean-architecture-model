'use strict';

const { Router } = require('express');

const UsersRouter = (function () {
  let _router = new WeakMap();

  class UsersRouter {
    constructor(controllers) {
      const router = Router();

      router.post(
        '/api/v1/users',
        controllers.addUserController.getRequestHandler()
      );
      router.delete(
        '/api/v1/users',
        controllers.deleteUserController.getRequestHandler()
      );
      router.put(
        '/api/v1/users',
        controllers.updateUserController.getRequestHandler()
      );
      router.get(
        '/api/v1/users/:id',
        controllers.getUserByIdController.getRequestHandler()
      );

      _router.set(this, router);
    }

    getRouter() {
      return _router.get(this);
    }
  }

  return UsersRouter;
})();

module.exports = { UsersRouter };
