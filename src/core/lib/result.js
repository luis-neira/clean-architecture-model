'use strict';

const Result = (function () {
  let _value = new WeakMap();
  let _error = new WeakMap();

  class Result {
    constructor(isSuccess, error, value) {
      if (isSuccess && error) {
        throw new Error(
          'InvalidOperation: A result cannot be successful and contain an error'
        );
      }

      if (!isSuccess && !error) {
        throw new Error(
          'InvalidOperation: A failing result needs to contain an error message'
        );
      }

      this.isSuccess = isSuccess;
      this.isFailure = !isSuccess;
      _value.set(this, value);
      _error.set(this, error);

      Object.freeze(this);
    }

    getValue() {
      if (!this.isSuccess) {
        return _error.get(this);
      }
      return _value.get(this);
    }

    getError() {
      if (this.isFailure) {
        return _error.get(this);
      }
      return undefined;
    }

    static ok(result) {
      return new Result(true, null, result);
    }

    static fail(error) {
      return new Result(false, error);
    }

    static combine(results) {
      for (let result of results) {
        if (result.isFailure) return result;
      }
      return Result.ok();
    }
  }

  return Result;
})();

module.exports = { Result };
