import { users } from "@prisma/client"
import db from "../lib/db"


export const searchAllUsers = async (querySeach: { fullname: string }) => {
    const searchUser = await db.users.findMany({
        where: {
            fullname: {
                // contains: querySeach.fullname,
                startsWith: querySeach.fullname,
                mode: 'insensitive'
            }
        },
        select: {
            fullname: true,
            username: true,
            profile: {
                select: {
                    avatar: true
                }
            }
        }
    })

    return searchUser
}

export const getAllUsersSearch = async (userId: string) => {
    const searchUser = await db.users.findMany({
        select: {
            id: true,
            fullname: true,
            username: true,
            profile: {
                select: {
                    avatar: true
                }
            }
        }
    })

    const filter = searchUser.filter(user => user.id !== userId)


    return filter
}