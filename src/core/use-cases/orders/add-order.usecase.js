'use strict';

const { Result } = require('../../lib/result');
const { BaseUseCase } = require('./base.usecase');
const { Order } = require('../../entities');

const { ValidationError } = require('../../../common/errors');

module.exports = class AddOrderUseCase extends BaseUseCase {
  usersRepository;
  productsRepository;

  constructor(dbRepository) {
    super(dbRepository);
    this.usersRepository = dbRepository.usersRepository;
    this.productsRepository = dbRepository.productsRepository;
  }

  async execute({ userId, productsIds, date, isPayed, meta }) {
    const order = Order.create({
      userId,
      productsIds,
      date,
      isPayed,
      meta
    });

    try {
      const validationErrors = await this.getValidationErrors(order);

      if (validationErrors.length > 0) {
        const invalid = new ValidationError('Validation Errors');
        invalid.reason = 'Bad data';
        invalid.validationErrors = validationErrors;
        return Result.fail(invalid);
      }

      const persistedOrder = await this.ordersRepository.add(order);

      return Result.ok(persistedOrder);
    } catch (err) {
      return Result.fail(err);
    }
  }

  async getUser(userId) {
    try {
      const persistedUser = await this.usersRepository.getById(userId);
      return Result.ok(persistedUser);
    } catch (err) {
      return Result.fail(err);
    }
  }

  async getProducts(productsIds) {
    const getById_ProductsRepo_Requests = productsIds.map((id) => {
      return this.productsRepository.getById(id);
    });

    try {
      const products = await Promise.all(getById_ProductsRepo_Requests);
      return Result.ok(products);
    } catch (err) {
      return Result.fail(err);
    }
  }

  async getValidationErrors(order) {
    const returnable = [];

    const { productsIds = [], userId } = order;

    const productsOrError = await this.getProducts(productsIds);

    if (productsOrError.isFail) {
      throw new Error('Something is wrong with Products Repository');
    }

    const products = productsOrError.getValue();

    const notFoundIds = products.reduce((accum, product, index) => {
      if (product === null) accum.push(productsIds[index]);
      return accum;
    }, []);

    if (notFoundIds.length > 0) {
      returnable.push({
        field: 'productsIds',
        msg: `No products with ids ${notFoundIds.join(', ')}`
      });
    }

    const userOrError = await this.getUser(userId);

    if (userOrError.isFail) {
      throw new Error('Something is wrong with Users Repository');
    }

    const user = userOrError.getValue();

    if (user === null) {
      returnable.push({
        field: 'userId',
        msg: `No user with id ${userId}`
      });
    }

    return returnable;
  }
};
