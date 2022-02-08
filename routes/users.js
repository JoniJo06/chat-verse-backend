import express from "express";
import {
  logIn,
  signUp,
  getAllUsers,
  getUserChatDataById,
  getAllActiveChats,
  getAllFriends,
  sendFriendRequest,
  acceptFriendRequest,
  getAllFriendRequests,
  togglePublic,
  getProfileInfo,
  updateProfileInfo,
  updateUsername,
  rejectFriendRequest,
  cancelPendingFriendRequest,
  removeFriend,
  addToBlacklist,
  removeFromBlacklist,
  getFriendsForChatList
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {reject} from "bcrypt/promises.js";
const users = express.Router();

users.post("/signup", signUp);
users.post("/login", logIn);
users.route('/').get(getAllUsers)
users.get('/chat-data-by-id', verifyToken, getUserChatDataById)
users.get('/all-active-chats', verifyToken, getAllActiveChats)
users.get('/friends', verifyToken, getAllFriends)
users.get('/friends/requests/:user_id', verifyToken, sendFriendRequest)
users.get('/friends/requests/accept/:user_id', verifyToken, acceptFriendRequest)
users.get('/friends/requests/reject/:user_id',verifyToken, rejectFriendRequest)
users.get('/friends/requests/cancel/:user_id', verifyToken, cancelPendingFriendRequest)
users.get('/friends/remove/:user_id', verifyToken, removeFriend)
users.get('/friends/blacklist/add/:user_id', verifyToken, addToBlacklist)
users.get('/friends/blacklist/remove/:user_id', verifyToken, removeFromBlacklist)
users.get('/friends/requests', verifyToken, getAllFriendRequests)
users.get('/friends/info/chat-list', verifyToken, getFriendsForChatList)
users.get('/profile/toggle-public', verifyToken, togglePublic)
users.route('/profile/info').get(verifyToken, getProfileInfo).put(verifyToken, updateProfileInfo)
users.put('/profile/info/username', verifyToken, updateUsername)

export default users;


