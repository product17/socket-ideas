import {
  addUserToLobby,
  createLobby,
  getLobby,
} from './lobby.controller';

export function createLobbySocket(data) {
  createLobby(data).then((lobby) => {
    console.log(lobby)
    this.emit(lobby);
  }).catch((err) => {
    this.emit(err);
  });
}

export function getActiveLobbies(data) {
  
}

export function getLobbySocket(data) {
  getLobby(data).then((lobby) => {
    console.log(lobby);
    this.emit(lobby);
  }).catch((err) => {
    this.emit(err);
  });
}

export function joinLobbySocket(data) {
  addUserToLobby()
}
