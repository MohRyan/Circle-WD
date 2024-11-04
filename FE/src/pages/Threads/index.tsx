import { FaArrowCircleUp } from "react-icons/fa"
import Post from "./components/Post";
import useScroll from "@/lib/hooks/useScroll";
import { useBlobArray } from "@/lib/hooks/useBlobArray";
import { ThreadsCard, ThreadsV } from "./components/ThreadsCard";
import { SkeletonThreadsCard } from "@/components/Skeleton";

// export interface IThreads {
//   content: string
//   // image: FileList | null
//   image: string[]
// }


const Threads = () => {
  const { show, lastScrollY } = useScroll()
  const { dataThreads, dataVThreads, dataThreadsPost, setDataThreadsPost, handleFileChange, handleFormThreads, handleRemoveImage, getThreads, isLoadingThreads, isLoadingButtonPost } = useBlobArray()
  // const threads = useAppSelector((state) => state.threads)
  const token = localStorage.getItem("token")



  return (
    <section id="threads" className="relative flex flex-col w-full p-5">
      {/* <div className={`fixed bottom-0 w-52 h-20 z-[999] bg-red-800 text-white p-0 transition-transform duration-300 ${show ? 'transform translate-y-20' : 'transform -translate-y-0'}`}>
      </div> */}
      {lastScrollY > 50 ?
        <div className="fixed bottom-10 flex z-[998] right-10 xl:right-96 animate-bounce">
          <a href="#threads">
            <FaArrowCircleUp size={35} className="hover:text-second" />
          </a>
        </div>
        :
        ""
      }
      {
        token ?
          <div className={`transform ${lastScrollY > 20 ? "sticky top-0 w-[100%] z-10" : "bg-first"} transition-transform duration-300 bg-first rounded-xl ${show ? "transform -translate-y-0" : ` ${lastScrollY > 20 ? "-translate-y-32" : "-translate-y-0"}`}`} id="post">
            <b>Home</b>
            <Post setDataThreadsPost={setDataThreadsPost} dataThreadsPost={dataThreadsPost} handleFileChange={handleFileChange} handleFormThreads={handleFormThreads} isLoadingButtonPost={isLoadingButtonPost} />
            <ThreadsV dataVThreads={dataVThreads} handleRemoveImage={handleRemoveImage} />
          </div>
          :
          ""
      }

      {
        dataThreads.length === 0 ?
          <div className="flex flex-col items-center justify-center text-2xl">
            {
              token ? <>
                <b>Threads masih kosong !!</b>
                <b>Silahkan Post !!</b>
              </>
                :
                <>
                  <b>Threads masih kosong !!</b>
                </>
            }
            {/* <b>{totalThreads}</b>
            <b>{dataThreads.length}</b> */}
          </div>
          :
          <div className="flex flex-col gap-7">
            {
              !isLoadingThreads && (
                <>
                  {dataThreads.map((item, index) => {
                    return (
                      <ThreadsCard item={item} key={index} getThreads={getThreads} />
                    )
                  })}
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

    </section>
  );
};

export default Threads;
