import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { LuImagePlus } from "react-icons/lu"
import { IPropsUpdate } from "./OptionPageProfile"

export const DummyProfile = [
    {
        avatar: "https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/128/4140/4140047.png"
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/128/4139/4139981.png"
    },
    {
        avatar: "https://cdn-icons-png.flaticon.com/128/4140/4140051.png"
    },
]


export const OptionProfile = ({ setValueUpdateProfile, setValueAvatar, valueUpdateProfile }: IPropsUpdate) => {
    const [active, setActive] = useState<null | number>(null)
    return (
        <div className='flex justify-center w-full py-5'>
            <div className="flex gap-5">
                <label className={`w-20 h-20 p-2 flex justify-center duration-500 items-center rounded-full cursor-pointer bg-gray-400 hover:bg-gray-600`} htmlFor={"addProfile"}>
                    <LuImagePlus size={30} />
                    <Input type="file" onChange={(e) => {
                        if (!e.target.files) return;
                        const avatar = e.target.files
                        console.log("🚀 ~ OptionProfile ~ avatar:", avatar)
                        setValueAvatar!(URL.createObjectURL(avatar[0]))
                        setValueUpdateProfile({ ...valueUpdateProfile!, avatar: avatar })
                    }} className="hidden" id={"addProfile"} />
                </label>
                {DummyProfile.map((item, index) => (
                    <label key={index} className={`w-20 h-20 p-2 rounded-full cursor-pointer hover:bg-second ${active === index ? "bg-second" : ""}`} htmlFor={String(index)}>
                        <img className="w-full h-full" src={item.avatar} alt="" />
                        <Checkbox onCheckedChange={() => {
                            setActive(index)
                            setValueAvatar!(item.avatar)
                            setValueUpdateProfile({ ...valueUpdateProfile!, avatar: item.avatar })
                        }
                        } className="hidden" value={item.avatar} id={String(index)} />
                    </label>
                ))}
            </div>
        </div>
    )
}
