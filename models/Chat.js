import mongoose from "mongoose";
const { Schema, model } = mongoose;

const chatSchema = new Schema({
  active: { type: Boolean, default: true },
  member_one: { type: String, required: true },
  member_two: { type: String, required: true}
});

export default model("Chat", chatSchema);
