import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const createChat = async (req, res) => {
  try {
    const { _id } = req.body;
    const { user_id } = req.params;
    const newChat = await Chat.create({ _id, user_id });
    const userone = await User.findById(_id);
    userone.chats = [...userone.chats, newChat._id];
    userone.save();
    const usertwo = await User.findById(user_id);
    usertwo.chats = [...usertwo.chats, newChat._id];
    usertwo.save();
    res.status(201).send("hi");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { _id } = req.body;
    const { chat_id } = req.params;
    const chat = await Chat.findById({ _id: chat_id });
    if (_id === chat.member_one || _id === chat.member_two)
      res.status(200).json({ chat });
    else res.status(401).json("unauthorized");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChatInfoById = async (req, res) => {
  try {
    const { _id } = req.body;
    const { chat_id } = req.params;
    const chat = await Chat.findById({ _id: chat_id });
    if (_id === chat.member_one || _id === chat.member_two) {
      try {
        const user2_id = chat.member_one === _id ? chat.member_two : chat.member_one
        const user2 =  await User.findById({ _id: user2_id })
        res.status(200).json({chat_id: chat._id, icon: user2.profile_pic, name: user2.username, chat_partner: user2_id})
      } catch (error) {res.status(500).json({ error: error.message })}
    }
    else res.status(401).json("unauthorized");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
