'use strict';

const { Result } = require('../../lib/result');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class GetUserByIdUseCase {
  constructor(dbRepository) {
    this.usersRepository = dbRepository.usersRepository;
  }

  async execute({ id }) {
    try {
      const foundUser = await this.usersRepository.getById(id);

      if (foundUser === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${id}`)
        );
      }

      return Result.ok(foundUser);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
