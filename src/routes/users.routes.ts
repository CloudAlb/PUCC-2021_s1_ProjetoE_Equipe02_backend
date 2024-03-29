import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import FindUserService from '../services/FindUserService';
import FindUserSocialService from '../services/FindUserSocialService';
import UpdateUserSocialService from '../services/UpdateUserSocialService';
import UpdateUserService from '../services/UpdateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UpdateUserBackgroundService from '../services/UpdateUserBackgroundService';
import UpdateUserPasswordService from '../services/UpdateUserPasswordService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';
import AuthenticateUserService from '../services/AuthenticateUserService';
import UpdateUserCoinsService from '../services/UpdateUserCoinsService';
import FindUserColocationsService from '../services/FindUserColocationsService';

const usersRouter = Router();

interface userWithoutSensitiveInfo {
  id_user: string;
  name: string;
  username: string;
  avatar_image: string;
}

usersRouter.get('/list', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  let usersWithoutSensitiveInfo: userWithoutSensitiveInfo[] = [];

  users.map(user => {
    usersWithoutSensitiveInfo.push({
      id_user: user.id_user,
      name: user.name,
      username: user.username,
      avatar_image: user.avatar_image,
    });
  });

  return response.json({ data: usersWithoutSensitiveInfo });
});

// TODO, criar middleware ensureIsOwnUser é necessário?
// usar browserAgent, Encrypted Local Storage ou algo do tipo
usersRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const findUser = new FindUserService();

  const user = await findUser.execute(id);

  const userWithoutPassword = {
    id_user: user.id_user,
    name: user.name,
    username: user.username,
    email: user.email,
    birth_date: user.birth_date,
    avatar_image: user.avatar_image,
    background_image: user.background_image,
    bio: user.bio,
    level: user.level,
    coins: user.coins,
    followers: user.followers,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ data: userWithoutPassword });
});

usersRouter.post('/', async (request, response) => {
  const { name, username, email, birth_date, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    username,
    email,
    birth_date,
    password,
  });

  const authenticateUser = new AuthenticateUserService();

  const token = await authenticateUser.execute({
    login: user.username,
    password: password,
  });

  return response.json({ message: 'User successfully created.', token: token });
});

usersRouter.patch('/edit', ensureAuthenticated, async (request, response) => {
  const { name, username, bio, email, birth_date } = request.body;

  const updateUserService = new UpdateUserService();

  await updateUserService.execute({
    id_user: request.user.id_user,
    name,
    username,
    bio,
    email,
    birth_date,
  });

  return response.json({ message: 'User info sucessfully updated.' });
});

usersRouter.patch('/edit/avatar', ensureAuthenticated, async (request, response) => {
  const { avatar_image } = request.body;

  const updateUserAvatarService = new UpdateUserAvatarService();

  await updateUserAvatarService.execute({
    id_user: request.user.id_user,
    avatar_image,
  });

  return response.json({ message: 'Avatar atualizado com sucesso !' });
});

usersRouter.patch('/edit/background', ensureAuthenticated, async (request, response) => {
  const { background_image } = request.body;

  const updateUserBackgroundService = new UpdateUserBackgroundService();

  await updateUserBackgroundService.execute({
    id_user: request.user.id_user,
    background_image,
  });

  return response.json({ message: 'Background atualizado com sucesso !' });
});

usersRouter.get(
  '/social/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    const findUserSocial = new FindUserSocialService();

    const social = await findUserSocial.execute(id);

    return response.json({ data: social });
  },
);

usersRouter.patch(
  '/edit/social',
  ensureAuthenticated,
  async (request, response) => {
    const { social_network, username } = request.body;

    const updateUserSocialService = new UpdateUserSocialService();

    await updateUserSocialService.execute({
      id_user: request.user.id_user,
      social_network,
      username,
    });

    return response.json({ message: 'Social info sucessfully updated.' });
  },
);

usersRouter.patch(
  '/edit/password',
  ensureAuthenticated,
  async (request, response) => {
    const { password_old, password_new } = request.body;

    const updateUserPasswordService = new UpdateUserPasswordService();

    await updateUserPasswordService.execute({
      id_user: request.user.id_user,
      password_old: password_old,
      password_new: password_new,
    });

    return response.json({ message: 'Password sucessfully updated.' });
  },
);

usersRouter.patch(
  '/coins/add',
  ensureAuthenticated,
  async (request, response) => {
    const { id_user, quantity } = request.body;

    const updateUserCoins = new UpdateUserCoinsService();

    await updateUserCoins.execute({
      id_user,
      quantity,
      operation: 'add',
    });

    return response.json({ message: quantity + ' coins were given.' });
  },
);

usersRouter.patch(
  '/coins/remove',
  ensureAuthenticated,
  async (request, response) => {
    const { id_user, quantity } = request.body;

    const updateUserCoins = new UpdateUserCoinsService();

    await updateUserCoins.execute({
      id_user,
      quantity,
      operation: 'remove',
    });

    return response.json({ message: quantity + ' coins were taken.' });
  },
);

// vai retornar as colocações de um usuário
usersRouter.get(
  '/colocations/:id',
  // TODO, voltar
  // ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    const findUserColocationsService = new FindUserColocationsService();

    const userColocations = await findUserColocationsService.execute(id);

    return response.json({ data: userColocations });
  },
);

export default usersRouter;
