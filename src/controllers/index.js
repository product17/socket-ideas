// module.exports.auth = require('./auth').controller;
// module.exports.games = require('./games').controller;
// module.exports.lobbies = require('./lobbies').controller;
// module.exports.users = require('./users').controller;
import { auth } from './auth';
import games from './games';
import lobbies from './lobby';
import users from './lobby';

export {
  auth,
  games,
  lobbies,
  users,
};