import { Router } from 'express';

import usersRouter from './users.routes';
import pubsRouter from './pubs.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pubs', pubsRouter);

export default routes;
