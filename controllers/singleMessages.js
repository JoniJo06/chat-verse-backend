import SingleMessage from '../models/SingleMessage.js';


export const createSingleMessage = async (req, res) => {
    try {
        const { message, chat_id, creator, timestamp,read_status } = req.body.message;
        const newMessage = await SingleMessage.create({message, chat_id, creator, timestamp, read_status})
        res.status(201).json(newMessage)
    } catch (error){
        // console.log(error)
        res.status(500).json({error: error.message})
      }
}



export const getMessagesByChatId = async (req, res) => {
    try {
        const { _id } = req.params;
        const messages = await SingleMessage.find({chat_id: _id})
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