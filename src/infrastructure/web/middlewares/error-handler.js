'use strict';

const { FailResponse } = require('../../../common/contracts');

module.exports = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(
    FailResponse.create({
      msg: err.msg || err.message || 'No MSG',
      reason: err.reason || err.stack || 'Something went wrong',
      url: req.originalUrl,
      ip: req.ip,
      validationErrors: err.validationErrors
    })
  );
};
