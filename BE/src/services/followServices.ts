import db from "../lib/db"


export const followingAll = async (userId: string) => {
    const searchFollowing = await db.follow.findMany({
        where: {
            followingId: userId
        },
        select: {
            follower: {
                select: {
                    id: true,
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    })

    return searchFollowing
}

export const followerAll = async (userId: string) => {
    const searchFollower = await db.follow.findMany({
        where: {
            followerId: userId
        },
        select: {
            following: {
                select: {
                    id: true,
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    })

    return searchFollower
}

export const followCreate = async (userId: string, followingId: string) => {

    const existedFollow = await db.follow.findFirst({
        where: {
            // followerId: userId,
            // followingId: followingId
            followerId: followingId,
            followingId: userId
        },
    });

    if (existedFollow) {
        await db.follow.deleteMany({
            where: {
                followerId: followingId,
                followingId: userId
            },
        });
        return {
            message: "UnFollow Successs"
        }
    }

    await db.follow.create({
        data: {
            followerId: followingId,
            followingId: userId
        },
    })

    return {
        message: "Follow Successss"
    }
}


