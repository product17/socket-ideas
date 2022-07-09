import mongoose from 'mongoose';
const { Schema } = mongoose;

function makeId(length) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return result.join('');
}

const lobbySchema = new Schema({
  lobbyCode: { type: String, default: () => makeId(5) },
  lobbyCreator: String,
  map: String,
  players: [String],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('lobby', lobbySchema);
