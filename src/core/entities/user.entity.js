'use strict';

const { Entity } = require('./base.entity');

module.exports.User = class User extends Entity {
  static create(
    {
      name = null,
      lastName = null,
      gender = genders.NOT_SPECIFIED,
      meta = {}
    } = {},
    id
  ) {
    return new User({ name, lastName, gender, meta }, id);
  }

  constructor(props, id) {
    super(props, id);
  }

  get name() {
    return this.props.name;
  }

  get lastName() {
    return this.props.lastName;
  }

  get gender() {
    return this.props.gender;
  }

  get meta() {
    return this.props.meta;
  }
};

const genders = {
  NOT_SPECIFIED: 0,
  FEMALE: 1,
  MALE: 2
};

module.exports.userConstants = {
  genders
};
