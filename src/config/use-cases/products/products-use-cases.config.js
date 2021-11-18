'use strict';

module.exports = class ProductsUseCasesConfig {
  constructor() {}

  getAllUseCases(dbRepository) {
    return {
      addProductUseCase: getAddProductUseCase(dbRepository),
      deleteProductUseCase: getDeleteProductUseCase(dbRepository),
      updateProductUseCase: getUpdateProductUseCase(dbRepository),
      getProductByIdUseCase: getGetProductByIdUseCase(dbRepository)
    };
  }
};

function getAddProductUseCase(dbRepository) {
  const { AddProductUseCase } = require('../../../core/use-cases/products');

  return new AddProductUseCase(dbRepository);
}

function getDeleteProductUseCase(dbRepository) {
  const { DeleteProductUseCase } = require('../../../core/use-cases/products');

  return new DeleteProductUseCase(dbRepository);
}

function getUpdateProductUseCase(dbRepository) {
  const { UpdateProductUseCase } = require('../../../core/use-cases/products');

  return new UpdateProductUseCase(dbRepository);
}

function getGetProductByIdUseCase(dbRepository) {
  const { GetProductByIdUseCase } = require('../../../core/use-cases/products');

  return new GetProductByIdUseCase(dbRepository);
}
