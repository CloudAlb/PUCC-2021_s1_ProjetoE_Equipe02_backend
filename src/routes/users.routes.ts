import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import FindUserService from '../services/FindUserService';
import FindUserSocialService from '../services/FindUserSocialService';
import UpdateUserSocialService from '../services/UpdateUserSocialService';
import UpdateUserService from '../services/UpdateUserService';
import UpdateUserPasswordService from '../services/UpdateUserPasswordService';


const usersRouter = Router();

// não deve ser lançado
usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json({ data: users })
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const findUser = new FindUserService();

  const user = await findUser.execute(id);

  return response.json({ data: user });
});

usersRouter.post('/', async (request, response) => {
  const { name, username, email, birth_date, password, avatar_image, background_image } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, username, email, birth_date, password, avatar_image, background_image });

  return response.json({ message: "User successfully created." })

});

usersRouter.patch('/edit/:id', async (request, response) => {
  const { id } = request.params;
  const { name, username, bio, email, birth_date } = request.body;

  const updateUserService = new UpdateUserService();

  await updateUserService.execute({ id_user: id, name, username, bio, email, birth_date });

  return response.json({ message: "User info sucessfully updated." })
});

usersRouter.get('/social/:id', async (request, response) => {
  const { id } = request.params;

  const findUserSocial = new FindUserSocialService();

  const social = await findUserSocial.execute(id);

  return response.json({ data: social });
});

usersRouter.patch('/edit/social/:id', async (request, response) => {
  const { id } = request.params;
  const { telegram, facebook, twitter, twitch } = request.body;

  const updateUserSocialService = new UpdateUserSocialService();

  await updateUserSocialService.execute({ id_user: id, telegram, facebook, twitter, twitch });

  return response.json({ message: "Social info sucessfully updated." });
});


usersRouter.patch('/edit/password/:id', async (request, response) => {
  const { id } = request.params;
  const { password_old, password_new } = request.body;

  const updateUserPasswordService = new UpdateUserPasswordService();

  await updateUserPasswordService.execute({ id_user: id, password_old: password_old, password_new: password_new });

  return response.json({ message: "Password sucessfully updated." })

});

export default usersRouter;
