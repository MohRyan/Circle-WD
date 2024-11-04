import { IconProfileUser, LoadingDefault } from '@/components/SVG'
import { Input } from '@/components/ui/input'
import { API } from '@/lib/api'
import { useEffect, useState } from 'react'
import { MdPersonSearch } from "react-icons/md"
import FollowButton from '../follows/components/FollowButton'

export interface ISearch {
    id: string
    fullname: string
    username: string
    profile: {
        avatar: string
    }
}

const Search = () => {
    const [search, setSearch] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [allUsers, setAllUsers] = useState<ISearch[]>([]);
    const [dataSearch, setDataSearch] = useState<ISearch[]>([])


    useEffect(() => {
        if (search === '') {
            const AllUsers = async () => {
                setIsLoading(true)
                await API.get(`/search`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then((res) => {
                    setAllUsers(res.data)
                    setDataSearch(res.data)
                    setIsLoading(false)
                })
            }
            AllUsers()
        } else {
            const filteredData = allUsers.filter(user =>
                user.fullname.toLowerCase().startsWith(search.toLowerCase()) ||
                user.username.toLowerCase().startsWith(search.toLowerCase())
            );
            setDataSearch(filteredData);

        }
    }, [search])

    return (
        <div className='flex flex-col items-center w-full'>
            <div className="flex justify-center w-[70%] relative">
                {/* <Input placeholder='Search your friends' onKeyDown={handleKeyPress} className='pl-12 ' onChange={(e) => setSearch(e.target.value)} /> */}
                <Input placeholder='Search your friends' className='pl-12 ' onChange={(e) => setSearch(e.target.value)} />
                <MdPersonSearch className='absolute text-black left-3 top-1' size={30} />
            </div>
            {
                !isLoading && (
                    <>
                        {dataSearch.length > 0 ?
                            <div className="flex flex-col gap-5 p-4 w-[70%] rounded-md">
                                <div className="flex flex-col gap-4">
                                    {
                                        dataSearch.map((item, index) => (
                                            <div key={index} className={`flex justify-between w-full text-sm`}>
                                                {item.profile?.avatar ?
                                                    <img src={item.profile?.avatar} className='w-10 h-10 bg-black rounded-full' alt="" />
                                                    :
                                                    <IconProfileUser className='w-12 h-12 rounded-full' />
                                                }
                                                <div className="flex flex-col w-full pl-2">
                                                    <span>{item.fullname}</span>
                                                    <span className='text-content'>@{item.username}</span>
                                                </div>
                                                <FollowButton userId={item.id} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <b className='text-3xl'>No result for "{search}"</b>
                                    <span>Try searching for something else or check the spelling of what you typed</span>
                                </div>
                            </>
                        }
                    </>
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

export default Search