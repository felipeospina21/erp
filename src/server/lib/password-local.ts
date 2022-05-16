import Local from 'passport-local';
import { findUser, validatePassword } from './userUtils';

export const localStrategy = new Local.Strategy(function (email, password, done) {
  findUser({ email })
    .then(async (user) => {
      if (user && (await validatePassword(user, password))) {
        done(null, user);
      } else {
        done(new Error('Invalid username and password combination'));
      }
    })
    .catch((error) => {
      done(error);
    });
});
