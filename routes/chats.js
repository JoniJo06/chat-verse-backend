import express from "express";
import { createChat, getChatById, getChatInfoById } from "../controllers/chats.js"
import { verifyToken } from "../middlewares/verifyToken.js";

const chats = express.Router();

chats.get('/:user_id/create', verifyToken, createChat)
chats.get('/:chat_id', verifyToken, getChatById)
chats.get('/:chat_id/info', verifyToken, getChatInfoById)


export default chats;