'use strict';

module.exports = class OrdersControllersConfig {
  constructor() {}

  getAllControllers(useCases) {
    return {
      addOrderController: getAddOrderController(
        useCases.addOrderUseCase
      ),
      getOrderByIdController: getGetOrderByIdController(
        useCases.getOrderByIdUseCase
      ),
      updateOrderController: getUpdateOrderController(
        useCases.updateOrderUseCase
      ),
      deleteOrderController: getDeleteOrderController(
        useCases.deleteOrderUseCase
      )
    };
  }
};

function getAddOrderController(addOrderUseCase) {
  const { AddOrderController } = require('../../../controllers/orders');

  return new AddOrderController(addOrderUseCase);
}

function getGetOrderByIdController(getOrderByIdUseCase) {
  const { GetOrderByIdController } = require('../../../controllers/orders');
  
  return new GetOrderByIdController(getOrderByIdUseCase);
}

function getUpdateOrderController(updateOrderUseCase) {
  const { UpdateOrderController } = require('../../../controllers/orders');
  
  return new UpdateOrderController(updateOrderUseCase)
}

function getDeleteOrderController(deleteOrderUseCase) {
  const { DeleteOrderController } = require('../../../controllers/orders');

  return new DeleteOrderController(deleteOrderUseCase)
}
