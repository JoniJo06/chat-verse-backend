import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    if (username) {
      req.user = username;
      next();
    } else {
      res.status(401), json("Unauthorized");
    }
  } else {
    res.status(403).json("Forbidden");
  }
};
