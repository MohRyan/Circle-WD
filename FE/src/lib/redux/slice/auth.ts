// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../type";
import { updateProfileAsync } from "../async/profileUpdate";


interface IAuth {
    userLogin: IUser
    token: string
}

const initialState: IAuth = {
    userLogin: {
        id: "",
        username: "",
        fullname: "",
        email: "",
        profile: {
            avatar: "",
            cover: "",
            bio: ""
        },
        follower: [],
        following: []
    },
    token: ""
}

export interface UpdateProfileAsyncPayload {
    // id: string
    // userId: string
    avatar: string
    cover: string
    bio: string
}


const authSlice = createSlice({
    name: "sliceName",
    initialState,
    reducers: {
        CHECK_LOGIN: (state, action: PayloadAction<IUser>) => {
            state.userLogin = action.payload
        },
        LOGIN: (state, action: PayloadAction<IAuth>) => {
            state.userLogin = action.payload.userLogin
            state.token = action.payload.token
            localStorage.setItem("token", action.payload.token)
        },
        LOGOUT: (state,) => {
            state.userLogin = {} as IUser
            state.token = ""
            localStorage.removeItem("token")
        },
        UPDATEPROFILE: (state, action: PayloadAction<IUser>) => {
            state.userLogin.fullname = action.payload.fullname
            state.userLogin.profile = action.payload.profile
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfileAsync.pending, () => {
                return
            })
            .addCase(updateProfileAsync.fulfilled, (state, action: PayloadAction<UpdateProfileAsyncPayload>) => {
                state.userLogin.profile!.avatar = action.payload.avatar
                state.userLogin.profile!.cover = action.payload.cover
                state.userLogin.profile!.bio = action.payload.bio
                // if (action.payload.avatar) {
                // }
                // if (action.payload.cover) {
                // }
                // if (action.payload.bio) {
                // }
            })
            .addCase(updateProfileAsync.rejected, () => {
                return
            })
    }

})

export const { LOGIN, LOGOUT, UPDATEPROFILE, CHECK_LOGIN } = authSlice.actions
export default authSlice.reducer