'use strict';

const { Result } = require('../../lib/result');
const { BaseUseCase } = require('./base.usecase');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class UpdateUserUseCase extends BaseUseCase {
  async execute({ user }) {
    try {
      const updatedUser = await this.usersRepository.update(user);

      if (updatedUser === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${user.id}`)
        );
      }

      return Result.ok(updatedUser);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
