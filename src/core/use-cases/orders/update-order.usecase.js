'use strict';

const { Result } = require('../../lib/result');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class UpdateOrderUseCase {
  constructor(dbRepository) {
    this.ordersRepository = dbRepository.ordersRepository;
  }

  async execute(order) {
    try {
      const persistedOrder = await this.ordersRepository.update(order);

      if (persistedOrder === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find order by id=${order.id}`)
        );
      }

      return Result.ok(persistedOrder);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
