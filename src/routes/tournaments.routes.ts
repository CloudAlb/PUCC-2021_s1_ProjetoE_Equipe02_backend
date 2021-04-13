// TODO: Arrumar a rota
import { Router } from 'express';

import { v4 } from 'uuid';

const pubsRouter = Router();

interface Pub {
    // info
    id_pub: string;
    id_user: string;
    publicacao?: string;

    // bd
    created_at: string;
    updated_at: string;

    campeonato?: {
        id: string;
        nome: string;
        jogo: string;
    }
};

let pubs: Pub[] = [];

pubs.push({
    id_pub: "555",
    id_user: "1",
    publicacao: "Olá pessoal sou um novo usuário !!!",

    created_at: "2021-04-06-21-00-00",
    updated_at: "2021-04-06-21-00-00",

    campeonato: {
            id: "",
            nome: "",
            jogo: ""
    }
},{
  id_pub: "1518",
  id_user: "5",
  publicacao: "",

  created_at: "2021-04-06-21-00-00",
  updated_at: "2021-04-06-21-00-00",

  campeonato: {
          id: "118",
          nome: "WOGL",
          jogo: "Crossfire"
  }
})

pubsRouter.get('/', async (request, response) => {
    return response.json({ data: pubs })
});

pubsRouter.get('/:id', async (request, response) => {
    let { id } = request.params;

    let findPubs = pubs.find((pub) => {
        return pub.id_pub == id;
    });

    if (!findPubs) {
        return response.json({ message: "Publicação não encontrada !!!" });
    }

    return response.json({ data: findPubs })
});

pubsRouter.post('/', async (request, response) => {
    const { publicacao, campeonato } = request.body;

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const todayFormattedDate = dd + '/' + mm + '/' + yyyy;

    const pub = { id_pub: v4(),
                  id_user: v4(),
                  publicacao,
                  created_at: todayFormattedDate,
                  updated_at: todayFormattedDate,
                  campeonato };

    pubs.push(pub);

    return response.json({ message: "Publicação criada com sucesso !!!" })
});

pubsRouter.patch('/edit/:id', async (request, response) => {
    const { id } = request.params;
    const { publicacao } = request.body;

    const findPubIndex = pubs.findIndex((pub) => {
        if (pub.id_pub == id) return true;
    });

    if (findPubIndex == -1) {
        return response.json({ message: "Publicação não encontrada !!!" });
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayFormattedDate = dd + '/' + mm + '/' + yyyy;

    pubs[findPubIndex].publicacao = publicacao;
    pubs[findPubIndex].updated_at = todayFormattedDate;

    return response.json({ message: "Publicação atualizada com sucesso !!!" })
});

pubsRouter.patch('/edit/campeonato/:id', async (request, response) => {
  const { id } = request.params;
  const { campeonato } = request.body;

  const findPubIndex = pubs.findIndex((pub) => {
      if (pub.id_pub == id) return true;
  });

  if (findPubIndex == -1) {
      return response.json({ message: "Publicação não encontrada !!!" });
  }

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const todayFormattedDate = dd + '/' + mm + '/' + yyyy;

  pubs[findPubIndex].campeonato = campeonato;
  pubs[findPubIndex].updated_at = todayFormattedDate;

  return response.json({ message: "Publicação atualizada com sucesso !!!" })
});

export default pubsRouter;
