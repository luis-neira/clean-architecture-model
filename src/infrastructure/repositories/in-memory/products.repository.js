'use strict';

const { v4: uuidv4 } = require('uuid');

const inMemorydb = require('../../orm/in-memory');
const { ProductMap } = require('../../../common/mappers');

const ProductsRepository = (function () {
  let _db = new WeakMap();

  class ProductsRepository {
    constructor() {
      _db.set(this, inMemorydb);
    }

    async add(product) {
      const { products } = _db.get(this);
      if (!product.id) product.id = uuidv4();

      products.push(ProductMap.toPersistence(product));
      const persistedUser = products[products.length - 1];
      return ProductMap.toDomain(persistedUser);
    }

    async update(product) {
      const { products } = _db.get(this);
      const productIndex = products.findIndex((u) => u.id === product.id);
      if (productIndex < 0) return null;

      products[productIndex] = product;
      return ProductMap.toDomain(products[productIndex]);
    }

    async delete(product) {
      const { products } = _db.get(this);
      const productIndex = products.findIndex((u) => u.id === product.id);
      if (productIndex < 0) return null;

      const deletedProducts = products.splice(productIndex, 1);
      return ProductMap.toDomain(deletedProducts[0]);
    }

    async getById(id) {
      const { products } = _db.get(this);
      const persistedUser = products.find((u) => u.id === id);
      if (!persistedUser) return null;

      return ProductMap.toDomain(persistedUser);
    }
  };

  return ProductsRepository;
})();

module.exports = ProductsRepository;
