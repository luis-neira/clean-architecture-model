'use strict';

const { BaseController } = require('../base.controller');
const { SuccessResponse } = require('../../common/contracts');
const { ProductMap } = require('../../common/mappers');

module.exports = class AddProductController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const userOrError = await this.useCase.execute(requestDetails);

    if (userOrError.isFailure) {
      const useCaseError = userOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const addedProduct = userOrError.getValue();

    const responseDto = SuccessResponse.create(ProductMap.toDTO(addedProduct));

    this.created(res, responseDto);
  }
};
