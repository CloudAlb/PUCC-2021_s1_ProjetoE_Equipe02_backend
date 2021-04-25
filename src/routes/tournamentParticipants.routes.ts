import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import TournamentParticipants from '../models/TournamentParticipant';
import CreateTournamentParticipantService from '../services/CreateTournamentParticipantService';
import FindAcceptedTournamentParticipantsService from '../services/FindAcceptedTournamentParticipantsService';
import FindPendingTournamentInvitesService from '../services/FindPendingTournamentInvitesService';
import FindTournamentsUserIsParticipatingService from '../services/FindTournamentsUserIsParticipatingService';

const tournamentParticipantsRouter = Router();

// observação:
// essa rota trata da tabela tournamentParticipants
// que vai cuidar da parte tanto do convite da pessoa tanto de sua participação
// pela coluna user_accepted_invite

// não deve ser lançado
tournamentParticipantsRouter.get('/list', async (request, response) => {
  const tournamentsParticipantsRepository = getRepository(
    TournamentParticipants,
  );

  const tournamentsParticipants = await tournamentsParticipantsRepository.find();

  return response.json({ data: tournamentsParticipants });
});

// rota que vai retornar os tournamentInvites de outra pessoa
// interessante para mostrar os torneios públicos em que a pessoa está participando, isso do perfil dela
// mas não é o foco da sprint atual (2)
/*
tournamentParticipantsRouter.get('/user/:id', ensureAuthenticated, async (request, response) => {
  let { id } = request.params;

  const findTournamentService = new FindTournamentService();
  const tournament = await findTournamentService.execute(id);

  return response.json({ data: tournament });
});
*/

// rota que vai retornar os tournamentInvites (com os torneios que o usuário logado está participando)
tournamentParticipantsRouter.get(
  '/user',
  ensureAuthenticated,
  async (request, response) => {
    const findTournamentsUserIsParticipatingService = new FindTournamentsUserIsParticipatingService();

    const tournamentsUserIsParticipating = await findTournamentsUserIsParticipatingService.execute(
      request.user.id_user,
    );

    return response.json({ data: tournamentsUserIsParticipating });
  },
);

// pega os participantes (Users) de um torneio e retorna apenas aqueles que aceitaram (user_accepted_invite -> true)
tournamentParticipantsRouter.get(
  '/users/accepted/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;

    const findAcceptedTournamentParticipantsService = new FindAcceptedTournamentParticipantsService();

    const tournamentAcceptedParticipantsAsUsers = await findAcceptedTournamentParticipantsService.execute(
      id,
    );

    return response.json({ data: tournamentAcceptedParticipantsAsUsers });
  },
);

// pega os invites pendentes de um usuário
tournamentParticipantsRouter.get(
  '/user/pending/',
  ensureAuthenticated,
  async (request, response) => {
    const findPendingTournamentInvitesService = new FindPendingTournamentInvitesService();

    const pendingInvites = await findPendingTournamentInvitesService.execute(
      request.user.id_user,
    );

    return response.json({ data: pendingInvites });
  },
);

// cria um convite
tournamentParticipantsRouter.post(
  '/invite/:id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;
    const { id_tournament } = request.body;

    const createTournamentParticipantService = new CreateTournamentParticipantService();

    createTournamentParticipantService.execute({
      id_user: id,
      id_tournament,
      creator_id_user: request.user.id_user,
    });

    return response.json({ message: 'Invitation created sucessfully.' });
  },
);

export default tournamentParticipantsRouter;
