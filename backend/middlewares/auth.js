import { User } from "../model/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    // const { token } = req.cookies;
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Login to access this resource",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
