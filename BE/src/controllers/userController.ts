import { Request, Response } from "express";
import * as userService from "../services/userServices";
import { errorHandler } from "../utils/errorHandler";

export const getAllUser = async (req: Request, res: Response) => {
  try {

    const dataUser = await userService.getAllUser();

    res.status(200).json(dataUser);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);

    const err = error as unknown as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { id } = res.locals.userId;
    const userId = id

    const dataUser = await userService.getUser(userId);

    res.status(200).json(dataUser);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);

    const err = error as unknown as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const dataInsertUser = await userService.insertUser(body);

    res.status(200).json(dataInsertUser);
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);

    const err = error as unknown as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { params } = req;
    const { userId } = params;

    const messageDeleteUser = await userService.deleteUsers(userId);

    res.status(200).json({ message: messageDeleteUser });
  } catch (error) {
    console.log("🚀 ~ deleteUser ~ error:", error);

    return errorHandler(error, res);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    const { userId } = params;

    const dataUpdateUser = await userService.updateUser(userId, body);

    res.status(200).json(dataUpdateUser);
  } catch (error) {
    console.log("🚀 ~ updateUser ~ error:", error);

    const err = error as unknown as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProfileUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = res.locals.userId;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const dataUpdateUser = await userService.updateProfileUser(
      id,
      body,
      files
    );

    res.status(200).json(dataUpdateUser);
  } catch (error) {
    console.log("🚀 ~ updateUser ~ error:", error);

    const err = error as unknown as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};


export const suggestUsers = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId.id;
    const dataSuggestUser = await userService.suggestUsers(userId);

    res.status(200).json(dataSuggestUser);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);

    const err = error as unknown as Error;

    res.status(500).json({
      message: err.message,
    });
  }
};


