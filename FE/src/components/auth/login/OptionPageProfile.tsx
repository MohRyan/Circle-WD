import { useAppDispatch, useAppSelector } from '@/lib/redux'
import React, { useState } from 'react'
import { OptionProfile } from "./OptionProfile";
import { OptionCover } from "./OptionCover";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { IUpdateProfilePut, updateProfileAsync } from '@/lib/redux/async/profileUpdate';
import { useCheckToken } from '@/lib/hooks/useCheckToken';

export interface IPropsUpdate {
    setValueUpdateProfile: React.Dispatch<React.SetStateAction<IUpdateProfilePut>>
    valueUpdateProfile: IUpdateProfilePut | undefined
    setValueAvatar?: React.Dispatch<React.SetStateAction<string>>
    setValueCover?: React.Dispatch<React.SetStateAction<string>>
}

const OptionPageProfile = () => {
    const { fullname } = useAppSelector((state) => state.auth.userLogin)
    const [valueUpdateProfile, setValueUpdateProfile] = useState<IUpdateProfilePut>({
        avatar: null,
        cover: null,
        bio: ""
    })
    const [valueAvatar, setValueAvatar] = useState("")
    const [valueCover, setValueCover] = useState("")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { checkToken } = useCheckToken()


    // if (profile?.avatar || profile?.cover !== null) {
    //     navigate("/")
    // }

    const handleUpdateProfile = () => {
        dispatch(updateProfileAsync(valueUpdateProfile))
        // dispatch(UPDATEPROFILE({ cover: valueCover, profile: valueProfile, name: "Moh Ryan Khalifatul Huda" }))
        navigate("/")
        checkToken();
    }
    return (
        <div className={`flex flex-col justify-center py-5 slide-in-bck-top`}>
            <div className="flex flex-col items-center justify-center gap-3">
                <b className="text-4xl">Lengkapi Profile?</b>
                <span className="text-xl">{fullname}</span>
                <div className="flex w-full gap-5 justify-evenly">
                    <div className="flex flex-col items-center gap-3">
                        <b>Foto Profile</b>
                        {valueAvatar ?
                            <img src={valueAvatar} className="object-cover w-20 h-20 rounded-full" alt="" />
                            :
                            <span className="flex items-center justify-center w-20 h-20 text-black bg-green-600 rounded-full">P</span>
                        }
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <b>Cover</b>
                        {valueCover ?
                            <img src={valueCover as string} className="object-cover h-32 rounded-lg w-72" alt="" />
                            :
                            <span className="flex items-center justify-center h-32 text-black bg-green-600 rounded-lg w-72">C</span>
                        }
                    </div>
                </div>
            </div>
            <OptionProfile setValueUpdateProfile={setValueUpdateProfile} valueUpdateProfile={valueUpdateProfile} setValueAvatar={setValueAvatar} />
            <OptionCover setValueUpdateProfile={setValueUpdateProfile} valueUpdateProfile={valueUpdateProfile} setValueCover={setValueCover} />
            <div className="flex justify-center gap-5">
                <Button className={"px-16"} variant={"batal"} onClick={() => navigate("/")}><span className="z-20 ">Skip</span></Button>
                <Button className={"px-16"} onClick={handleUpdateProfile}><span className="z-20 ">Create</span></Button>
            </div>
        </div>
    )
}

export default OptionPageProfile