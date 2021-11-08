'use strict';

const { Entity } = require('./base.entity');

module.exports = class Product extends Entity {
  static create(
    {
      name = null,
      description = null,
      images = [],
      price = null,
      color = null,
      meta = {}
    } = {},
    id
  ) {
    return new Product(
      {
        name,
        description,
        images,
        price,
        color,
        meta
      },
      id
    );
  }

  constructor(props, id) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get images() {
    return this.props.images;
  }

  get price() {
    return this.props.price;
  }

  get color() {
    return this.props.color;
  }

  get meta() {
    return this.props.meta;
  }
};
