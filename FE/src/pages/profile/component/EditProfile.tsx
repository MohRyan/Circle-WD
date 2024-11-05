import { DummyCover } from '@/components/auth/login/OptionCover'
import { DummyProfile } from '@/components/auth/login/OptionProfile'
import { IconImagePlus } from '@/components/SVG'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import UseShowProfile from '@/lib/hooks/useShowProfile'
import { useAppSelector } from '@/lib/redux'
import { IUpdateAllProfilePut } from '@/lib/redux/async/profileUpdate'
import { useState } from 'react'
import FormEditAllProfile from './FormEditAllProfile'

const EditProfile = () => {
    const { profile, fullname, username } = useAppSelector((state) => state.auth.userLogin)
    // const { editProfile, handleNavigateProfile, handleNavigateNavbarOutProfile, handleOutEditProfile } = UseShowProfile()
    const { editProfile, handleNavigateProfile, handleOutEditProfile } = UseShowProfile()
    const [valueAvatar, setValueAvatar] = useState("")
    const [valueCover, setValueCover] = useState("")
    const [valueUpdateAllProfile, setValueUpdateAllProfile] = useState<IUpdateAllProfilePut>({
        username: "",
        fullname: "",
        avatar: null,
        cover: null,
        bio: ""
    })


    return (
        <>
            {!editProfile ?
                ""
                :
                <div className={`w-screen h-screen fixed z-[999] autoClose`}>
                    <div className='absolute z-10 w-full h-full bg-first opacity-60' onClick={handleOutEditProfile}>
                    </div>
                    <div className="absolute flex items-center justify-center w-full h-full ">
                        <div className="z-20 flex flex-col w-1/2 text-white rounded-lg p-7 bg-third">
                            <div className="relative pb-4">
                                <div className="relative">
                                    <Carousel className='absolute flex items-center justify-center h-16 duration-300 rounded-lg cursor-pointer w-36 right-5 bottom-5 bg-first hover:bg-gray-700'>
                                        <CarouselContent>
                                            <CarouselItem>
                                                <label className={`w-full flex justify-center items-center h-full rounded-full cursor-ew-resize`} htmlFor={"addImageCover"}>
                                                    <IconImagePlus className='cursor-pointer' size={30} />
                                                    <Input type="file" onChange={(e) => {
                                                        if (!e.target.files) return;
                                                        const cover = e.target.files
                                                        setValueCover!(URL.createObjectURL(cover[0]) as string)
                                                        setValueUpdateAllProfile({ ...valueUpdateAllProfile!, cover: cover })

                                                    }} className="hidden" id={"addImageCover"} />
                                                </label>

                                            </CarouselItem>
                                            {DummyCover.map((item, index) => (
                                                <CarouselItem className='' key={index}>
                                                    <label className={`w-full flex justify-center items-center h-full rounded-full active:cursor-pointer hover:cursor-ew-resize`} htmlFor={item.id}>
                                                        <img className="object-cover w-32 h-12 rounded-lg" src={item.cover} alt="" />
                                                        <Checkbox onCheckedChange={() => {
                                                            // setActive(index)
                                                            setValueCover!(item.cover)
                                                            setValueUpdateAllProfile({ ...valueUpdateAllProfile!, cover: item.cover })
                                                        }
                                                        } className="hidden" value={item.cover} id={item.id} />
                                                    </label>
                                                </CarouselItem>
                                            ))}

                                        </CarouselContent>
                                    </Carousel>
                                    {typeof profile?.cover !== 'string' ?
                                        <>
                                            {valueCover !== "" ?
                                                <img src={valueCover} className="object-cover w-full bg-red-200 rounded-lg h-52" alt="" />

                                                :
                                                <div className="flex items-center justify-center object-cover w-full text-6xl bg-red-200 rounded-lg h-52">
                                                    <span>{username?.split("").slice(0).join("").toLocaleLowerCase()}</span>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                            {valueCover !== "" ?
                                                <img src={valueCover} className="object-cover w-full bg-red-200 rounded-lg h-52" alt="" />

                                                :
                                                <img src={profile?.cover} className="object-cover w-full bg-red-200 rounded-lg h-52" alt="" />
                                            }
                                        </>
                                    }
                                </div>

                                <div className="relative w-40 ">
                                    <Carousel className='absolute z-10 flex items-center justify-center duration-300 rounded-full cursor-pointer w-14 h-14 -right-3 bg-first hover:bg-gray-700'>
                                        <CarouselContent>
                                            <CarouselItem>
                                                <label className={`w-full flex justify-center items-center h-full rounded-full cursor-ew-resize`} htmlFor={"addImageAvatar"}>
                                                    <IconImagePlus className='cursor-pointer' size={30} />
                                                    <Input type="file" onChange={(e) => {
                                                        if (!e.target.files) return;
                                                        const avatar = e.target.files
                                                        setValueAvatar!(URL.createObjectURL(avatar[0]) as string)
                                                        setValueUpdateAllProfile({ ...valueUpdateAllProfile!, avatar: avatar })

                                                    }} className="hidden" id={"addImageAvatar"} />
                                                </label>
                                            </CarouselItem>
                                            {DummyProfile.map((item, index) => (
                                                <CarouselItem className='' key={index}>
                                                    <label className={`w-full flex justify-center items-center h-full rounded-full cursor-ew-resize`} htmlFor={String(index)}>
                                                        <img className="w-11" src={item.avatar} alt="" />
                                                        <Checkbox onCheckedChange={() => {
                                                            // setActive(index)
                                                            setValueAvatar!(item.avatar)
                                                            setValueUpdateAllProfile({ ...valueUpdateAllProfile!, avatar: item.avatar })
                                                        }
                                                        } className="hidden" value={item.avatar} id={String(index)} />
                                                    </label>
                                                </CarouselItem>
                                            ))}

                                        </CarouselContent>
                                    </Carousel>
                                    {typeof profile?.avatar !== 'string' ?
                                        <>
                                            {valueAvatar !== "" ?
                                                <img src={valueAvatar} className="absolute w-32 h-32 p-1 bg-green-600 rounded-full cursor-pointer -bottom-12 left-20" alt="" />

                                                :
                                                <div className="absolute flex items-center justify-center object-cover w-32 h-32 p-1 text-4xl bg-green-600 rounded-full cursor-pointer -bottom-12 left-20">
                                                    {/* <LoadingDefault /> */}
                                                    <span onClick={handleNavigateProfile}>{username?.split("").slice(0, 2).join("").toLocaleLowerCase()}</span>
                                                </div>
                                            }
                                        </>
                                        :
                                        <>
                                            {valueAvatar !== "" ?
                                                <img src={valueAvatar} className="absolute w-32 h-32 p-1 bg-green-600 rounded-full cursor-pointer -bottom-12 left-20" alt="" />

                                                :
                                                <img src={profile?.avatar} onClick={handleNavigateProfile} className="absolute w-32 h-32 p-1 bg-green-600 rounded-full cursor-pointer -bottom-12 left-20" alt="" />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="flex justify-end gap-5 pb-8">
                                <Button variant={"batal"} onClick={() => {
                                    setValueAvatar("")
                                    setValueCover("")
                                }} className={`px-14 duration-300 ${(valueAvatar || valueCover) === "" ? "disabled:cursor-not-allowed" : ""}`} disabled={(valueAvatar || valueCover) === "" ? true : false}><span className="z-20 ">Batalkan</span></Button>
                                <Button variant={"default"} onClick={() => {
                                    setValueAvatar("")
                                    setValueCover("")
                                }} className={`px-14 duration-300 ${(valueAvatar || valueCover) === "" ? "disabled:cursor-not-allowed" : ""}`} disabled={(valueAvatar || valueCover) === "" ? true : false}><span className="z-20 ">Save</span></Button>
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <b className="text-3xl">{fullname}</b>
                                <span className='text-xl text-content'>@{username}</span>
                                <span className='text-lg'>{profile?.bio}</span>
                            </div>
                            {/* =============== Batas Form */}
                            {/* <FormEditAllProfile setValueUpdateAllProfile={setValueUpdateAllProfile} valueUpdateAllProfile={valueUpdateAllProfile} /> */}
                            <FormEditAllProfile />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile