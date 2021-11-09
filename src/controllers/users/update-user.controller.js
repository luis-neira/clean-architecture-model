'use strict';

const { BaseController } = require('../controller');
const { SuccessResponse } = require('../../common/contracts');
const { UserMap } = require('../../common/mappers');

module.exports = class UpdateUserController extends BaseController {
  async processRequest(req, res, next) {
    try {
      const requestDetails = req.body;

      const userOrError = await this.useCase.execute({
        user: { ...requestDetails }
      });

      if (userOrError.isFailure) {
        const useCaseError = userOrError.getError();

        const errorHandler = this.makeErrorHandler(useCaseError.code);
        return errorHandler(next, useCaseError);
      }

      const updatedUser = userOrError.getValue();

      const responseDto = SuccessResponse.create(UserMap.toDTO(updatedUser));

      this.ok(res, responseDto);
    } catch (err) {
      next(err);
    }
  }
};
