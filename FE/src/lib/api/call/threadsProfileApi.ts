// import { IThreadsV } from "@/pages/Threads/components/ThreadsCard";
import { API } from "..";

export const getThreadsByUserLogin = async () => {
    const token = localStorage.getItem("token");
    const response = await API.get("/threads/userLogin", {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    })
    return response;
};

export const getThreadsByUserId = async (userId: string) => {
    const token = localStorage.getItem("token");
    const response = await API.get(`/threads/${userId}`, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    })
    return response;
};

export interface IThreadsPost {
    content?: string
    image?: FileList | null
}

export const handlePostThreads = async (dataVThreads: IThreadsPost) => {
    const token = localStorage.getItem("token");
    const formData = new FormData()
    if (dataVThreads.image !== null) {
        for (let i = 0; i < dataVThreads.image!.length; i++) {
            formData.append("image", dataVThreads.image![i]);
        }
    }
    formData.append("content", dataVThreads.content!);

    await API.post("/threads", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    })
}

export const handleDeleteThreads = async (threadId: string) => {
    const token = localStorage.getItem("token");

    await API.delete(`/threads/${threadId}`, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    })
}