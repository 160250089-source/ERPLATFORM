import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getJwtSecret = () => process.env.JWT_SECRET || process.env.SECRET_KEY;

export const identifyUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.query?.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
      err: "token invalid",
    });
  }
};

export default identifyUser;