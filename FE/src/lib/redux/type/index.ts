export interface IUser {
    id?: string
    username?: string
    fullname?: string
    email?: string
    profile?: IProfile
    follower?: IFollow[]
    following?: IFollow[]
}


export interface IProfile {
    avatar?: string
    cover?: string
    bio?: string
}

export interface IFollow {
    followerId?: string
    followingId?: string
}
export interface IThreads {
    author: IUser
    id: string
    image?: IThreadsImage[]
    content?: string
    createdAt?: string
}
export interface IThreadsImage {
    id: string
    image?: string
    threadId?: string
}