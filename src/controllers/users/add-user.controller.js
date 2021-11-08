'use strict';

const { BaseController } = require('../base.controller');
const { SuccessResponse } = require('../../common/contracts');
const { UserMap } = require('../../common/mappers');

module.exports = class AddUserController extends BaseController {
  async processRequest(req, res, next) {
    const requestDetails = req.body;

    const userOrError = await this.useCase.execute(requestDetails);

    if (userOrError.isFailure) {
      const useCaseError = userOrError.getError();

      const errorHandler = this.makeErrorHandler(useCaseError.code);
      return errorHandler(next, useCaseError);
    }

    const addedUser = userOrError.getValue();

    const responseDto = SuccessResponse.create(UserMap.toDTO(addedUser));

    this.created(res, responseDto);
  }
};
