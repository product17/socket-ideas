// import passport from 'passport';
import Users from './user.model';

export function createUser(newUser) {
  return new Promise((resolve, reject) => {
    Users.create(newUser, (err, user) => {
      if (err) {
        return reject(err);
      }

      resolve(user);
    });
  });
}

export async function getUserByEmail(email) {
  return await Users.findOne({ email });
}

export async function getUserById(userId) {
  return await Users.findOne({ _id: userId });
}

export async function getUserByUsername(username) {
  return await Users.findOne({ username });
}

export async function updateUser(user, update) {
  return await Users.updateOne({ _id: user._id }, update);
}
