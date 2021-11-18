'use strict';

const Result = (function () {
  let _error = null;
  let _value = null;

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
      _error = error;
      _value = value;

      Object.freeze(this);
    }

    getValue() {
      if (!this.isSuccess) {
        return _error;
      }
      return _value;
    }

    getError() {
      if (this.isFailure) {
        return _error;
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
