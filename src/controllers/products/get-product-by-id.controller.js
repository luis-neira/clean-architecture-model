'use strict';

const { BaseController } = require('../controller');
const { SuccessResponse } = require('../../common/contracts');
const { ProductMap } = require('../../common/mappers');

module.exports = class GetProductByIdController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.params;

    const productOrError = await this.useCase.execute(requestDetails);

    if (productOrError.isFailure) {
      const useCaseError = productOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const foundProduct = productOrError.getValue();

    const responseDto = SuccessResponse.create(ProductMap.toDTO(foundProduct));

    this.ok(res, responseDto);
  }
};
