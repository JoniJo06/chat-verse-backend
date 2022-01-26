import mongoose from "mongoose";
const { Schema, model } = mongoose;

const singleMessageSchema = new Schema({
  message: { type: String, required: true },
  chat_id: { type: String, required: true },
  creator: { type: String, required: true},
  timestamp: {type: Number, default: Date.now() },
  read_status: { type: Boolean, default: false }
});

export default model("SingleMessage", singleMessageSchema);