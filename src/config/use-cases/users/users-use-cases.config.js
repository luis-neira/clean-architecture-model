'use strict';

const {
  AddUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase
} = require('../../../core/use-cases/users');

module.exports = class UsersUseCasesConfig {
  static getAddUserUseCase(dbRepository) {
    return new AddUserUseCase(dbRepository);
  }

  static getDeleteUserUseCase(dbRepository) {
    return new DeleteUserUseCase(dbRepository);
  }

  static getUpdateUserUseCase(dbRepository) {
    return new UpdateUserUseCase(dbRepository);
  }

  static getGetUserByIdUseCase(dbRepository) {
    return new GetUserByIdUseCase(dbRepository);
  }

  static getAllUseCases(dbRepository) {
    const Self = UsersUseCasesConfig;
    
    return {
      addUserUseCase: Self.getAddUserUseCase(dbRepository),
      deleteUserUseCase: Self.getDeleteUserUseCase(dbRepository),
      updateUserUseCase: Self.getUpdateUserUseCase(dbRepository),
      getUserByIdUseCase: Self.getGetUserByIdUseCase(dbRepository)
    };
  }
};
