'use strict';

const { HttpError } = require('../../../common/errors');

module.exports = (req, res, next) => {
  const notFound = HttpError.create(404, 'Resouce not found');
  next(notFound);
};
