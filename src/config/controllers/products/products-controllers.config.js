'use strict';

const {
  AddProductController,
  GetProductByIdController,
  DeleteProductController,
  UpdateProductController
} = require('../../../controllers/products');

module.exports = class ProductsControllersConfig {
  static getAddProductController(addProductUseCase) {
    return new AddProductController(addProductUseCase);
  }

  static getGetProductByIdController(getProductByIdUseCase) {
    return new GetProductByIdController(getProductByIdUseCase);
  }

  static getDeleteProductController(deleteProductUseCase) {
    return new DeleteProductController(deleteProductUseCase);
  }

  static getUpdateProductController(updateProductUseCase) {
    return new UpdateProductController(updateProductUseCase);
  }

  static getAllControllers(useCases) {
    const Self = ProductsControllersConfig;

    return {
      addProductsController: Self.getAddProductController(
        useCases.addProductUseCase
      ),
      getProductByIdController: Self.getGetProductByIdController(
        useCases.getProductByIdUseCase
      ),
      deleteProductController: Self.getDeleteProductController(
        useCases.deleteProductUseCase
      ),
      updateProductController: Self.getUpdateProductController(
        useCases.updateProductUseCase
      )
    };
  }
};
