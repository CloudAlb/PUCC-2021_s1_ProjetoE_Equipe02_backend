import { Router } from 'express';
import { getRepository } from 'typeorm';

import Inventario from '../models/Inventario';

import AddItemService from '../services/AddItemService';
import FindInventarioUser from '../services/FindInventarioUserService';
import FindItensAtivosService from '../services/FindItensAtivosService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateInventarioService from '../services/UpdateInventarioService';

const inventarioRouter = Router();

inventarioRouter.get('/', ensureAuthenticated, async (request, response) => {
  const inventarioRepository = getRepository(Inventario);

  const inventario = await inventarioRepository.find();

  return response.json({ data: inventario });
});

inventarioRouter.get('/find', ensureAuthenticated, async (request, response) => {
  const findInventarioUser = new FindInventarioUser;

  const inventario = await findInventarioUser.execute( request.user.id_user );

  return response.json({ data: inventario });
});

inventarioRouter.get('/findativos', ensureAuthenticated, async (request, response) => {
  const findItensAtivosService = new FindItensAtivosService;

  const inventario = await findItensAtivosService.execute( request.user.id_user );

  return response.json({ data: inventario });
});

inventarioRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { id_item } = request.body;

  const addItem = new AddItemService();

  await addItem.execute({ id_item, id_user: request.user.id_user});

  return response.json({ message: 'Item adicionado com sucesso !' });
});

inventarioRouter.patch('/edit/', ensureAuthenticated, async (request, response) => {
  const { id_item, ativo } = request.body;

  const updateInventarioService = new UpdateInventarioService();

  await updateInventarioService.execute({
    id_user: request.user.id_user,
    id_item,
    ativo
  });

  return response.json({ message: 'Inventario atualizado com sucesso !' });
});

export default inventarioRouter;
