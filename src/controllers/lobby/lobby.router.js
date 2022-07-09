import express from 'express';
import { json } from 'body-parser';
import { createLobby, getLobby } from './lobby.controller';

const lobbyRouter = express.Router();

lobbyRouter.get('/:id', json(), (req, res) => {
  getLobby(req.params.id)
    .then(res.json)
    .catch((err) => {
      res.status(404).json(err);
    });
});

lobbyRouter.post('/', json(), (req, res) => {
  console.log(req.body);
  createLobby(req.body)
    .then((lobby) => {
      res.json(lobby);
    }).catch((err) => {
      res.status(404).json(err);
    });
});

export {
  lobbyRouter,
};
