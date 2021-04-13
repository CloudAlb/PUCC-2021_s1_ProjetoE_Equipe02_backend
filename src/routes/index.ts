import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import pubsRouter from './publications.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pubs', pubsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
