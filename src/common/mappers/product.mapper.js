'use strict';

const { Product } = require('../../core/entities');

module.exports = class ProductMap {
  static toDTO(product) {
    return {
      id: product.id,
      name: product.props.name,
      description: product.props.description,
      images: product.props.images,
      price: product.props.price,
      color: product.props.color,
      meta: product.props.meta
    };
  }

  static toPersistence(product) {
    return {
      id: product.id,
      name: product.props.name,
      description: product.props.description,
      images: product.props.images,
      price: product.props.price,
      color: product.props.color,
      meta: product.props.meta
    };
  }

  static toDomain(raw) {
    return Product.create(
      {
        name: raw.name,
        description: raw.description,
        images: raw.images,
        price: raw.price,
        color: raw.color,
        meta: raw.meta
      },
      raw.id
    );
  }
};
