import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
  createUser,
  editUser,
  getUser,
  UserCreateInput,
} from "../../../UserModel";
import { generateUserError, generateUserSuccess } from "../../../UserView";

export const createUserController = async (req: Request, res: Response) => {
  // TODO validate input
  const user: UserCreateInput = {
    ...req.body,
    password: "test",
  };

  try {
    const newUser = await createUser(user);
    const body = generateUserSuccess(newUser);
    res.statusCode = 201;
    res.send(body);
  } catch (err) {
    // TODO move to error handler
    let errorName = "UnknownError";
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res.statusCode = 409;
        if (Array.isArray(err.meta?.target)) {
          if (err.meta?.target.includes("username")) {
            errorName = "UsernameAlreadyTaken";
          } else if (err.meta?.target.includes("email")) {
            errorName = "EmailAlreadyInUse";
          }
        }
      }
    }
    const body = generateUserError(errorName);
    res.send(body);
  }
};

export const editUserController = async (req: Request, res: Response) => {
  // TODO validate input
  const { userId } = req.params;
  const user = req.body;

  try {
    const updatedUser = await editUser(parseInt(userId), user);
    const body = generateUserSuccess(updatedUser);
    res.statusCode = 201;
    res.send(body);
  } catch (err) {
    // TODO move to error handler
    let errorName = "UnknownError";
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        res.statusCode = 404;
        errorName = "UserNotFound";
      }
      if (err.code === "P2002") {
        res.statusCode = 409;
        if (Array.isArray(err.meta?.target)) {
          if (err.meta?.target.includes("username")) {
            errorName = "UsernameAlreadyTaken";
          } else if (err.meta?.target.includes("email")) {
            errorName = "EmailAlreadyInUse";
          }
        }
      }
    }
    const body = generateUserError(errorName);
    res.send(body);
  }
};

export const getUserController = async (req: Request, res: Response) => {
  // TODO validate input
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    res.statusCode = 404;
    const errorName = "InvalidEmail";
    const body = generateUserError(errorName);
    res.send(body);
    return;
  }

  try {
    const user = await getUser(email);
    const body = generateUserSuccess(user);
    res.statusCode = 201;
    res.send(body);
  } catch (err) {
    // TODO move to error handler
    let errorName = "UnknownError";
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        res.statusCode = 404;
        errorName = "UserNotFound";
      }
    }
    const body = generateUserError(errorName);
    res.send(body);
  }
};
