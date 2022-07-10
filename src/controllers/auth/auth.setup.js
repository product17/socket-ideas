import LocalStrategy from 'passport-local/lib/strategy';
import { getUserByEmail, getUserByUsername } from '../users/user.controller';
import {
  IncorrectUserNameOrPassword,
} from './auth.errors';

export const emailRegEx = new RegExp('^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');

export function authSetup(passport) {
  console.log('test')
  passport.serializeUser(function(user, done) {
    console.log('serializer');
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    console.log('deserializer');
    getUserByUsername(username).then(user => {
      done(null, user);
    }).catch(err => {
      done(err);
    })
  });
  
  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async function(username, password, done) {
      try {
        let user = null;
        if (emailRegEx.test(username)) {
          user = await getUserByEmail(username);
        } else {
          user = await getUserByUsername(username);
        }

        console.log(user);
        if (!user) {
          return done(null, false, IncorrectUserNameOrPassword);
        }

        user.validatePassword(password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            done(null, user);
          } else {
            done(null, false, IncorrectUserNameOrPassword);
          }
        });
      } catch (err) {
        done(err);
      }
      getUserByUsername(username).then((user) => {

        
      }).catch(err => {
        return done(err);
      });
    }
  ));
}