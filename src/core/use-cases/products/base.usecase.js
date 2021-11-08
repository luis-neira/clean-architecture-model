'use strict';

module.exports.BaseUseCase = class ProductsBaseUseCase {
  productRepository;

  constructor(dbRepository) {
    if (!dbRepository)
      throw new Error('The db repository should exist in dependencies');
    if (!dbRepository.productsRepository)
      throw new Error('The db.products repository should exist in dependencies');
    this.productRepository = dbRepository.productsRepository;
  }
};
