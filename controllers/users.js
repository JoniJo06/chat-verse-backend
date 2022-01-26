import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      first_name,
      last_name,
      gender,
      birthday,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      first_name,
      last_name,
      gender,
      birthday,
    });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.status(200).json(token);
      } else {
        res.status(403).json("login data incorrect!");
      }
    } else {
      res.status(404).json("user not found!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const username = req.user;
    const user = await User.findOne({ username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getAllActiveChats = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    res.status(200).json({ chats: user.chats });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserChatDataById = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById({ _id });
    res
      .status(200)
      .json({ username: user.username, profile_pic: user.profile_pic });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
