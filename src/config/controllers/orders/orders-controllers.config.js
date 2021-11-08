'use strict';

const {
  AddOrderController,
  GetOrderByIdController,
  UpdateOrderController,
  DeleteOrderController
} = require('../../../controllers/orders');

module.exports = class UsersControllersConfig {
  static getAddOrderController(addOrderUseCase) {
    return new AddOrderController(addOrderUseCase);
  }

  static getGetOrderByIdController(getOrderByIdUseCase) {
    return new GetOrderByIdController(getOrderByIdUseCase);
  }

  static getUpdateOrderController(updateOrderUseCase) {
    return new UpdateOrderController(updateOrderUseCase)
  }

  static getDeleteOrderController(deleteOrderUseCase) {
    return new DeleteOrderController(deleteOrderUseCase)
  }

  static getAllControllers(useCases) {
    const Self = UsersControllersConfig;

    return {
      addOrderController: Self.getAddOrderController(
        useCases.addOrderUseCase
      ),
      getOrderByIdController: Self.getGetOrderByIdController(
        useCases.getOrderByIdUseCase
      ),
      updateOrderController: Self.getUpdateOrderController(
        useCases.updateOrderUseCase
      ),
      deleteOrderController: Self.getDeleteOrderController(
        useCases.deleteOrderUseCase
      )
    };
  }
};
