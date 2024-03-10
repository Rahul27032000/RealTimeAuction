import { Request, Response } from "express";
import { createUser, getUserByEmail, getUserByUsername } from "../model/users";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../helper";

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select("password");
    if (!user) {
      return res.sendStatus(400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.sendStatus(400);
    }

    const accessToken = generateAccessToken({ user: user.username });
    res.cookie("AUTH", accessToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

