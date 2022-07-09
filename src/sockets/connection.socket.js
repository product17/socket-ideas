import {
  createLobbySocket,
  getLobby,
} from '../controllers/lobby/lobby.socket';

export default (socket) => {
  socket.on("lobby:create", createLobbySocket.bind(socket));
  // socket.on('lobby:get', getLobby.bind(socket));
  // socket.on('lobby:active', getLobby.bind(socket));
  // socket.on('lobby:join', joinLobbyAsync.bind(socket));
}
