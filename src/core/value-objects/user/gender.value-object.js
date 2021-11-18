'use strict';

const { ValueObject } = require('../value-object');
const { Result } = require('../../lib/result');
const { ValidationError } = require('../../../common/errors');

module.exports.Gender = class Gender extends ValueObject {
  constructor(props) {
    super(props);
  }

  get value() {
    return this.props.value;
  }

  static create(gender) {
    if (gender === undefined || gender === null) {
      return Result.fail(new ValidationError("User 'gender' must exist."));
    }

    if (gender < 0 || gender > 2) {
      return Result.fail(
        new ValidationError(
          "User 'gender' must be greater 0 chars & less than 3."
        )
      );
    }

    return Result.ok(new Gender({ value: gender }));
  }
};
