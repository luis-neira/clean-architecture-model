'use strict';

const { Result } = require('../../lib/result');
const { BaseUseCase } = require('./base.usecase');
const { ValueNotFoundError } = require('../../../common/errors');
const { UserMap } = require('../../../common/mappers');

module.exports = class GetUserByIdUseCase extends BaseUseCase {
  async execute({ id }) {
    try {
      const foundUser = await this.usersRepository.getById(id);

      if (foundUser === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${id}`)
        );
      }

      return Result.ok(UserMap.toDomain(foundUser));
    } catch (err) {
      return Result.fail(err);
    }
  }
};
