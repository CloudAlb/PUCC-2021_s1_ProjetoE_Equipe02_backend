import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';
import Pub from '../models/Publication';

interface Request {
  id_user: string;
  publicacao?: string;
  id_camp?: string;
}

class CreatePubService {
  public async execute({ id_user, publicacao, id_camp }: Request): Promise<Pub> {
    const pubsRepository = getRepository(Pub);
    const usersRepository = getRepository(User);

    const pub = pubsRepository.create({
      id_pub: v4(), publicacao, id_camp: ' '
    });
    await pubsRepository.save(pub);

    return pub;
  }
}

export default CreatePubService;
