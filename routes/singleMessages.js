import express from "express";
import { createSingleMessage, getMessagesByChatId, setMessagesByChatIdRead } from '../controllers/singleMessages.js'

const singleMessages = express.Router();

singleMessages.route('/chat/:_id').get(getMessagesByChatId).put(setMessagesByChatIdRead)
singleMessages.post('/', createSingleMessage)

export default singleMessages;