import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true},
  first_name: { type: String, required: true},
  last_name: { type: String, required: true},
  gender: { type: String, required: true },
  birthday: { type: String, required: true },
  phone: { type: String, default: '' },
  profile_pic: { type: String, default: ''},
  public: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  status: { type: String, default: 'user' },
  last_seen: { type: Number, default:Date.now() },
  slogan: { type: String, default: 'Hallo, ich benutze Chatverse!' },
  friends: [{ type: String }],
  friend_requests: [{ type: String }],
  blacklist: [{ type: String }],
  groups: [{ type: String }],
  chats: [{ type: String }],
  preferences: [{ type: String }],

});

export default model("User", userSchema);
