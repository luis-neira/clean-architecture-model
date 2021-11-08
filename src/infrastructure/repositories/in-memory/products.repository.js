'use strict';

const { v4: uuidv4 } = require('uuid');

const { inMemorydb } = require('../../database');
const { ProductMap } = require('../../../common/mappers');

module.exports = class ProductRepository {
  _db = inMemorydb;

  async add(product) {
    try {
      const { products } = this._db;
      if (!product.id) product.id = uuidv4();

      products.push(ProductMap.toPersistence(product));
      const persistedUser = products[products.length - 1];
      return ProductMap.toDomain(persistedUser);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async update(product) {
    try {
      const { products } = this._db;
      const productIndex = products.findIndex((u) => u.id === product.id);
      if (productIndex < 0) return null;

      products[productIndex] = product;
      return ProductMap.toDomain(products[productIndex]);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async delete(product) {
    try {
      const { products } = this._db;
      const productIndex = products.findIndex((u) => u.id === product.id);
      if (productIndex < 0) return null;

      const deletedProducts = products.splice(productIndex, 1);
      return ProductMap.toDomain(deletedProducts[0]);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }

  async getById(id) {
    try {
      const { products } = this._db;
      const persistedUser = products.find((u) => u.id === id);
      if (!persistedUser) return null;

      return ProductMap.toDomain(persistedUser);
    } catch (err) {
      err.code = 'ERR_REPOSITORY';
      console.error(err);
      throw err;
    }
  }
};
