import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import FindUserService from '../services/FindUserService';
import FindUserSocialService from '../services/FindUserSocialService';
import UpdateUserSocialService from '../services/UpdateUserSocialService';
import UpdateUserService from '../services/UpdateUserService';
import UpdateUserPasswordService from '../services/UpdateUserPasswordService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';


const usersRouter = Router();

// não deve ser lançado
usersRouter.get('/list', async (request, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  return response.json({ data: users })
});


// TODO, criar middleware ensureIsOwnUser é necessário?
// usar browserAgent, Encrypted Local Storage ou algo do tipo
usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const findUser = new FindUserService();

  const user = await findUser.execute(request.user.id_user);

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
    friends: user.friends,
    created_at: user.created_at,
    updated_at: user.updated_at,
  }

  return response.json({ data: userWithoutPassword });
});

usersRouter.post('/', async (request, response) => {
  const { name, username, email, birth_date, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ name, username, email, birth_date, password });

  return response.json({ message: "User successfully created." })

});

usersRouter.patch('/edit', ensureAuthenticated, async (request, response) => {
  const { name, username, bio, email, birth_date } = request.body;

  const updateUserService = new UpdateUserService();

  await updateUserService.execute({ id_user: request.user.id_user, name, username, bio, email, birth_date });

  return response.json({ message: "User info sucessfully updated." })
});

usersRouter.get('/social', ensureAuthenticated, async (request, response) => {
  const findUserSocial = new FindUserSocialService();

  const social = await findUserSocial.execute(request.user.id_user);

  return response.json({ data: social });
});

usersRouter.patch('/edit/social', ensureAuthenticated, async (request, response) => {
  const { social_network, username } = request.body;

  const updateUserSocialService = new UpdateUserSocialService();

  await updateUserSocialService.execute({ id_user: request.user.id_user, social_network, username });

  return response.json({ message: "Social info sucessfully updated." });
});


usersRouter.patch('/edit/password', ensureAuthenticated, async (request, response) => {
  const { password_old, password_new } = request.body;

  const updateUserPasswordService = new UpdateUserPasswordService();

  await updateUserPasswordService.execute({ id_user: request.user.id_user, password_old: password_old, password_new: password_new });

  return response.json({ message: "Password sucessfully updated." })

});

export default usersRouter;
