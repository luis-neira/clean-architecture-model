'use strict';

const { Result } = require('../../lib/result');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class GetProductByIdUseCase {
  constructor(dbRepository) {
    this.productRepository = dbRepository.productsRepository;
  }

  async execute({ id }) {
    try {
      const persistedProduct = await this.productRepository.getById(id);

      if (persistedProduct === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find product by id=${id}`)
        );
      }

      return Result.ok(persistedProduct);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
