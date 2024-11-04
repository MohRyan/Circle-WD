import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { IPropsUpdate } from './OptionPageProfile'
import { IconImagePlus } from '@/components/SVG'

export const DummyCover = [
    {
        id: "cover-1",
        cover: "https://img.freepik.com/free-vector/gradient-abstract-background_23-2149126644.jpg?size=626&ext=jpg"
    },
    {
        id: "cover-2",
        cover: "https://img.freepik.com/premium-photo/bright-abstract-waves-rainbow-celebration-flow-smoothly-generated-by-ai_188544-9530.jpg"
    },
    {
        id: "cover-3",
        cover: "https://img.freepik.com/premium-vector/colorful-abstract-background-using-minimal-geometry-as-element_49459-391.jpg"
    },
    {
        id: "cover-4",
        cover: "https://img.freepik.com/premium-vector/monochrome-leaves-background-with-monstera-plant_23-2148279176.jpg"
    },
]





export const OptionCover = ({ setValueUpdateProfile, setValueCover, valueUpdateProfile }: IPropsUpdate) => {
    const [activeCover, setActiveCover] = useState<null | string>(null)

    return (
        <div className='flex justify-center w-full py-5'>
            <div className="flex flex-wrap justify-center gap-5 px-3">
                <label className={`h-32 w-72 flex justify-center duration-500 items-center cursor-pointer bg-gray-400 hover:bg-gray-600`} htmlFor={"addImageCover"}>
                    <IconImagePlus size={30} />
                    <Input type="file" onChange={(e) => {
                        if (!e.target.files) return;
                        const cover = e.target.files
                        console.log("🚀 ~ OptionCover ~ cover:", cover)
                        setValueCover!(URL.createObjectURL(cover[0]) as string)
                        setValueUpdateProfile({ ...valueUpdateProfile!, cover: cover })

                    }} className="hidden" id={"addImageCover"} />
                </label>
                {DummyCover.map((item, index) => (
                    <label key={index} className={`cursor-pointer hover:bg-second ${activeCover === item.id ? "bg-second" : ""}`} htmlFor={item.id}>
                        <img className="object-cover h-32 w-72" src={item.cover} alt="" />
                        <Checkbox onCheckedChange={() => {
                            setActiveCover(item.id)
                            setValueCover!(item.cover)
                            setValueUpdateProfile({ ...valueUpdateProfile!, cover: item.cover })
                        }
                        } className="hidden" value={item.cover} id={item.id} />
                    </label>
                ))}
            </div>
        </div>
    )
}
