import { NextFunction, Request, Response } from "express";
import { getUserByID, getUserBySessionToken } from "../model/users";
import { get, merge } from "lodash";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["AUTH"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const isOwener = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string | undefined;
    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = get(req, "identity._id") as string | undefined;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const user = await getUserByID(currentUserId);

    if (!user?.isAdmin) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
