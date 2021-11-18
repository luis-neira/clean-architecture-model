'use strict';

module.exports = class UsersControllersConfig {
  constructor() {}

  getAllControllers(useCases) {
    return {
      addUserController: getAddUserController(
        useCases.addUserUseCase
      ),
      deleteUserController: getDeleteUserController(
        useCases.deleteUserUseCase
      ),
      updateUserController: getUpdateUserController(
        useCases.updateUserUseCase
      ),
      getUserByIdController: getGetUserByIdController(
        useCases.getUserByIdUseCase
      )
    };
  }
};

function getAddUserController(addUserUseCase) {
  const { AddUserController } = require('../../../controllers/users');
  
  return new AddUserController(addUserUseCase);
}

function getDeleteUserController(deleteUserUseCase) {
  const { DeleteUserController } = require('../../../controllers/users');
  
  return new DeleteUserController(deleteUserUseCase);
}

function getUpdateUserController(updateUserUseCase) {
  const { UpdateUserController } = require('../../../controllers/users');
  
  return new UpdateUserController(updateUserUseCase);
}

function getGetUserByIdController(getUserByIdUseCase) {
  const { GetUserByIdController } = require('../../../controllers/users');

  return new GetUserByIdController(getUserByIdUseCase);
}
