import { Request, Response } from "express";
import * as threadsServices from "../services/threadsSevices"


export const threadsAll = async (req: Request, res: Response) => {
    try {
        const dataThreads = await threadsServices.threadsAll()

        res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}


export const threadsAllbyUserLogin = async (req: Request, res: Response) => {
    try {

        const userId = res.locals.userId.id
        const dataThreads = await threadsServices.threadsAllbyUserLogin(userId)

        res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}

export const threadsAllByUserId = async (req: Request, res: Response) => {
    try {

        const { userId } = req.params

        const dataThreads = await threadsServices.threadsAllbyUserId(userId)

        res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}

export const threadsOneById = async (req: Request, res: Response) => {
    try {

        const { threadId } = req.params

        const dataThreads = await threadsServices.threadsOnebyId(threadId)

        res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}


export const threadsCreate = async (req: Request, res: Response) => {
    try {

        const { body } = req;
        const userId = res.locals.userId.id;
        const thread = await threadsServices.threadsCreate(
            body,
            userId,
            req.files as { [fieldname: string]: Express.Multer.File[] }
        );

        return res.json({
            status: true,
            message: "success",
            data: thread,
        });

        // res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}

export const threadsDelete = async (req: Request, res: Response) => {
    try {

        const { threadId } = req.params

        const dataThreads = await threadsServices.threadsDelete(threadId)

        res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}

export const threadsEdit = async (req: Request, res: Response) => {
    try {

        const { threadId } = req.params
        const { content } = req.body

        const dataThreads = await threadsServices.threadsEdit(threadId, content)

        res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}


export const replyCreate = async (req: Request, res: Response) => {
    try {

        const { body } = req;
        const { threadsId } = req.params;
        const userId = res.locals.userId.id;
        const thread = await threadsServices.replyCreate(
            body,
            userId,
            req.files as { [fieldname: string]: Express.Multer.File[] },
            threadsId
        );

        return res.json({
            status: true,
            message: "success",
            data: thread,
        });

        // res.status(200).json(dataThreads)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}


export const replyAll = async (req: Request, res: Response) => {
    try {

        const { threadId } = req.params

        const dataReply = await threadsServices.replyAll(threadId)

        res.status(200).json(dataReply)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}

export const replyByThreadId = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params;

        const dataReply = await threadsServices.replyByThreadId(threadId)

        res.status(200).json(dataReply)
    } catch (error) {
        const err = error as unknown as Error;
        res.status(500).json({
            message: err.message,
        });
    }
}