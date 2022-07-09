import express from 'express';

const games = express.Router();

games.get('/:id', (req, res) => {
  res.json({
    game: req.params.id,
  });
});

games.post('/', (req, res) => {
  res.json({
    game: req.body
  });
});

export {
  games,
};
