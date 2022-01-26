import express from "express";
import { createChat, getChatById } from "../controllers/chats.js"

const chats = express.Router();

chats.post('/', createChat)
chats.get('/:_id', getChatById)


export default chats;