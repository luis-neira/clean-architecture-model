'use strict';

const { BaseController } = require('../controller');
const { SuccessResponse } = require('../../common/contracts');
const { OrderMap } = require('../../common/mappers');

module.exports = class GetOrderByIdController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.params;

    const orderOrError = await this.useCase.execute(requestDetails);

    if (orderOrError.isFailure) {
      const useCaseError = orderOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const foundOrder = orderOrError.getValue();

    const responseDTO = SuccessResponse.create(OrderMap.toDTO(foundOrder));

    this.ok(res, responseDTO);
  }
};
