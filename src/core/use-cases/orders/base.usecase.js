'use strict';

module.exports.BaseUseCase = class OrdersBaseUseCase {
  ordersRepository;

  constructor(dbRepository) {
    if (!dbRepository)
      throw new Error('The db repository should exist in dependencies');
    if (!dbRepository.ordersRepository)
      throw new Error('The db.orders repository should exist in dependencies');
    this.ordersRepository = dbRepository.ordersRepository;
  }
};
