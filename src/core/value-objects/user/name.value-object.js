'use strict';

const { ValueObject } = require('../value-object');
const { Result } = require('../../lib/result');
const { ValidationError } = require('../../../common/errors');

module.exports.Name = class Name extends ValueObject {
  get value() {
    return this.props.value;
  }

  constructor(props) {
    super(props);
  }

  static create(name) {
    if (name === undefined || name === null) {
      return Result.fail(new ValidationError("User 'name' must exist."));
    }

    if (name.length <= 2 || name.length > 100) {
      return Result.fail(
        new ValidationError(
          "User 'name' must be greater than 2 chars & less than 100."
        )
      );
    }

    return Result.ok(new Name({ value: name }));
  }
};
