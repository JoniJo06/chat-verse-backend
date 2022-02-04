import User from "../models/User.js";

export const mainSearch = async (req, res) => {
  try {
    const { search, type } = req.query;
    const regexAll = new RegExp(String.raw`(.{0,}${search}.{0,}\b)`);
    if (type === "user") {
      const regexSingle = new RegExp(String.raw`\b.{0,0}${search}\b`);

      const users = await User.find(
        {
          username: { $regex: regexAll, $options: "gim" },
          public: true,
          active: true,
        },
        "username profile_pic",
        { limit: 5 }
      );
      try {
        const user = await User.findOne(
          {
            username: { $regex: regexSingle, $options: "gi" },
            public: true,
            active: true,
          },
          "username profile_pic"
        );
        const temp = [...users];
        const usersFormatted = temp.filter((el) => {
          return el.username !== user.username;
        });
        // console.log(index)
        res.status(200).json({ user: user, users: usersFormatted });
        return;
      } catch (err) {
        res.status(200).json({ user: null, users: users });
        return;
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
