
export const SkeletonThreadsCard = () => {
    return (
        <div className="flex flex-col justify-between gap-3 pr-5 text-gray-300 animate-pulse">
            <div className='flex gap-4'>
                <div className='w-12 h-12 rounded-full bg-slate-300' />
                <div className='flex flex-col gap-2'>
                    <b className='h-8 rounded-lg bg-slate-300 w-72'></b>
                    <span className='w-40 h-8 rounded-lg bg-slate-300'></span>
                    <span className="flex h-16 py-5 bg-slate-300 rounded-lg w-[550px]">
                    </span>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='flex flex-col justify-center gap-2 bg-slate-300 rounded-lg h-52 w-[650px]'>
                </div>
            </div>
        </div>
    )
}

export const SkeletonUsers = () => {
    return (
        <div className="flex flex-col justify-between gap-3 pr-5 text-gray-300 animate-pulse">
            <div className='flex gap-4'>
                <div className='w-12 h-12 rounded-full bg-slate-300' />
                <div className='flex flex-col gap-2'>
                    <b className='w-32 h-6 rounded-lg bg-slate-300'></b>
                    <b className='w-32 h-6 rounded-lg bg-slate-300'></b>
                </div>
            </div>
        </div>
    )
}
