import express from "express";
import {
  logIn,
  signUp,
  getAllUsers,
  getUserChatDataById,
  getAllActiveChats,
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getAllFriendRequests
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const users = express.Router();

users.post("/signup", signUp);
users.post("/login", logIn);
users.route('/').get(getAllUsers)
users.get('/chat-data-by-id', verifyToken, getUserChatDataById)
users.get('/all-active-chats', verifyToken, getAllActiveChats)
users.get('/friends', verifyToken, getAllFriends)
users.get('/friends/requests/:user_id', verifyToken, sendFriendRequest)
users.get('/friends/requests/accept/:user_id', verifyToken, acceptFriendRequest)
users.get('/friends/requests', verifyToken, getAllFriendRequests)

export default users;


