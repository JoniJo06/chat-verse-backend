import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { JWT_TOKEN } = req.headers;
  if (JWT_TOKEN) {
    const { _id } = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET);
    if (_id) {
      req.body = {_id: _id};
      next();
    } else {
      res.status(401).json("Unauthorized");
    }
  } else {
    res.status(403).json("Forbidden");
  }
};
