import { Button } from '@/components/ui/button'
import UseShowProfile from '@/lib/hooks/useShowProfile'
import { useAppSelector } from '@/lib/redux'
import { FaArrowLeft } from "react-icons/fa"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNavigate } from 'react-router-dom'
import AllThreads from './component/AllThreads'
import AllImages from './component/AllImages'

const Profile = () => {
    const { profile, fullname, follower, following, username } = useAppSelector((state) => state.auth.userLogin)
    const { handleNavigateProfile, handleNavigateNavbarOutProfile, handleShowEditProfile } = UseShowProfile()
    const navigate = useNavigate()
    return (
        <div className='w-full'>
            <div className="autoShow">

                <div className="flex items-center gap-5 py-2">
                    <FaArrowLeft className='cursor-pointer' onClick={() => {
                        navigate("/")
                        handleNavigateNavbarOutProfile()
                    }} size={20} />
                    <span className='text-2xl'>My Profile</span>
                </div>
                <div className="relative pb-4">
                    {typeof profile?.cover !== 'string' ?
                        <div className="flex items-center justify-center object-cover w-full text-4xl text-black bg-green-200 rounded-lg h-52">
                            {/* <LoadingDefault /> */}
                            <span>{username?.split("").slice(0).join("").toLocaleLowerCase()}</span>
                        </div>
                        :
                        <img src={profile?.cover} className="object-cover w-full bg-red-200 rounded-lg h-52" alt="" />
                    }
                    {typeof profile?.avatar !== 'string' ?
                        <div className="absolute flex items-center justify-center w-32 h-32 p-1 text-2xl text-black bg-green-600 rounded-full cursor-pointer -bottom-9 left-12">
                            {/* <LoadingDefault /> */}
                            <span onClick={handleNavigateProfile}>{username?.split("").slice(0, 2).join("").toLocaleLowerCase()}</span>
                        </div>
                        :
                        <img src={profile?.avatar} onClick={handleNavigateProfile} className="absolute w-32 h-32 p-1 bg-green-600 rounded-full cursor-pointer -bottom-12 left-20" alt="" />
                    }
                </div>
                <div className="flex justify-end pb-8">
                    <Button variant={"profile"} onClick={handleShowEditProfile} className='px-20'><span className="z-20 ">Edit Profile</span></Button>
                </div>
                <div className="flex flex-col gap-1 ">
                    <b className="text-3xl">{fullname}</b>
                    <span className='text-xl text-content'>@mohRyan</span>
                    {profile?.bio ?
                        <span className='text-lg'>{profile?.bio}</span>
                        :
                        <span className='text-lg'>-</span>
                    }
                </div>
                <div className="flex gap-3 text-lg">
                    <div className="flex items-center gap-2">
                        <span>{following?.length}</span>
                        <span className='text-content'>Following</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{follower?.length}</span>
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
                    <TabsContent value="allThreads"><AllThreads userLogin={true} /></TabsContent>
                    <TabsContent value="allImage"><AllImages other={false} /></TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Profile