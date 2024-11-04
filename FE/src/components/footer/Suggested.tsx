import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { IUser } from '@/lib/redux/type'
import { API } from '@/lib/api'
import { ISearch } from '@/pages/search'
import { IconProfileUser } from '../SVG'
import { SkeletonUsers } from '../Skeleton'
import FollowButton from '@/pages/follows/components/FollowButton'

const Suggested = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataSuggest, setDataSuggest] = useState<ISearch[]>([])


    const suggestUsers = async () => {
        setIsLoading(true)
        await API.get(`/user/suggest`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((res) => {
            setDataSuggest(res.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        suggestUsers()
    }, [])
    return (
        <div className="flex flex-col w-full gap-5 p-4 rounded-md bg-third">
            <span>Suggested for you</span>

            {
                !isLoading && (
                    <div className="flex flex-col gap-4">
                        {
                            dataSuggest.map((item, index) => (
                                <div key={index} className="flex items-center justify-between w-full text-sm">
                                    <div className="flex items-center w-full">
                                        {item.profile?.avatar ?
                                            <img src={item.profile?.avatar} className='w-10 h-10 bg-black rounded-full' alt="" />
                                            :
                                            <IconProfileUser className='w-12 h-12 rounded-full' />
                                        }
                                        <div className='flex flex-col pl-2'>
                                            <span className='text-sm'>{item.fullname}</span>
                                            <span className='text-sm text-content'>@{item.username}</span>
                                        </div>
                                    </div>
                                    <FollowButton userId={item.id} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                isLoading && (
                    <>
                        <SkeletonUsers />
                        <SkeletonUsers />
                    </>
                )
            }
        </div>
    )
}

export default Suggested