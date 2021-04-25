import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import tournamentsRouter from './tournaments.routes';
import pubsRouter from './publications.routes';
import tournamentParticipantsRouter from './tournamentParticipants.routes';
import tournamentColumnsRouter from './tournamentColumns.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/tournaments', tournamentsRouter);
routes.use('/tournaments/manage', tournamentParticipantsRouter);
routes.use('/tournaments/columns', tournamentColumnsRouter);
routes.use('/pubs', pubsRouter);

export default routes;
