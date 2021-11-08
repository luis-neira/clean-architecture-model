'use strict';

const {
  AddProductUseCase,
  GetProductByIdUseCase,
  DeleteProductUseCase,
  UpdateProductUseCase
} = require('../../../core/use-cases/products');

module.exports = class ProductsUseCasesConfig {
  static getAddProductUseCase(dbRepository) {
    return new AddProductUseCase(dbRepository);
  }

  static getGetProductByIdUseCase(dbRepository) {
    return new GetProductByIdUseCase(dbRepository);
  }

  static getDeleteProductUseCase(dbRepository) {
    return new DeleteProductUseCase(dbRepository);
  }
  
  static getUpdateProductUseCase(dbRepository) {
    return new UpdateProductUseCase(dbRepository);
  }

  static getAllUseCases(dbRepository) {
    const Self = ProductsUseCasesConfig;
    
    return {
      addProductUseCase: Self.getAddProductUseCase(dbRepository),
      getProductByIdUseCase: Self.getGetProductByIdUseCase(dbRepository),
      deleteProductUseCase: Self.getDeleteProductUseCase(dbRepository),
      updateProductUseCase: Self.getUpdateProductUseCase(dbRepository)
    };
  }
};
