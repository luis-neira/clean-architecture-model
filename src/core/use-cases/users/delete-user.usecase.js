'use strict';

const { Result } = require('../../lib/result');
const { BaseUseCase } = require('./base.usecase');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class DeleteUserUseCase extends BaseUseCase {
  async execute({ user }) {
    try {
      const deletedUser = await this.usersRepository.delete(user);

      if (deletedUser === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find user by id=${user.id}`)
        );
      }

      return Result.ok(deletedUser);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
