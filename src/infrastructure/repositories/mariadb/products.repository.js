'use strict';

const { sequelize } = require('../../orm/sequelize');
const { ProductMap } = require('../../../common/mappers');

const ProductsRepository = (function () {
  let _model = new WeakMap();

  class ProductsRepository {
    constructor() {
      _model.set(this, sequelize.model('Product'));
    }

    async add(product) {
      const productRawData = ProductMap.toPersistence(product);

      const model = _model.get(this);
      const addedProduct = await model.create(productRawData);

      return ProductMap.toDomain(addedProduct.toJSON());
    }

    async getById(productId) {
      const model = _model.get(this);
      const foundProduct = await model.findOne({
        where: { id: productId }
      });

      if (!foundProduct) return null;

      return ProductMap.toDomain(foundProduct.toJSON());
    }

    async update(newRawProductData) {
      const model = _model.get(this);
      const foundProduct = await model.findOne({
        where: { id: newRawProductData.id }
      });

      if (!foundProduct) return null;

      Reflect.deleteProperty(newRawProductData, 'id');

      foundProduct.set({
        ...newRawProductData
      });

      await foundProduct.save();

      return ProductMap.toDomain(foundProduct.toJSON());
    }

    async delete(rawProductData) {
      const model = _model.get(this);
      const foundProduct = await model.findOne({
        where: { id: rawProductData.id }
      });

      if (!foundProduct) return null;

      await foundProduct.destroy();

      return ProductMap.toDomain(foundProduct.toJSON());
    }
  }

  return ProductsRepository;
})();

module.exports = ProductsRepository;
