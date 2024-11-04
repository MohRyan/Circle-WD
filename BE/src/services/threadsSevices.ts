import { thread } from "@prisma/client";
import db from "../lib/db";
import * as fs from "fs";
import cloudinary from "../middlewares/cloudinary";


export const threadsAll = async () => {
    const threads = await db.thread.findMany({
        include: {
            author: {
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
            },
            image: {
                select: {
                    image: true
                }
            },
            like: {}
        },
        orderBy: {
            id: "desc"
        }
    })
    return {
        threads,
    }
}

export const threadsAllbyUserLogin = async (userId: string): Promise<thread[]> => {
    return await db.thread.findMany({
        where: {
            AND: {
                threadRId: null
            },
            userId: userId
        }, include: {
            image: true,
            author: {
                select: {
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            },
        },
        orderBy: {
            id: "desc"
        }
    })
}

export const threadsAllbyUserId = async (userId: string) => {
    const thread = await db.thread.findMany({
        where: {
            AND: {
                threadRId: null
            },
            userId: userId
        },
        include: {
            image: true,
            author: {
                select: {
                    username: true,
                    fullname: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            },
        },
        orderBy: {
            id: "desc"
        }
    })

    const user = await db.users.findFirst({
        where: {
            id: userId
        },
        select: {
            username: true,
            fullname: true,
            profile: {
                select: {
                    avatar: true,
                    cover: true,
                    bio: true
                }
            },
            follower: true,
            following: true,
        },
    })

    return {
        user,
        thread
    }
}

export const threadsOnebyId = async (threadId: string) => {
    const thread = await db.thread.findFirst({
        where: {
            id: threadId
        },
    })
    const reply = await db.thread.findMany({
        where: {
            NOT: {
                threadRId: null
            },
            threadRId: threadId
        },
        select: {
            content: true,
            image: {
                select: {
                    image: true
                }
            },
            author: {
                select: {
                    username: true,
                    fullname: true,
                    profile: true,
                }
            }
        },
    })

    return {
        thread,
        reply,
        countReply: reply.length
    }
}


export const threadsCreate = async (body: thread, userId: string, files: { [fieldname: string]: Express.Multer.File[] }) => {
    // console.log("🚀 ~ threadsCreate ~ files:", files)

    const threads = await db.thread.create({
        data: {
            ...body,
            threadRId: null,
            userId: userId
        },

    })

    if (!files) {
        return
    } else {
        // check if multiple files are uploaded
        if (Array.isArray(files)) {
            for (const file of files as Express.Multer.File[]) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "circleapp/threads",
                });
                await db.threadImage.create({
                    data: {
                        image: result.secure_url,
                        threadId: threads.id
                    }
                })
                fs.unlinkSync(file.path);
            }
        } else {
            // single file uploaded
            const file = files as unknown as Express.Multer.File;
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "circleapp/threads",
            });
            await db.threadImage.create({
                data: {
                    image: result.secure_url,
                    threadId: threads.id
                }
            })
            fs.unlinkSync(file.path);
        }
    }

    return threads
    // return await db.thread.create({
    //     data: {
    //         ...body,
    //         userId: body.userId
    //     }
    // })
}


export const threadsDelete = async (threadId: string) => {

    const oldThreadData = await db.thread.findUnique({
        where: { id: threadId },
        select: { image: true },
    });

    oldThreadData?.image.map(async (item) => {
        if (oldThreadData && item) {
            const publicId = item.image.split("upload").pop()?.slice(13).split(".").shift();
            cloudinary.uploader.destroy(publicId as string);
        }
    });

    await db.threadImage.deleteMany({
        where: {
            threadId: threadId
        }
    })
    await db.like.deleteMany({
        where: {
            threadId: threadId
        }
    })
    await db.thread.deleteMany({
        where: {
            threadRId: threadId
        }
    })

    return await db.thread.delete({
        where: {
            id: threadId
        }
    })
}

export const threadsEdit = async (threadId: string, content: string) => {

    return await db.thread.update({
        where: {
            id: threadId
        },
        data: {
            content: content
        }
    })
}


export const replyCreate = async (body: thread, userId: string, files: { [fieldname: string]: Express.Multer.File[] }, threadsId: string) => {

    const reply = await db.thread.create({
        data: {
            ...body,
            threadRId: threadsId,
            userId: userId
        }
    })

    if (!files) {
        return
    } else {
        // check if multiple files are uploaded
        if (Array.isArray(files)) {
            for (const file of files as Express.Multer.File[]) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "circleapp/threads",
                });
                await db.threadImage.create({
                    data: {
                        image: result.secure_url,
                        threadId: reply.id
                    }
                })
                fs.unlinkSync(file.path);
            }
        } else {
            // single file uploaded
            const file = files as unknown as Express.Multer.File;
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "circleapp/threads",
            });
            await db.threadImage.create({
                data: {
                    image: result.secure_url,
                    threadId: reply.id
                }
            })
            fs.unlinkSync(file.path);
        }
    }

    return reply
}

export const replyAll = async (threadsId: string) => {
    const Count = await db.thread.count({
        where: {
            threadRId: threadsId
        },
    })

    return Count
}
export const replyByThreadId = async (threadId: string): Promise<thread[]> => {
    return await db.thread.findMany({
        where: {
            NOT: {
                threadRId: null
            },
            threadRId: threadId
        },
        include: {
            image: {
                select: {
                    image: true
                }
            }
        }
    })
}

export const replyDelete = async (threadId: string) => {

    const oldThreadData = await db.thread.findUnique({
        where: { id: threadId },
        select: { image: true },
    });

    oldThreadData?.image.map(async (item) => {
        if (oldThreadData && item) {
            const publicId = item.image.split("upload").pop()?.slice(13).split(".").shift();
            cloudinary.uploader.destroy(publicId as string);
        }
    });

    await db.threadImage.deleteMany({
        where: {
            threadId: threadId
        }
    })

    return await db.thread.delete({
        where: {
            id: threadId
        }
    })
}