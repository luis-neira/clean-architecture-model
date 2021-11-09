'use strict';

const { Result } = require('../../lib/result');
const { User } = require('../../entities');
const { Gender, LastName, Name } = require('../../value-objects/user');

module.exports = class AddUserUseCase {
  constructor(dbRepository) {
    this.usersRepository = dbRepository.usersRepository;
  }

  async execute({ name, lastName, gender, meta }) {
    const nameOrError = Name.create(name);
    const lastNameOrError = LastName.create(lastName);
    const genderOrError = Gender.create(gender);

    const result = Result.combine([
      nameOrError,
      lastNameOrError,
      genderOrError
    ]);

    if (result.isFailure) {
      return Result.fail(result.getError());
    }

    const user = User.create({
      name: nameOrError.getValue(),
      lastName: lastNameOrError.getValue(),
      gender: genderOrError.getValue(),
      meta
    });

    try {
      const addedUser = await this.usersRepository.add(user);

      return Result.ok(addedUser);
    } catch (err) {
      return Result.fail(err);
    }
  }
};
