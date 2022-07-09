import mongoose from 'mongoose';
const { Schema } = mongoose;
const cardSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  affects: [{
    affect: String,
    amount: Number,
  }],
  requirements: [{
    affect: String,
    amount: Number,
  }],
  cardSet: {
    type: String,
  },
  type: {
    type: String,
  },
});

export default mongoose.model("card", cardSchema);