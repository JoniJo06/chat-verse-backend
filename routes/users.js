import express from "express";
import { logIn, signUp,getUserInfo, getAllUsers } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const users = express.Router();

users.post("/signup", signUp);
users.post("/login", logIn);
users.route('/').get(getAllUsers)

export default users;


