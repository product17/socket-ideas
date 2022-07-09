import {
  createLobbySocket,
} from '../controllers/lobby/lobby.socket';

export default (socket) => {
  socket.on("lobby:create", createLobbySocket.bind(socket));
  socket.on('lobby:get', getLobbyAsync.bind(socket));
  socket.on('lobby:active', getLobbyAsync.bind(socket));
  // socket.on('lobby:join', joinLobbyAsync.bind(socket));
}
