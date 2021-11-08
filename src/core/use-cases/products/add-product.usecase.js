'use strict';

const { Result } = require('../../lib/result');
const { Product } = require('../../entities');
const { BaseUseCase } = require('./base.usecase');

module.exports = class AddProductUseCase extends BaseUseCase {
  async execute({ name, description, images, price, color, meta }) {
    const product = Product.create({
      name,
      description,
      images,
      price,
      color,
      meta
    });

    try {
      const persistedUser = await this.productRepository.add(product);

      return Result.ok(persistedUser);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
