'use strict';

const { Result } = require('../../lib/result');
const { BaseUseCase } = require('./base.usecase');
const { ValueNotFoundError } = require('../../../common/errors');

module.exports = class DeleteProductUseCase extends BaseUseCase {
  async execute(request) {
    try {
      const persistedProduct = await this.productRepository.delete(request);

      if (persistedProduct === null) {
        return Result.fail(
          new ValueNotFoundError(`Couldn't find product by id=${request.id}`)
        );
      }

      return Result.ok(persistedProduct);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
