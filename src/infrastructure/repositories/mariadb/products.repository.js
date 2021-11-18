'use strict';

const { sequelize } = require('../../orm/sequelize');
const { ProductMap } = require('../../../common/mappers');

const ProductsRepository = (function () {
  let _db = sequelize;
  let _model = _db.model('Product');

  return class ProductsRepository {
    constructor() {}

    async add(product) {
      const productRawData = ProductMap.toPersistence(product);

      const addedProduct = await _model.create(productRawData);

      return ProductMap.toDomain(addedProduct.toJSON());
    }

    async getById(productId) {
      const foundProduct = await _model.findOne({
        where: { id: productId }
      });

      if (!foundProduct) return null;

      return ProductMap.toDomain(foundProduct.toJSON());
    }

    async update(newRawProductData) {
      const foundProduct = await _model.findOne({
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
      const foundProduct = await _model.findOne({
        where: { id: rawProductData.id }
      });

      if (!foundProduct) return null;

      await foundProduct.destroy();

      return ProductMap.toDomain(foundProduct.toJSON());
    }
  };
})();

module.exports = ProductsRepository;
