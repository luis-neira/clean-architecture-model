'use strict';

const {
  AddUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController
} = require('../../../controllers/users');

module.exports = class UsersControllersConfig {
  static getAddUserController(addUserUseCase) {
    return new AddUserController(addUserUseCase);
  }

  static getUpdateUserController(updateUserUseCase) {
    return new UpdateUserController(updateUserUseCase);
  }

  static getDeleteUserController(deleteUserUseCase) {
    return new DeleteUserController(deleteUserUseCase);
  }

  static getGetUserByIdController(getUserByIdUseCase) {
    return new GetUserByIdController(getUserByIdUseCase);
  }

  static getAllControllers(useCases) {
    const Self = UsersControllersConfig;

    return {
      addUserController: Self.getAddUserController(
        useCases.addUserUseCase
      ),
      deleteUserController: Self.getDeleteUserController(
        useCases.deleteUserUseCase
      ),
      updateUserController: Self.getUpdateUserController(
        useCases.updateUserUseCase
      ),
      getUserByIdController: Self.getGetUserByIdController(
        useCases.getUserByIdUseCase
      )
    };
  }
};
