import { Request, Response } from "express";
import { createUser, getUserByEmail, getUserByUsername } from "../model/users";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUserByEmail = await getUserByEmail(email);
    const existingUserByUsername = await getUserByEmail(email);

    if (existingUserByEmail) {
      return res.sendStatus(400);
    }
    if (existingUserByUsername) {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
