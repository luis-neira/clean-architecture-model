'use strict';

const { Order } = require('../../core/entities');

module.exports = class OrderMap {
  static toDTO(order) {
    return {
      id: order.id,
      userId: order.props.userId,
      productsIds: order.props.productsIds,
      date: order.props.date,
      isPayed: order.props.isPayed,
      meta: order.props.meta
    };
  }

  static toPersistence(order) {
    return {
      id: order.id,
      userId: order.props.userId,
      productsIds: order.props.productsIds,
      date: order.props.date,
      isPayed: order.props.isPayed,
      meta: order.props.meta
    };
  }

  static toDomain(raw) {
    return Order.create(
      {
        userId: raw.userId,
        productsIds: raw.productsIds,
        date: raw.date,
        isPayed: raw.isPayed,
        meta: raw.meta
      },
      raw.id
    );
  }
};
