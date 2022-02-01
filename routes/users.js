import express from "express";
import { logIn, signUp, getAllUsers, getUserChatDataById, getAllActiveChats } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const users = express.Router();

users.post("/signup", signUp);
users.post("/login", logIn);
users.route('/').get(getAllUsers)
users.get('/chat-data-by-id', verifyToken, getUserChatDataById)
users.get('/all-active-chats', verifyToken, getAllActiveChats)

export default users;


