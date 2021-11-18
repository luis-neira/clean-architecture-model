'use strict';

module.exports = class OrdersUseCasesConfig {
  constructor() {}

  getAllUseCases(dbRepository) {
    return {
      addOrderUseCase: getAddOrderUseCase(dbRepository),
      getOrderByIdUseCase: getGetOrderByIdUseCase(dbRepository),
      updateOrderUseCase: getUpdateOrderUseCase(dbRepository),
      deleteOrderUseCase: getDeleteOrderUseCase(dbRepository)
    };
  }
};

function getAddOrderUseCase(dbRepository) {
  const { AddOrderUseCase } = require('../../../core/use-cases/orders');

  return new AddOrderUseCase(dbRepository);
}

function getGetOrderByIdUseCase(dbRepository) {
  const { GetOrderByIdUseCase } = require('../../../core/use-cases/orders');

  return new GetOrderByIdUseCase(dbRepository);
}

function getUpdateOrderUseCase(dbRepository) {
  const { UpdateOrderUseCase } = require('../../../core/use-cases/orders');

  return new UpdateOrderUseCase(dbRepository);
}

function getDeleteOrderUseCase(dbRepository) {
  const { DeleteOrderUseCase } = require('../../../core/use-cases/orders');

  return new DeleteOrderUseCase(dbRepository);
}
