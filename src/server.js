// const express = require('express');
// const express = require('express');
import express from 'express';
import http from 'http';
// const http = require('http');
import { Server } from 'socket.io';
// const { Server } = require('socket.io');
// import { localStrategy } from './controllers/auth/auth.controller';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { json } from 'body-parser';

import { authSetup } from './controllers/auth/auth.setup';
import { cardBuilderRouter } from './controllers/card-builder/card-builder.router';
import { games } from './controllers/games/game.controller';
import { lobbyRouter } from './controllers/lobby/lobby.router';
import { userRouter } from './controllers/users/user.router';
import socketConnection from './sockets/connection.socket';
// import { json } from 'body-parser';

import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!');
});

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
io.use((socket, next) => {
  console.log('hit the socket middleware');
  next();
})
io.on('connection', socketConnection);

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(session({
  cookie: {
    // httpOnly: true,
    // maxAge: 20 * 60 * 1000, // 20 minutes
    secure: true,
  },
  name: 'rollinstones',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: "endless sea",
}));

authSetup(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/lobby', lobbyRouter);

app.use('/user', userRouter);

app.use('/games', games);

app.use('/card-builder', cardBuilderRouter);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})