import { Button } from "../ui/button";
import { useAppSelector } from '@/lib/redux';
import UseShowProfile from '@/lib/hooks/useShowProfile';


const MyProfileFooter = () => {
    const { profile, fullname, username, follower, following } = useAppSelector((state) => state.auth.userLogin)
    const { navProfile, handleNavigateProfile, handleShowEditProfile } = UseShowProfile()


    return (
        <>
            {!navProfile ? "" :
                <div className="flex flex-col w-full gap-2 p-4 rounded-md bg-third autoShowTop">
                    <span className='text-xl'>My Profile</span>
                    <div className="relative">
                        {typeof profile?.cover !== 'string' ?
                            <div className="flex items-center justify-center object-cover w-full h-20 text-4xl text-black bg-green-200 rounded-lg">
                                {/* <LoadingDefault /> */}
                                <span>{username?.split("").slice(0).join("").toLocaleLowerCase()}</span>
                            </div>
                            :
                            <img src={profile?.cover} className="object-cover w-full h-20 bg-red-200 rounded-lg" alt="" />
                        }
                        {typeof profile?.avatar !== 'string' ?
                            <div className="absolute flex items-center justify-center w-16 h-16 p-1 text-2xl text-black bg-gray-600 rounded-full cursor-pointer -bottom-9 left-6">
                                {/* <LoadingDefault /> */}
                                <span onClick={handleNavigateProfile}>{username?.split("").slice(0, 2).join("").toLocaleLowerCase()}</span>
                            </div>
                            :
                            <img src={profile?.avatar} onClick={handleNavigateProfile} className="absolute w-16 h-16 p-1 bg-green-600 rounded-full cursor-pointer -bottom-9 left-6" alt="" />
                        }

                    </div>
                    <div className="flex justify-end py-1">
                        <Button variant={"profile"} onClick={handleShowEditProfile}><span className="z-20 ">Edit Profile</span></Button>
                    </div>
                    <div className="flex flex-col gap-1 text-content">
                        <span className="text-white">{fullname}</span>
                        <span>@{username}</span>
                        {profile?.bio ?
                            <span className='text-lg'>{profile?.bio}</span>
                            :
                            <span className='text-lg'>-</span>
                        }
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                            <span>{following?.length}</span>
                            <span>Following</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>{follower?.length}</span>
                            <span>Followers</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MyProfileFooter