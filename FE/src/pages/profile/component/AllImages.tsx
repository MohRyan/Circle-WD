import { getThreadsByUserId, getThreadsByUserLogin } from "@/lib/api/call/threadsProfileApi"
import { IThreads } from "@/lib/redux/type"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const AllImages = ({ other = false }: { other: boolean }) => {
    const [dataThreads, setDataThreads] = useState<IThreads[]>([])
    console.log("🚀 ~ AllImages ~ dataThreads:", dataThreads)
    const { userId } = useParams()


    const getImage = async () => {
        if (other) {
            const res = await getThreadsByUserId(userId as string)
            return setDataThreads(res.data.thread)
        }
        const res = await getThreadsByUserLogin()
        setDataThreads(res.data)
    }
    useEffect(() => {
        getImage()
    }, [])

    return (
        <>
            <div className="flex w-full">
                {dataThreads.map((item, index) => (
                    <div className="flex" key={index} >
                        {item.image?.map((item, index) => (
                            <img src={item.image} key={index} width={700} className="object-cover" alt="" />
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default AllImages