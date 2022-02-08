import express from "express";
import { createSingleMessage, getMessagesByChatId, setMessagesByChatIdRead } from '../controllers/singleMessages.js'
import {verifyToken} from "../middlewares/verifyToken.js";

const singleMessages = express.Router();

singleMessages.route('/chat/:_id').get(verifyToken,getMessagesByChatId).put(setMessagesByChatIdRead)
singleMessages.post('/',  createSingleMessage)

export default singleMessages;