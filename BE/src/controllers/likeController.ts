import { Request, Response } from "express";
import * as likeServices from "../services/likeServices"
import db from "../lib/db";

export const likeAll = async (req: Request, res: Response) => {
    try {

        const { threadId } = req.params;
        const likes = await likeServices.likeAll(threadId);

        res.json({
            status: true,
            message: "success",
            data: {
                user: likes,
            },
        });
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};

export const getCurrentLike = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params;
        const userId = res.locals.userId.id
        const like = await likeServices.getCurrentLike(threadId, userId);
        const totalLike = await db.like.count({
            where: {
                threadId: threadId,
            },
        });

        res.json({
            like,
            totalLike,
        });
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message,
        });
    }
};

export const likeCreate = async (req: Request, res: Response) => {
    try {

        const userId = res.locals.userId.id
        const { threadsId } = req.body

        const dataUser = await likeServices.likeCreate(userId, threadsId);

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};