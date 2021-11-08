'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports.Entity = class Entity {
  id;
  props;

  constructor(props, id) {
    this.id = id ? id : uuidv4();
    this.props = props;
  }

  equals(object) {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.id === object.id;
  }
};

const isEntity = (v) => {
  return v instanceof Entity;
};
