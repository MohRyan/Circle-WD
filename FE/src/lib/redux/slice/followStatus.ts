import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchFollowStatus, handleFollow } from "../async/followStatus";

export interface UserState {
    isLoading: boolean;
    isLoadingButton: boolean;
    followStatus: boolean | null;
    error: string | null;
}

export interface UsersState {
    [key: string]: UserState;
}

export interface FetchFollowStatusPayload {
    userId: string;
    data: boolean;
}

export interface HandleFollowPayload {
    userId: string;
    data: any;
}


const initialState: { users: UsersState } = {
    users: {},
};

const followStatusSlice = createSlice({
    name: "followStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFollowStatus.pending, (state, action) => {
                const userId = action.meta.arg;
                state.users[userId] = {
                    ...state.users[userId],
                    isLoading: true,
                };
            })
            .addCase(fetchFollowStatus.fulfilled, (state, action: PayloadAction<FetchFollowStatusPayload>) => {
                const { userId, data } = action.payload;
                state.users[userId] = {
                    ...state.users[userId],
                    isLoading: false,
                    followStatus: data,
                };
            })
            .addCase(fetchFollowStatus.rejected, (state, action) => {
                const userId = action.meta.arg;
                state.users[userId] = {
                    ...state.users[userId],
                    isLoading: false,
                    error: action.error.message as string,
                };
            })
            .addCase(handleFollow.pending, (state, action) => {
                const userId = action.meta.arg;
                state.users[userId] = {
                    ...state.users[userId],
                    isLoadingButton: true,
                };
            })
            .addCase(handleFollow.fulfilled, (state, action: PayloadAction<HandleFollowPayload>) => {
                const userId = action.payload.userId;
                state.users[userId] = {
                    ...state.users[userId],
                    isLoadingButton: false,
                };
            })
            .addCase(handleFollow.rejected, (state, action) => {
                const userId = action.meta.arg;
                state.users[userId] = {
                    ...state.users[userId],
                    isLoadingButton: false,
                    error: action.error.message as string,
                };
            });
    },

})

// export const { FOLLOW } = followStatusSlice.actions
export default followStatusSlice.reducer