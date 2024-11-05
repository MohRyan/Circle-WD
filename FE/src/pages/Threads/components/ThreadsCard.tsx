import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useAppSelector } from '@/lib/redux'
import { IThreads } from '@/lib/redux/type'
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { FaTrash } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { IconComment, IconProfileUser } from '@/components/SVG'
import LikeButton from './LikeButton'
import "./Like.css"
import { Link } from 'react-router-dom'
import { handleDeleteThreads } from '@/lib/api/call/threadsProfileApi'

export interface IThreadsV {
    // user: IUser
    content: string
    // image: FileList | null
    image: string[]
}

interface IProps {
    dataVThreads: IThreadsV
    handleRemoveImage: (index: number) => void
}



export const ThreadsCard = ({ item, profile, getThreads }: { item: IThreads, profile?: boolean, getThreads?: () => void }) => {
    const { id } = useAppSelector((state) => state.auth.userLogin)
    const token = localStorage.getItem("token")


    const handleDelete = async () => {
        await handleDeleteThreads(item.id).then(() => {
            getThreads!()
            alert("berhasil Delete")
        })
            .catch(() => {
                alert("gagal>>>")
            })
    }
    const getDate = item.createdAt?.split("T")[0].split("-").reverse().join(" - ")

    return (
        <div className={`flex flex-col px-5 hover:border-green-500 pt-4 ${profile ? "border-b-2 pb-4" : "border-t-2"} rounded-[50px] border-content`}>
            <div className="flex justify-between pr-5">
                <div className='flex gap-4'>
                    <Link to={item.author.id !== id ? `profile/${item.author.id}` : "myProfile"}>
                        {item.author.profile?.avatar ?
                            <img src={item.author.profile?.avatar} className='w-12 h-12 rounded-full' alt="" />
                            :
                            <IconProfileUser className='w-12 h-12 rounded-full' />
                        }
                    </Link>
                    <div className='flex flex-col'>
                        <div className="flex gap-5">
                            <b>{item.author.fullname}</b>
                            <span className='text-content'>{getDate}</span>
                        </div>
                        <span className='text-content'>@{item.author.username}</span>
                    </div>
                </div>
                {
                    token ?
                        <div className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <HiOutlineMenuAlt3 size={24} className='text-white' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Setting</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='flex gap-2 hover:bg-gray-400'>
                                        <MdEdit />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='flex gap-2 hover:bg-gray-400' onClick={handleDelete}><FaTrash />Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </div>
                        :
                        ""
                }
            </div>
            <div className="flex px-16 py-5">
                <p>{item.content}</p>
            </div>
            <div className="flex justify-center">
                <Carousel className='w-[796px] '>
                    <CarouselContent>
                        {item.image?.map((item, index) => (
                            <CarouselItem key={index} className='relative flex justify-center h-96'>
                                <img src={item.image} className='object-contain h-96' alt="" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {item.image?.length! < 2 ?
                        ""
                        :
                        <>
                            <CarouselPrevious className='text-black' />
                            <CarouselNext className='text-black' />
                        </>
                    }
                </Carousel>
            </div>
            {
                token ?
                    <div className='flex items-center gap-5'>
                        <LikeButton threadId={item.id} />
                        <IconComment className='cursor-pointer reply_animation' size={20} />
                    </div>
                    :
                    ""
            }
        </div>
    )
}


export const ThreadsV = ({ dataVThreads, handleRemoveImage }: IProps) => {
    return (
        <div className={`gap-5 pb-5 mb-5 border-b-2 justify-center ${dataVThreads.image.length > 0 ? "border-content flex" : "hidden"}`}>
            {dataVThreads.image.map((item, index) => (
                <div key={index} className='relative'>
                    <img src={item} className='h-52' alt="" />
                    <Button size={"icon"} variant={"rounded"} onClick={() => handleRemoveImage(index)} className='absolute px-0 rounded-full w-7 h-7 top-2 right-2'><span className='z-20'>X</span></Button>
                </div>
            ))}
        </div>
    )
}

