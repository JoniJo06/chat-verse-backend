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
    const token = await jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res
      .status(201)
      .json({ token: token, status: newUser.status, _id: newUser._id });
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
        res
          .status(200)
          .json({ token: token, status: user.status, _id: user._id });
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

export const getAllFriends = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById({ _id });
    console.log(user);

    let ids;
    let friendsList;

    ids = await user.friend_requests;
    if (ids.includes("")) ids.splice(ids.indexOf(""), 1);
    friendsList = await User.find(
      { _id: { $in: ids } },
      "profile_pic username"
    );
    const friends_requests = [...friendsList];

    ids = await user.pending_friend_requests;
    if (ids.includes("")) ids.splice(ids.indexOf(""), 1);
    friendsList = await User.find(
      { _id: { $in: ids } },
      "profile_pic username"
    );
    const pending_friend_requests = [...friendsList];

    ids = await user.friends;
    if (ids.includes("")) ids.splice(ids.indexOf(""), 1);
    friendsList = await User.find(
      { _id: { $in: ids } },
      "profile_pic username"
    );
    const friends = [...friendsList];

    ids = await user.blacklist;
    if (ids.includes("")) ids.splice(ids.indexOf(""), 1);
    friendsList = await User.find(
      { _id: { $in: ids } },
      "profile_pic username"
    );
    const blacklist = [...friendsList];

    res.status(200).json({
      friend_requests: friends_requests,
      pending_requests: pending_friend_requests,
      friends: friends,
      blocked_users: blacklist,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { _id } = req.body;
    const { user_id } = req.params;
    const user = await User.findById(_id);

    if (user_id === _id) res.status(400).send("Can't invite yourself!");

    if (user.pending_friend_requests.includes(user_id)) {
      res.status(400).send("Already requested");
      return;
    }

    try {
      const request_user = await User.findById(user_id);

      if (request_user.blacklist.includes(_id))
        res.status(403).send("unable to request!");

      User.findById(_id, (err, doc) => {
        if (err) res.status(500).json(err.message);

        const pendingRequests = doc.pending_friend_requests;
        pendingRequests.push(user_id);
        doc.pending_friend_requests = pendingRequests;
        doc.save();
      });

      User.findById(user_id, (err, doc) => {
        if (err) res.status(500).json(err.message);

        const requests = doc.friend_requests;
        requests.push(_id);
        doc.friend_requests = requests;
        doc.save();
      });

      res.status(200).json({ status: "successful" });
    } catch {
      res.status(400).send("User does not exist!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { _id } = req.body;
    const { user_id } = req.params;

    const user = await User.findById(_id);

    if (!user.friend_requests.includes(user_id))
      res.status(400).send("request does not exist");

    User.findById(_id, (err, doc) => {
      if (err) res.status(500).json(err.message);

      const request = doc.friend_requests;
      const index = request.indexOf(user_id);
      request.splice(index, 1);
      doc.friend_requests = request;

      const friends = doc.friends;
      friends.push(user_id);
      doc.friends = friends;

      doc.save();
    });

    User.findById(user_id, (err, doc) => {
      if (err) res.status(500).json(err.message);

      const pendingRequests = doc.pending_friend_requests;
      const index = pendingRequests.indexOf(_id);
      pendingRequests.splice(index, 1);
      doc.pending_friend_requests = pendingRequests;

      const friends = doc.friends;
      friends.push(_id);
      doc.friends = friends;

      doc.save();
    });

    res.status(200).json({ status: "successful" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getAllFriendRequests = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);

    console.log(user);
    res.status(200).json(user.friend_requests);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const togglePublic = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id);
    const updatedUser = await User.findByIdAndUpdate(_id, {public: !user.public}, {new: true, select: 'public'})
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err.message);
  }
};


export const getProfileInfo = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id, 'first_name last_name public username profile_pic email phone slogan');
    res.status(200).json(user)
    
  } catch (err) {
    res.status(500).json(err.message);
  }
};