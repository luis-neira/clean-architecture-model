'use strict';

const { BaseController } = require('../base.controller');
const { SuccessResponse } = require('../../common/contracts');
const { ProductMap } = require('../../common/mappers');

module.exports = class UpdateProductController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const productOrError = await this.useCase.execute(requestDetails);

    if (productOrError.isFailure) {
      const useCaseError = productOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const updatedProduct = productOrError.getValue();

    const responseDto = SuccessResponse.create(
      ProductMap.toDTO(updatedProduct)
    );

    this.created(res, responseDto);
  }
};
