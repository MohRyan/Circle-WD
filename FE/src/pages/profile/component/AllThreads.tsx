import { SkeletonThreadsCard } from '@/components/Skeleton'
import { getThreadsByUserLogin } from '@/lib/api/call/threadsProfileApi'
import { IThreads } from '@/lib/redux/type'
import { ThreadsCard } from '@/pages/Threads/components/ThreadsCard'
import { useEffect, useState } from 'react'

const AllThreads = ({ userLogin = false, otherProfile = false, thread }: { userLogin?: boolean, otherProfile?: boolean, thread?: IThreads[] | undefined }) => {
    const [dataThreads, setDataThreads] = useState<IThreads[]>([])
    const [isLoadingThreads, setIsLoadingThreads] = useState<boolean>(false)



    const getThreads = async () => {
        setIsLoadingThreads(true)
        const res = await getThreadsByUserLogin()
        setDataThreads(res.data)
        setIsLoadingThreads(false)

    }
    useEffect(() => {
        if (userLogin) {
            getThreads()
        }
    }, [])

    return (
        <>
            {
                (otherProfile ? thread?.length === 0 : dataThreads.length === 0) ?
                    <>

                        <div className="flex flex-col items-center justify-center text-2xl">
                            <b>Threads kosong !!</b>
                        </div>

                    </>
                    :
                    <div className="flex flex-col gap-7">
                        {
                            !isLoadingThreads && (
                                <>
                                    {otherProfile ?
                                        thread!.map((item, index) => {
                                            return (
                                                <ThreadsCard profile={true} item={item} key={index} />
                                            )
                                        })
                                        :
                                        dataThreads.map((item, index) => {
                                            return (
                                                <ThreadsCard profile={true} item={item} key={index} />
                                            )
                                        })
                                    }
                                </>
                            )
                        }
                        {
                            isLoadingThreads && (
                                <>
                                    <SkeletonThreadsCard />
                                    <SkeletonThreadsCard />
                                    <SkeletonThreadsCard />
                                </>
                            )
                        }
                    </div>
            }
        </>
    )
}

export default AllThreads