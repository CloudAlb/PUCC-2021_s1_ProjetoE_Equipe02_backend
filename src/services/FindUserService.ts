import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

class CreateUserService {
  public async execute(id: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id_user: id },
    });

    if (!user) {
      throw new AppError('User does not exist.');
    }

    return user;
  }
}

export default CreateUserService;
