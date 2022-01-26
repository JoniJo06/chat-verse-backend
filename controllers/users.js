import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { email, password, username, first_name, last_name, gender, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      first_name,
      last_name,
      gender, 
      birthday
    });
    const token = jwt.sign(
      { username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
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
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "3h",
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
