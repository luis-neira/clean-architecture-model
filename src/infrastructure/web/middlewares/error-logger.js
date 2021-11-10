'use strict';

module.exports = function errorLogger(err, req, res, next) {
  // log if error is not http-error with status property.
  if (!err.status) {
    req.log.error({ err }, 'Internal server error');
  }

  next(err);
};
