import jwt from "jsonwebtoken";
import { userdetail } from "../model/user.model.js";

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. Please login." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.Jwt_Sec);

    const loggedInUser = await userdetail.findById(decoded._id);
    if (!loggedInUser) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = loggedInUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
