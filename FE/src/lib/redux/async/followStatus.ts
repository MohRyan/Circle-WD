import { API } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchFollowStatusPayload, HandleFollowPayload } from "../slice/followStatus";

export const fetchFollowStatus = createAsyncThunk<FetchFollowStatusPayload, string>(
    'followStatus',
    async (userId: string) => {
        const response = await API.get(`/follow/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return { userId, data: response.data.data };
    }
);

export const handleFollow = createAsyncThunk<HandleFollowPayload, string>(
    'user/handleFollow',
    async (userId: string, thunkAPI) => {
        const response = await API.post(`/follow`, { followingId: userId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        thunkAPI.dispatch(fetchFollowStatus(userId)); // Panggil fetchFollowStatus setelah mengikuti
        return { userId, data: response.data };
    }
);