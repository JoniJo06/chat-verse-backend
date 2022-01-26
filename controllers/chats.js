import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createChat = async (req, res) => {
  try {
    const { member_one, member_two } = req.body;
    const newChat = await Chat.create({ member_one, member_two });
    const userone = await User.findById(member_one);
    userone.chats = [...userone.chats, newChat._id];
    userone.save();
    const usertwo = await User.findById(member_two);
    usertwo.chats = [...usertwo.chats, newChat._id];
    usertwo.save();
    res.status(201).send("hi");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



  export const getChatById = async (req, res) => {
    try {
      const { _id } = req.params;
      const chat = await Chat.findById(_id)
      console.log(req.params)
      res.status(200).json({chat});
    } catch (error){
      res.status(500).json({error: error.message})
    }
  }

