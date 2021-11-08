'use strict';

const {
  AddOrderUseCase,
  GetOrderByIdUseCase,
  UpdateOrderUseCase,
  DeleteOrderUseCase
} = require('../../../core/use-cases/orders');

module.exports = class OrdersUseCasesConfig {
  static getAddOrderUseCase(dbRepository) {
    return new AddOrderUseCase(dbRepository);
  }

  static getGetOrderByIdUseCase(dbRepository) {
    return new GetOrderByIdUseCase(dbRepository);
  }

  static getUpdateOrderUseCase(dbRepository) {
    return new UpdateOrderUseCase(dbRepository);
  }

  static getDeleteOrderUseCase(dbRepository) {
    return new DeleteOrderUseCase(dbRepository);
  }

  static getAllUseCases(dbRepository) {
    const Self = OrdersUseCasesConfig;

    return {
      addOrderUseCase: Self.getAddOrderUseCase(dbRepository),
      getOrderByIdUseCase: Self.getGetOrderByIdUseCase(dbRepository),
      updateOrderUseCase: Self.getUpdateOrderUseCase(dbRepository),
      deleteOrderUseCase: Self.getDeleteOrderUseCase(dbRepository)
    };
  }
};
