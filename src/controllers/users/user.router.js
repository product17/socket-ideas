import express from 'express';
import { json } from 'body-parser';
import passport from 'passport';
import {
  createToken,
  deleteToken,
  getToken,
} from '../token';
import { emailRegEx } from '../auth/auth.setup';
import {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updateUser,
} from './user.controller';

const userRouter = express.Router();

userRouter.get(
  '/:username',
  json(),
  passport.authenticate('local'),
  (req, res) => {
    getUser(req.params.username).then((user) => {
      if (!user) {
        res.status(404).json({
          errorCode: 404,
          message: `Could not find user by id: ${req.params.username}`
        });
      } else {
        res.json(user);
      }
    }).catch((err) => {
      res.status(500).json({
        message: 'something went wrong...'
      });
    });
  }
);

// Authentication Route
userRouter.post(
  '/auth',
  json(),
  passport.authenticate('local'),
  (req, res) => {
    res.json({
      success: 'Welcome!',
      user: req.user.getClientUser(),
    });
  }
);

userRouter.post('/', json(), async (req, res) => {
  if (!req.body?.username || !req.body?.email) {
    return res.status(400).json({
      message: 'Email and Username are required',
    });
  }

  try {
    if (await getUserByUsername(req.body?.username)) {
      return res.status(400).json({
        message: 'Username is already being used.',
      });
    }

    if (await getUserByEmail(req.body?.email)) {
      return res.status(400).json({
        message: 'Email is already registered.',
      });
    }

    const user = await createUser(req.body);
    if (user) {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: 'something went wrong...',
      error: err,
    });
  }
});

// Should take email or username in the body
userRouter.post('/password-reset-token', json(), async (req, res) => {
  if (!req.body?.email && !req.body?.username) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Either Username or Email is required to reset your password',
    });
  }

  
  try {
    let user;
    const keyName = req.body?.email || req.body?.username;

    if (emailRegEx.test(keyName)) {
      // is email
      user = await getUserByEmail(keyName);
    } else {
      console.log(keyName);
      // is username
      user = await getUserByUsername(keyName);
    }

    if (!user) {
      return res.json({
        status: 'Failed',
        message: 'username or email does not exist',
      });
    }

    const token = await createToken(user._id);
    console.log(token);
    res.json({
      status: 'Success',
      message: 'check the console (eventually your email)',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'Failed',
      message: 'The server is having an issue...',
    });
  }
});

userRouter.post('/reset-password', json(), async (req, res) => {
  console.log(req.body?.token);
  if (!req.body?.token) {
    return res.status(400).json({
      message: 'missing token',
      status: 'Failed',
    });
  }

  try {
    const token = await getToken(req.body.token);
    if (token) {
      const user = await getUserById(token.userId);

      if (user) {
        await updateUser(user, {
          password: req.body.password,
        });

        deleteToken(token); // no need to await

        return res.json({
          message: 'password reset',
          status: 'Success'
        });
      }

      return res.status(404).json({
        message: 'user does not exist',
        status: 'Failed',
      });
    }

    return res.status(403).json({
      message: 'invalid token',
      status: 'Failed',  
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Server error',
      status: 'Failed',  
    });
  }
});

export {
  userRouter,
};