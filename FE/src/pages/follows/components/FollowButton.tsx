import NewtonLoader from '@/components/loaders/NewtonLoader'
import { Button } from '@/components/ui/button'
// import { getThreadsByUserId } from '@/lib/api/call/threadsProfileApi'
import { useCheckToken } from '@/lib/hooks/useCheckToken'
import { useAppDispatch, useAppSelector } from '@/lib/redux'
import { fetchFollowStatus, handleFollow } from '@/lib/redux/async/followStatus'
import { useEffect } from 'react'

const FollowButton = ({ userId }: { userId: string }) => {
    const dispatch = useAppDispatch()
    const { followStatus, isLoadingButton } = useAppSelector((state) => state.followStat.users[userId] || {})
    const { checkToken } = useCheckToken()


    const handleStatus = () => {
        dispatch(fetchFollowStatus(userId))
    }

    const handleFollowClick = () => {
        dispatch(handleFollow(userId)).then(() => {
            checkToken()
        });
    };

    useEffect(() => {
        handleStatus()
    }, [dispatch, userId])

    return (
        <>
            <Button onClick={handleFollowClick} variant={followStatus ? "unFollow" : "profile"}>
                {!isLoadingButton && (
                    <span className='z-20'>{followStatus ? "UnFollow" : "Follow"}</span>
                )}
                {isLoadingButton && <NewtonLoader />}
            </Button>
            {/* {
                !isLoading && (
                )
            }
            {
                isLoading && (
                    <div className="flex justify-center text-3xl text-white">
                        <NewtonLoader />
                    </div>
                )
            } */}
        </>
    )
}

export default FollowButton