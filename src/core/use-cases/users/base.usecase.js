'use strict';

module.exports.BaseUseCase = class UserBaseUseCase {
  usersRepository;

  constructor(dbRepository) {
    if (!dbRepository)
      throw new Error('The db repository should exist in dependencies');
    if (!dbRepository.usersRepository)
      throw new Error('The db.users repository should exist in dependencies');
    this.usersRepository = dbRepository.usersRepository;
  }
};
