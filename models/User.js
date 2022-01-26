import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true},
  first_name: { type: String, required: true},
  last_name: { type: String, required: true},
  gender: { type: String },
  birthday: { type: String }
});

export default model("User", userSchema);
