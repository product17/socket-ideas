import express from 'express';
import { json } from 'body-parser';
import {
  getCard,
  patchCard,
} from './card-builder.controller';

const cardBuilderRouter = express.Router();

cardBuilderRouter.get('/:id', json(), async (req, res) => {
  try {
    res.json(await getCard(req.params.id));
  } catch (err) {
    res.status(404).json(err);
  }
});

cardBuilderRouter.post('/:id?', json(), async (req, res) => {
  try {
    res.json(await patchCard(req.params.id, req.body));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json(err);
    }

    res.status(500).json(err);
  }
});

export {
  cardBuilderRouter,
};
