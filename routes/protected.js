import express from "express";
import { getUserInfo } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const protectedRoute = express.Router();

protectedRoute.get("/me", verifyToken, getUserInfo);

export default protectedRoute;