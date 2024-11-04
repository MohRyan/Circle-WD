import { API } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UpdateProfileAsyncPayload } from "../slice/auth";

export interface IUpdateProfilePut {
    avatar: FileList | null | string
    cover: FileList | null | string
    bio: string
}

export interface IUpdateAllProfilePut {
    fullname: string
    username: string
    avatar: FileList | null | string
    cover: FileList | null | string
    bio: string
}

export const updateProfileAsync = createAsyncThunk<UpdateProfileAsyncPayload, IUpdateProfilePut>(
    'updateProfile',
    async (newData: IUpdateProfilePut) => {
        console.log("🚀 ~ newData:", newData.avatar)
        const formData = new FormData()

        if (typeof newData.avatar === 'string') {
            formData.append("avatar", newData.avatar);
        } else if (newData.avatar instanceof FileList) {
            formData.append("avatar", newData.avatar[0]);
        }

        if (typeof newData.cover === 'string') {
            formData.append("cover", newData.cover);
        } else if (newData.cover instanceof FileList) {
            formData.append("cover", newData.cover[0]);
        }

        console.log("🚀 ~ formData:", formData)
        formData.append("bio", newData.bio!)
        const response = await API.put(`/user`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data
    }
);