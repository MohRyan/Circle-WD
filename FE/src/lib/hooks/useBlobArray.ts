import { toast } from "sonner"
import React, { FormEvent, useEffect, useState } from 'react'
import { IThreads } from "../redux/type"
import { IThreadsV } from "@/pages/Threads/components/ThreadsCard"
import { API } from "../api"
import { handlePostThreads, IThreadsPost } from "../api/call/threadsProfileApi"
import { day, hours, minutes, month, setDay, setMonth, year } from "@/components/auth/login"

export interface IProps {
    // dataThreads: IThreads
    setDataThreads: React.Dispatch<React.SetStateAction<IThreads>>
}

export const useBlobArray = () => {

    const [dataThreads, setDataThreads] = useState<IThreads[]>([
        {
            author: {
                fullname: "",
                username: "",
                profile: {
                    avatar: ""
                }
            },
            id: "",
            image: [],
            content: "",
            createdAt: ""
        },

    ])

    const [isLoadingThreads, setIsLoadingThreads] = useState<boolean>(false)
    const getThreads = async () => {
        setIsLoadingThreads(true)
        await API.get(`threads`)
            .then((res) => {
                setDataThreads(res.data.threads)
                setIsLoadingThreads(false)
            })
    }


    useEffect(() => {
        getThreads()
    }, [])




    const [dataVThreads, setDataVThreads] = useState<IThreadsV>({
        content: "",
        image: []
    })
    const [dataThreadsPost, setDataThreadsPost] = useState<IThreadsPost>({
        content: "",
        image: null
    })



    const [isLoadingButtonPost, setIsLoadingButtonPost] = useState<boolean>(false)
    const handleFormThreads = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoadingButtonPost(true)
        await handlePostThreads(dataThreadsPost).then(() => {
            getThreads()
            setIsLoadingButtonPost(false)
            toast("Post Successfully!!!!!", {
                description: `${setDay[day]}, ${setMonth[month]} ${month}, ${year} at ${hours}:${minutes}`
            })
            setDataThreadsPost({
                content: "",
                image: null
            })
        })
        setDataVThreads({ content: "", image: [] })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = e.target.files
        const imageURLs = [];
        for (let i = 0; i < files.length; i++) {
            imageURLs.push(URL.createObjectURL(files[i]));
        }
        setDataVThreads({ ...dataVThreads, image: imageURLs });
        setDataThreadsPost({ ...dataThreadsPost, image: files });
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = dataVThreads.image.filter((_, i) => i !== index);
        setDataVThreads({ ...dataVThreads, image: updatedImages });
    };

    return {
        handleFormThreads,
        handleFileChange,
        handleRemoveImage,
        setDataThreadsPost,
        dataThreadsPost,
        dataVThreads,
        dataThreads,
        getThreads,
        isLoadingThreads,
        isLoadingButtonPost
    }
}
