import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { jwt_token } = req.headers;
  if (jwt_token) {
    const { _id } = jwt.verify(jwt_token, process.env.JWT_SECRET);
    if (_id) {
      req.body = {...req.body,_id: _id};
      next();
    } else {
      res.status(401).json("Unauthorized");
    }
  } else {
    res.status(403).json("Forbidden");
  }
};
