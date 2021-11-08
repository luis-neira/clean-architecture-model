'use strict';

const { Entity } = require('./base.entity');

module.exports = class Order extends Entity {
  static create(
    {
      userId = null,
      productsIds = [],
      date = new Date(),
      isPayed = false,
      meta = {}
    } = {},
    id
  ) {
    return new Order(
      {
        userId,
        productsIds,
        date,
        isPayed,
        meta
      },
      id
    );
  }

  constructor(props, id) {
    super(props, id);
  }

  get userId() {
    return this.props.userId;
  }

  get productsIds() {
    return this.props.productsIds;
  }

  get date() {
    return this.props.date;
  }

  get isPayed() {
    return this.props.isPayed;
  }

  get meta() {
    return this.props.meta;
  }
};
