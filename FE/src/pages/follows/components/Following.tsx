import { IconProfileUser, LoadingDefault } from '@/components/SVG'
import { API } from '@/lib/api'
import { useEffect, useState } from 'react'

export interface IFollow {
    follower: {
        id: string
        fullname: string
        username: string
        profile: {
            avatar: string
        }
    }
}

const Following = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [allFollowing, setAllFollowing] = useState<IFollow[]>([]);

    useEffect(() => {
        const AllFollowingUsers = async () => {
            setIsLoading(true)
            await API.get(`/follow/following`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((res) => {
                setAllFollowing(res.data)
                setIsLoading(false)
            })
        }
        AllFollowingUsers()

    }, [])

    return (
        <div className='flex flex-col items-center w-full'>
            {
                !isLoading && (
                    <div className="flex flex-col w-full gap-5 p-4 rounded-md">
                        <div className="flex flex-col gap-4">
                            {
                                allFollowing.map((item, index) => (
                                    <div key={index} className={`flex justify-between w-full text-sm`}>
                                        {item.follower.profile?.avatar ?
                                            <img src={item.follower.profile?.avatar} className='w-10 h-10 bg-black rounded-full' alt="" />
                                            :
                                            <IconProfileUser className='w-12 h-12 rounded-full' />
                                        }
                                        <div className="flex flex-col w-full pl-2">
                                            <span>{item.follower.fullname}</span>
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

export default Following