'use strict';

const { BaseController } = require('../base.controller');
const { SuccessResponse } = require('../../common/contracts');
const { OrderMap } = require('../../common/mappers');

module.exports = class AddOrderController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const orderOrError = await this.useCase.execute(requestDetails);

    if (orderOrError.isFailure) {
      const useCaseError = orderOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const addedOrder = orderOrError.getValue();

    const responseDTO = SuccessResponse.create(OrderMap.toDTO(addedOrder));

    this.created(res, responseDTO);
  }
};
