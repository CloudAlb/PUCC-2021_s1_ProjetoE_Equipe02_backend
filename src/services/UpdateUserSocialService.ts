import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';
import Social from '../models/Social';

import GetDateNow from "../services/GetDateNow";

interface Request {
  id_user: string;
  telegram: string;
  facebook: string;
  twitter: string;
  twitch: string;
}

class UpdateUserSocialService {
  public async execute({ id_user, telegram, facebook, twitter, twitch }: Request): Promise<Social> {
    const usersRepository = getRepository(User);
    const socialRepository = getRepository(Social);

    const user = await usersRepository.findOne({
      where: { id_user: id_user }
    });

    if (!user) {
      throw new AppError('User does not exist.');
    };

    const social = await socialRepository.findOne({
      where: { user: user },
    });

    if (!social) throw new AppError("User does not exist.");

    const getDateNow = new GetDateNow();

    social.telegram = telegram;
    social.facebook = facebook;
    social.twitter = twitter;
    social.twitch = twitch;
    social.updated_at = getDateNow.execute();

    await socialRepository.save(social);

    return social;
  }
}

export default UpdateUserSocialService;
