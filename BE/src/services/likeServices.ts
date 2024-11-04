import db from "../lib/db"


export const likeAll = async (threadsId: string) => {
    return await db.like.findMany({
        where: {
            threadId: threadsId,
        },
        include: {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    id: true,
                    profile: {
                        select: {
                            avatar: true,
                        },
                    },
                },
            },
        },
    });
}

export const getCurrentLike = async (threadId: string, userId: string) => {
    return await db.like.findFirst({
        where: {
            threadId,
            userId,
        },
    });
};

export const likeCreate = async (userId: string, threadsId: string) => {


    const existedLike = await db.like.findFirst({
        where: {
            userId: userId,
            threadId: threadsId
        },
    });

    if (existedLike) {
        await db.like.deleteMany({
            where: {
                userId: userId,
                threadId: threadsId
            },
        });
        return {
            message: "Unlike Successs"
        }
    }

    return await db.like.create({
        data: {
            userId: userId,
            threadId: threadsId
        },
    })
}