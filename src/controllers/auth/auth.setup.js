import LocalStrategy from 'passport-local/lib/strategy';
import { getUserByUsername } from '../users/user.controller';
import {
  IncorrectUserNameOrPassword,
} from './auth.errors';

export function authSetup(passport) {
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
      usernameField: 'userName',
      passwordField: 'password'
    },
    async function(username, password, done) {
      try {
        const user = await getUserByUsername(username);
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