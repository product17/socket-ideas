import mongoose from 'mongoose';
const { Schema } = mongoose;
const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200,// 10 min expiration
  },
});

export default mongoose.model("token", tokenSchema);