'use strict';

const { shallowEqual } = require('shallow-equal-object');

module.exports.ValueObject = class ValueObject {
  props;

  constructor(props) {
    this.props = Object.freeze(props);
  }

  equals(vo) {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, vo.props);
  }
};
