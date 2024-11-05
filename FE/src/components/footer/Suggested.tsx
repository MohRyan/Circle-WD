import { useEffect, useState } from 'react'
import { API } from '@/lib/api'
import { ISearch } from '@/pages/search'
import { IconProfileUser } from '../SVG'
import { SkeletonUsers } from '../Skeleton'
import FollowButton from '@/pages/follows/components/FollowButton'
import { Link } from 'react-router-dom'
import UseShowProfile from '@/lib/hooks/useShowProfile'

const Suggested = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [dataSuggest, setDataSuggest] = useState<ISearch[]>([])
    const { handleNavigateNavbarOutProfile } = UseShowProfile()




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
                                <div key={index} className="flex items-center w-full text-sm justify-betw">
                                    <div className="flex items-center w-full">
                                        {item.profile?.avatar ?
                                            <Link to={`profile/${item.id}`}>
                                                {item.profile?.avatar ?
                                                    <img src={item.profile?.avatar} onClick={handleNavigateNavbarOutProfile} className='w-12 h-10 rounded-full' alt="" />
                                                    :
                                                    <IconProfileUser className='w-10 h-10 rounded-full' />
                                                }
                                            </Link>
                                            // <img src={item.profile?.avatar} className='w-10 h-10 bg-black rounded-full' alt="" />
                                            :
                                            <Link to={`profile/${item.id}`} onClick={handleNavigateNavbarOutProfile}>
                                                <IconProfileUser className='w-10 h-10 rounded-full' />
                                            </Link>
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