import { IconLove } from '@/components/SVG'
import { API } from '@/lib/api'
import { useEffect, useState } from 'react'

const LikeButton = ({ threadId }: { threadId: string }) => {
    const [status, setStatus] = useState<boolean>(false)
    const [totalLike, setTotalLike] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)

    const handleStatus = async () => {
        // await API.get(`/like/${threadId}`, {
        await API.get(`/like/check/${threadId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            setStatus(res.data.like === null ? false : true)
            setTotalLike(res.data.totalLike);
        })
    }
    const handleLike = async () => {
        setIsLoading(true)
        try {
            await API.post(`like`, { threadsId: threadId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )

            await handleStatus();
        } catch (error) {
            console.log(error);
        }
    };
    // const handleFollow = async () => {
    //     setIsLoadingButton(true)
    //     await API.post(`/follow`, { followingId: userId }, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //     }).then(() => {
    //         setIsLoadingButton(false)
    //     })
    //     handleStatus()
    // }

    useEffect(() => {
        handleStatus()
    }, [threadId])

    return (
        <>
            <div onAnimationEnd={() => setIsLoading(false)} className='flex items-center gap-2 '>
                <IconLove onClick={handleLike} className={`cursor-pointer  ${isLoading ? "like_animation" : "reply_animation"} ${status ? "text-red-500" : ""}`} size={20} />
                <span>{totalLike}</span>
            </div>
            {/* <Button variant={status ? "unFollow" : "profile"}>
                {!isLoadingButton && (
                    <span className='z-20 '>{status ? "UnFollow" : "Follow"}</span>
                )
                }
                {isLoadingButton &&
                    (
                        <NewtonLoader />
                    )
                }
            </Button> */}
            {/* {
                !isLoading && (
                )
            }
            {
                isLoading && (
                    <div className="flex justify-center text-3xl text-white">
                        <NewtonLoader />
                    </div>
                )
            } */}
        </>
    )
}

export default LikeButton