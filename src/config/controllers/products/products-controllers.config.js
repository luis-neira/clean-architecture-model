'use strict';

module.exports = class ProductsControllersConfig {
  constructor() {}

  getAllControllers(useCases) {
    return {
      addProductController: getAddProductController(
        useCases.addProductUseCase
      ),
      getProductByIdController: getGetProductByIdController(
        useCases.getProductByIdUseCase
      ),
      deleteProductController: getDeleteProductController(
        useCases.deleteProductUseCase
      ),
      updateProductController: getUpdateProductController(
        useCases.updateProductUseCase
      )
    };
  }
};

function getAddProductController(addProductUseCase) {
  const { AddProductController } = require('../../../controllers/products');

  return new AddProductController(addProductUseCase);
}

function getGetProductByIdController(getProductByIdUseCase) {
  const { GetProductByIdController } = require('../../../controllers/products');

  return new GetProductByIdController(getProductByIdUseCase);
}

function getDeleteProductController(deleteProductUseCase) {
  const { DeleteProductController } = require('../../../controllers/products');

  return new DeleteProductController(deleteProductUseCase);
}

function getUpdateProductController(updateProductUseCase) {
  const { UpdateProductController } = require('../../../controllers/products');

  return new UpdateProductController(updateProductUseCase);
}
