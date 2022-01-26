import singleMessage from '../models/singleMessage.js';


export const createSingleMessage = async (req, res) => {
    try {
        const { message, chat_id, creator} = req.body;
        const newMessage = await singleMessage.create({message, chat_id, creator})
        res.status(201).json(newMessage)
    } catch (error){
        res.status(500).json({error: error.message})
      }
}



export const getMessagesByChatId = async (req, res) => {
    try {
        const { _id } = req.params;
        const messages = await singleMessage.find({chat_id: _id})
        res.status(200).json(messages)
    } catch (error){
        res.status(500).json({error: error.message})
      }
}


//TODO
export const setMessagesByChatIdRead = async (req, res) => {
    try {
    } catch (error){
        res.status(500).json({error: error.message})
      }
}