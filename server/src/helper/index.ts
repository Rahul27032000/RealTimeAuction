import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, config.access_token!, {
    expiresIn: "30d",
  });
};
