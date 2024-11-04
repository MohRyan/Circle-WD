import { Request, Response } from "express";
import * as followServices from "../services/followServices"
import db from "../lib/db";

export const followingAll = async (req: Request, res: Response) => {
    try {

        const userId = res.locals.userId.id
        // const { followingId } = req.params

        const dataUser = await followServices.followingAll(userId);

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};

export const followerAll = async (req: Request, res: Response) => {
    try {

        const userId = res.locals.userId.id
        // const { followingId } = req.params

        const dataUser = await followServices.followerAll(userId);

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};

export const followCreate = async (req: Request, res: Response) => {
    try {

        const userId = res.locals.userId.id
        const { followingId } = req.body as { followingId: string }

        const dataUser = await followServices.followCreate(userId, followingId);

        res.status(200).json(dataUser);
    } catch (error) {
        console.log("🚀 ~ getUser ~ error:", error);

        const err = error as unknown as Error;

        res.status(500).json({
            message: err.message,
        });
    }
};


export const checkFollowStatus = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.userId.id
        const { followingId } = req.params

        const isFollowings = await db.follow.findFirst({
            where: {
                followerId: followingId,
                followingId: userId
            },
        });
        //    console.log(isFollowings);

        res.json({
            success: true,
            message: "success",
            data: isFollowings ? true : false,
        });
    } catch (error) {
        const err = error as Error;
        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};