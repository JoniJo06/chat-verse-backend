import mongoose from "mongoose";
const { Schema, model } = mongoose;

const singleMessageSchema = new Schema({
  message: { type: String, required: true },
  chat_id: { type: String, required: true },
  creator: { type: String, required: true},
  timestamp: {type: Number, required:true },
  read_status: { type: Boolean, required:true }
});

export default model("SingleMessage", singleMessageSchema);