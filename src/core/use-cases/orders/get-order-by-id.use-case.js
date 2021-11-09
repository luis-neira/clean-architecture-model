'use strict';

const { Result } = require('../../lib/result');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class GetOrderByIdUseCase {
  constructor(dbRepository) {
    this.ordersRepository = dbRepository.ordersRepository;
  }

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
