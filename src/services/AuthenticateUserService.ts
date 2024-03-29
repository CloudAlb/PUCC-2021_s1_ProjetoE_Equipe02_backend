import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  login: string;
  password: string;
}

interface Response {
  token: string;
  id_user: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: [{ username: login }, { email: login }],
    });

    // TODO, ajeitar todos os HTTP status code
    // Por que tem que deixar 200 para funcionar?
    if (!user) {
      throw new AppError('Incorrect login/password combination.', 200);
    }

    // user.password -> senha criptografada
    // password -> senha não-criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect login/password combination.', 200);
    }

    // usuário autenticado

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id_user,
      expiresIn,
      // pensar na questão "experiência de usuário X segurança"
      // estratégias de refresh token
    });

    return { token, id_user: user.id_user };
  }
}

export default AuthenticateUserService;
