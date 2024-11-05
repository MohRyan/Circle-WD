import { Button } from '@/components/ui/button'
import React, { Dispatch, SetStateAction, } from 'react'
import { LuImagePlus } from "react-icons/lu"
import { useAppSelector } from '@/lib/redux'
import { LoadingDefault } from '@/components/SVG'
import { IThreadsPost } from '@/lib/api/call/threadsProfileApi'

interface IProps {
    handleFormThreads: (e: React.FormEvent) => void
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setDataThreadsPost: Dispatch<SetStateAction<IThreadsPost>>
    dataThreadsPost: IThreadsPost
    isLoadingButtonPost: boolean
}

const Post = ({ handleFormThreads, handleFileChange, setDataThreadsPost, dataThreadsPost, isLoadingButtonPost }: IProps) => {
    const { profile, username } = useAppSelector((state) => state.auth.userLogin)

    return (
        <>
            <div className='flex items-center gap-5 py-5'>
                {typeof profile?.avatar !== 'string' ?
                    <div className="flex items-center justify-center text-black bg-gray-300 rounded-full w-14 h-14">
                        {/* <LoadingDefault /> */}
                        {username?.split("").slice(0, 2).join("").toLocaleLowerCase()}
                    </div>
                    :
                    <img src={profile?.avatar} className='rounded-full w-14 h-14' alt="" />
                }
                <form action="" onSubmit={handleFormThreads} className='flex items-center w-full gap-3'>
                    <input placeholder='What is happening?!' value={dataThreadsPost.content} className='w-full p-2 text-black rounded-md' onChange={(e) => setDataThreadsPost({ ...dataThreadsPost, content: e.target.value })} />
                    <label htmlFor="imageThreads">
                        <LuImagePlus size={28} />
                    </label>
                    {/* <Input type='file' id='imageThreads' className='hidden' multiple max={4} onChange={(e) => setDataThreads({ ...dataThreads, image: e.target.files })} placeholder='What is happening?!' /> */}
                    <input type='file' id='imageThreads' className='hidden' multiple max={4} onChange={handleFileChange} placeholder='What is happening?!' />
                    <Button type='submit' className='px-10 '>
                        {
                            !isLoadingButtonPost && (
                                <span className="z-20">Post</span>
                            )
                        }
                        {
                            isLoadingButtonPost && (
                                <span className='z-20 hover:text-black'>
                                    <LoadingDefault />
                                </span>
                            )
                        }
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Post