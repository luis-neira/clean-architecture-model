'use strict';

module.exports = class UsersUseCasesConfig {
  constructor() {}

  getAllUseCases(dbRepository) {
    return {
      addUserUseCase: getAddUserUseCase(dbRepository),
      deleteUserUseCase: getDeleteUserUseCase(dbRepository),
      updateUserUseCase: getUpdateUserUseCase(dbRepository),
      getUserByIdUseCase: getGetUserByIdUseCase(dbRepository)
    };
  }
};

function getAddUserUseCase(dbRepository) {
  const { AddUserUseCase } = require('../../../core/use-cases/users');

  return new AddUserUseCase(dbRepository);
}

function getDeleteUserUseCase(dbRepository) {
  const { DeleteUserUseCase } = require('../../../core/use-cases/users');

  return new DeleteUserUseCase(dbRepository);
}

function getUpdateUserUseCase(dbRepository) {
  const { UpdateUserUseCase } = require('../../../core/use-cases/users');

  return new UpdateUserUseCase(dbRepository);
}

function getGetUserByIdUseCase(dbRepository) {
  const { GetUserByIdUseCase } = require('../../../core/use-cases/users');

  return new GetUserByIdUseCase(dbRepository);
}
