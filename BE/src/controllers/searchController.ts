import { Request, Response } from "express";
import * as searchServices from "../services/searchServices"

export const searchAllUsers = async (req: Request, res: Response) => {
    try {

        const users = req.query

        const dataUser = await searchServices.searchAllUsers(users as { fullname: string });

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};

export const getAllUsersSearch = async (req: Request, res: Response) => {
    try {

        const userId = res.locals.userId.id;

        const dataUser = await searchServices.getAllUsersSearch(userId);

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};