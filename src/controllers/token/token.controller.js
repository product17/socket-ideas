import Token from './token.model';
import Users from '../users';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
const BCRYPT_SALT = 10;

export async function createToken(userId) {
  // Delete existing token for this user
  const existingToken = await Token.findOne({ userId });
  if (existingToken) {
    await existingToken.deleteOne();
  }

  const resetToken = await bcrypt.hash(
    crypto.randomBytes(32).toString('hex'),
    Number(BCRYPT_SALT)
  );

  await new Token({
    userId,
    token: resetToken,
    createdAt: Date.now(),
  }).save();

  const link = `localhost:3001/user/password-reset?token=${resetToken}`;
  // send and email???
  return resetToken;
}

export async function deleteToken(token) {
  return await Token.deleteOne({ _id: token._id });
}

export async function getToken(token) {
  return await Token.findOne({ token });
}
