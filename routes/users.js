import express from "express";
import { logIn, signUp } from "../controllers/users.js";
const users = express.Router();

users.post("/signup", signUp);
users.post("/login", logIn);

export default users;