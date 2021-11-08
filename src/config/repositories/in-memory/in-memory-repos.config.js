'use strict';

const {
  UsersRepository,
  OrdersRepository,
  ProductsRepository
} = require('../../../infrastructure/repositories/in-memory');

module.exports = class RepositoriesConfig {
  static getInMemoryRepos() {
    return {
      usersRepository: new UsersRepository(),
      ordersRepository: new OrdersRepository(),
      productsRepository: new ProductsRepository()
    };
  }
};
