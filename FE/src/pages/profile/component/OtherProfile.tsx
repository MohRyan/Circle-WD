import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getThreadsByUserId } from '@/lib/api/call/threadsProfileApi'
import UseShowProfile from '@/lib/hooks/useShowProfile'
import { IThreads } from '@/lib/redux/type'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import AllThreads from './AllThreads'
import AllImages from './AllImages'

interface OtherProfile {
    username: string,
    fullname: string,
    profile: {
        avatar: string,
        cover: string,
        bio: string
    }
    follower: [],
    following: []
    // user: {
    // },
    // thread: IThreads[]
}

const OtherProfile = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const { handleNavigateProfile, handleNavigateNavbarOutProfile, } = UseShowProfile()
    const [dataOtherProfile, setDataOtherProfile] = useState<OtherProfile>()
    const [dataThreads, setDataThreads] = useState<IThreads[]>([])

    const getOtherProfile = async () => {
        // setIsLoadingThreads(true)
        const res = await getThreadsByUserId(userId as string)
        setDataOtherProfile(res.data.user)
        setDataThreads(res.data.thread)
        // setIsLoadingThreads(false)
    }

    useEffect(() => {
        getOtherProfile()
    }, [userId])

    return (
        <div className='w-full'>
            <div className="autoShow">
                <div className="flex items-center gap-5 py-2">
                    <FaArrowLeft className='cursor-pointer' onClick={() => {
                        navigate("/")
                        handleNavigateNavbarOutProfile()
                    }} size={20} />
                    <span className='text-2xl'>{dataOtherProfile?.fullname}</span>
                </div>
                <div className="relative pb-4">
                    {typeof dataOtherProfile?.profile?.cover !== 'string' ?
                        <div className="flex items-center justify-center object-cover w-full text-4xl text-black bg-green-200 rounded-lg h-52">
                            {/* <LoadingDefault /> */}
                            <span>{dataOtherProfile?.username?.split("").slice(0).join("").toLocaleLowerCase()}</span>
                        </div>
                        :
                        <img src={dataOtherProfile?.profile?.cover} className="object-cover w-full bg-red-200 rounded-lg h-52" alt="" />
                    }
                    {typeof dataOtherProfile?.profile?.avatar !== 'string' ?
                        <div className="absolute flex items-center justify-center w-32 h-32 p-1 text-2xl text-black bg-green-600 rounded-full cursor-pointer -bottom-9 left-12">
                            {/* <LoadingDefault /> */}
                            <span onClick={handleNavigateProfile}>{dataOtherProfile?.username.split("").slice(0, 2).join("").toLocaleLowerCase()}</span>
                        </div>
                        :
                        <img src={dataOtherProfile?.profile?.avatar} onClick={handleNavigateProfile} className="absolute w-32 h-32 p-1 bg-green-600 rounded-full cursor-pointer -bottom-12 left-20" alt="" />
                    }
                </div>
                <div className="flex justify-end pb-8">
                    <Button variant={"profile"} className='px-20'><span className="z-20 ">Edit Profile</span></Button>
                </div>
                <div className="flex flex-col gap-1 ">
                    <b className="text-3xl">{dataOtherProfile?.fullname}</b>
                    <span className='text-xl text-content'>@{dataOtherProfile?.username}</span>
                    <span className='text-lg'>{dataOtherProfile?.profile.bio}</span>
                </div>
                <div className="flex gap-3 text-lg">
                    <div className="flex items-center gap-2">
                        <span>{dataOtherProfile?.following?.length}</span>
                        <span className='text-content'>Following</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{dataOtherProfile?.follower?.length}</span>
                        <span className='text-content'>Followers</span>
                    </div>
                </div>
            </div>
            <div className="pt-5 autoShow1">
                <Tabs defaultValue="allThreads" className="w-full">
                    <TabsList className='relative w-full mb-5'>
                        <TabsTrigger className='w-[50%] text-2xl before:origin-right' value="allThreads">All Threads</TabsTrigger>
                        <div className="absolute z-20 w-2 h-1 bg-green-800 -bottom-2.5"></div>
                        <TabsTrigger className='w-[50%] text-2xl before:origin-left' value="allImage">Images</TabsTrigger>
                    </TabsList>
                    <TabsContent value="allThreads"><AllThreads otherProfile={true} thread={dataThreads} /></TabsContent>
                    <TabsContent value="allImage"><AllImages other={true} /></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default OtherProfile