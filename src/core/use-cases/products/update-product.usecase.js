'use strict';

const { Result } = require('../../lib/result');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class UpdateProductUseCase {
  constructor(dbRepository) {
    this.productRepository = dbRepository.productsRepository;
  }

  async execute(product) {
    try {
      const persistedProduct = await this.productRepository.update(product);

      if (persistedProduct === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find product by id=${product.id}`)
        );
      }

      return Result.ok(persistedProduct);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
