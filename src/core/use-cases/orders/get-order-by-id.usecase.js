'use strict';

const { Result } = require('../../lib/result');
const { BaseUseCase } = require('./base.usecase');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class GetOrderByIdUseCase extends BaseUseCase {
  async execute({ id }) {
    try {
      const persistedOrder = await this.ordersRepository.getById(id);

      if (persistedOrder === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find order by id=${id}`)
        );
      }

      return Result.ok(persistedOrder);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
