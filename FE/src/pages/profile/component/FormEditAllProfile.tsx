import { IconChecklistCircle, IconGembokKebuka, IconGembokTerkunci, IconXCircle } from '@/components/SVG'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/lib/redux'
import { IUpdateAllProfilePut } from '@/lib/redux/async/profileUpdate'
import React, { useEffect, useState } from 'react'

export interface IPropsUpdateAllProfile {
    setValueUpdateAllProfile: React.Dispatch<React.SetStateAction<IUpdateAllProfilePut>>
    valueUpdateAllProfile: IUpdateAllProfilePut | undefined
}

// const FormEditAllProfile = ({ setValueUpdateAllProfile, valueUpdateAllProfile }: IPropsUpdateAllProfile) => {
const FormEditAllProfile = () => {
    const { profile, fullname, username } = useAppSelector((state) => state.auth.userLogin)
    const [defaultValue, setDefaultValue] = useState({
        bio: profile?.bio,
        fullname,
        username
    });
    const [bio, setBio] = useState<string>("");
    const [DFullname, setDFullname] = useState<string>("");
    const [DUsername, setDUsername] = useState<string>("");
    // setValueUpdateAllProfile({ ...valueUpdateAllProfile!, bio: e.target.value })
    useEffect(() => {
        if (profile?.bio) {
            setBio(defaultValue.bio!);
        }
        if (fullname) {
            setDFullname(defaultValue.fullname!);
        }
        if (username) {
            setDUsername(defaultValue.username!);
        }
    }, [profile, fullname, username]);

    return (
        <form action="">
            <div className='flex flex-col gap-5 py-5'>
                <div className='relative'>
                    <label htmlFor="fullname">Full Name</label>
                    <div className="flex items-center gap-5">
                        <Input placeholder='Your full name' id="fullname" className='w-full duration-300' value={DFullname} onChange={(e) => setDFullname(e.target.value)} />
                        <div className={`flex transition-width duration-1000 ease-in z-20 ${DFullname !== defaultValue.fullname ? 'px-10 delay-700' : 'opacity-0 px-0'} gap-5`}>
                            <IconChecklistCircle size={40} onClick={() => {
                                setDefaultValue({ ...defaultValue, fullname: DFullname })
                            }} className='duration-500 hover:text-green-500 active:text-green-700' />
                            <IconXCircle onClick={() => setDFullname(defaultValue.fullname!)} className='duration-500 rounded-full cursor-pointer bg-first hover:text-red-500 active:text-red-700' size={40} />
                        </div>
                        <div className={`absolute right-10 z-0 ${DFullname !== defaultValue.fullname ? 'delay-500' : 'opacity-100'}`}>
                            {DFullname !== defaultValue.fullname ?
                                <IconGembokKebuka size={40} />
                                :
                                <IconGembokTerkunci size={40} />
                            }
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <label htmlFor="username">Username</label>
                    <div className="flex items-center gap-5">
                        <Input placeholder='Your username' id="username" value={DUsername} onChange={(e) => setDUsername(e.target.value)} />
                        <div className={`flex transition-width duration-1000 ease-in z-20 ${DUsername !== defaultValue.username ? 'px-10 delay-700' : 'opacity-0 px-0'} gap-5`}>
                            <IconChecklistCircle size={40} />
                            <IconXCircle onClick={() => setDUsername(defaultValue.username!)} className='duration-500 rounded-full cursor-pointer bg-first hover:text-red-500 active:text-red-700' size={40} />
                        </div>
                        <div className={`absolute right-10 z-0 ${DUsername !== defaultValue.username ? 'delay-500' : 'opacity-100'}`}>
                            {DUsername !== defaultValue.username ?
                                <IconGembokKebuka size={40} />
                                :
                                <IconGembokTerkunci size={40} />
                            }
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <label htmlFor="bio">Bio</label>
                    <div className="flex items-center gap-5">
                        <Textarea maxLength={50} className='text-black max-h-28' placeholder={bio !== "" ? bio : "Update your bio"} value={bio} id="bio" onChange={(e) => setBio(e.target.value)} />
                        <div className={`flex transition-width duration-1000 ease-in z-20 ${bio !== defaultValue.bio ? 'px-10 delay-700' : 'opacity-0 px-0'} gap-5`}>
                            <IconChecklistCircle size={40} />
                            <IconXCircle onClick={() => setBio(defaultValue.bio!)} className='duration-500 rounded-full cursor-pointer bg-first hover:text-red-500 active:text-red-700' size={40} />
                        </div>
                        <div className={`absolute right-10 z-0 ${bio !== defaultValue.bio ? 'delay-500' : 'opacity-100'}`}>
                            {bio !== defaultValue.bio ?
                                <IconGembokKebuka size={40} />
                                :
                                <IconGembokTerkunci size={40} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormEditAllProfile