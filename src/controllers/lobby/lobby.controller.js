import Lobbies from './lobby.model';

export function addUserToLobby(lobbyCode, user) {
  return new Promise((resolve, reject) => {
    Lobbies.updateOne({ lobbyCode }, { $addToSet: { players: user }}, (err, lobby) => {
      if (err) {
        return reject(err);
      }

      resolve(lobby);
    });
  });
}

export function getLobby(lobbyCode) {
  return new Promise((resolve, reject) => {
    Lobbies.findOne({ lobbyCode }, (err, lobby) => {
      if (err) {
        return reject(err);
      }

      resolve(lobby);
    });
  });
}

export function createLobby() {
  return new Promise((resolve, reject) => {
    Lobbies.create({}, (err, lobby) => {
      if (err) {
        return reject(err);
      }

      resolve(lobby);
    });
  });
}

export function queryLobbies() {
  return new Promise((resolve, reject) => {
    Lobbies.find({ players: { $gt: 0 }}, (err, lobbies) => {
      if (err) {
        return reject(err);
      }

      resolve(lobbies);
    });
  });
}
