import { IconProfileUser, LoadingDefault } from '@/components/SVG'
import { API } from '@/lib/api'
import { useEffect, useState } from 'react'

export interface IFollow {
    following: {
        id: string
        fullname: string
        username: string
        profile: {
            avatar: string
        }
    }
}

const Follower = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [allFollower, setAllFollower] = useState<IFollow[]>([]);

    useEffect(() => {
        const AllFollowerUsers = async () => {
            setIsLoading(true)
            await API.get(`/follow/follower`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) => {
                setAllFollower(res.data)
                setIsLoading(false)
            })
        }
        AllFollowerUsers()

    }, [])

    return (
        <div className='flex flex-col items-center w-full'>
            {
                !isLoading && (
                    <div className="flex flex-col w-full gap-5 p-4 rounded-md">
                        <div className="flex flex-col gap-4">
                            {
                                allFollower.map((item, index) => (
                                    <div key={index} className={`flex justify-between w-full text-sm`}>
                                        {item.following.profile?.avatar ?
                                            <img src={item.following.profile?.avatar} className='w-10 h-10 bg-black rounded-full' alt="" />
                                            :
                                            <IconProfileUser className='w-12 h-12 rounded-full' />
                                        }
                                        <div className="flex flex-col w-full pl-2">
                                            <span>{item.following.fullname}</span>
                                            <span className='text-content'>@MohRyan</span>
                                        </div>
                                        {/* <FollowButton userId={item.id} /> */}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
            {
                isLoading && (
                    <div className="flex justify-center text-5xl text-white">
                        <LoadingDefault />
                    </div>
                )
            }
        </div>
    )
}

export default Follower