import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    if (_id) {
      req.body = {_id: _id};
      next();
    } else {
      res.status(401), json("Unauthorized");
    }
  } else {
    res.status(403).json("Forbidden");
  }
};
