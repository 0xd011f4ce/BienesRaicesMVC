import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

const protectRoute = async (req, res, next) => {
  // verify if there's a token
  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect("/auth/login");
  }

  // check it's a valid token
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const user = await User.scope("deletePassword").findByPk(decoded.id);

    // store user in req object
    if (!user) return res.redirect("/auth/login");

    req.user = user;
    return next();
  } catch (error) {
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export default protectRoute;
