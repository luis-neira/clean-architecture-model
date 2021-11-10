'use strict';

const { sequelize } = require('../../orm/sequelize');
const { ProductMap } = require('../../../common/mappers');

module.exports = class ProductRepository {
  constructor() {
    this._db = sequelize;
    this.model = this._db.model('Product');
  }

  async add(product) {
    const productRawData = ProductMap.toPersistence(product);

    const addedProduct = await this.model.create(productRawData);

    return ProductMap.toDomain(addedProduct.toJSON());
  }

  async getById(productId) {
    const foundProduct = await this.model.findOne({
      where: { id: productId }
    });

    if (!foundProduct) return null;

    return ProductMap.toDomain(foundProduct.toJSON());
  }

  async update(newRawProductData) {
    const foundProduct = await this.model.findOne({
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
    const foundProduct = await this.model.findOne({
      where: { id: rawProductData.id }
    });

    if (!foundProduct) return null;

    await foundProduct.destroy();

    return ProductMap.toDomain(foundProduct.toJSON());
  }
};
