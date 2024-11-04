import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Following from './components/Following'
import Follower from './components/Followers'

const Follows = () => {
    return (
        <div className='w-full'>
            <Tabs defaultValue="follower" className="w-full">
                <TabsList className='relative w-full mb-5'>
                    <TabsTrigger className='w-[50%] text-2xl before:origin-right' value="follower">Followers</TabsTrigger>
                    <div className="absolute z-20 w-2 h-1 bg-green-800 -bottom-2.5"></div>
                    <TabsTrigger className='w-[50%] text-2xl before:origin-left' value="following">Following</TabsTrigger>
                </TabsList>
                <TabsContent value="follower"><Follower /></TabsContent>
                <TabsContent value="following"><Following /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Follows