import Footer from "@/components/footer";
import Navbar from "@/components/nav/Navbar";
import NavMobile from "@/components/nav/Navbar/NavMobile";
import StatusProject from "@/components/StatusProject";
import { Toaster } from "@/components/ui/sonner"
import { useCheckToken } from "@/lib/hooks/useCheckToken";
import EditProfile from "@/pages/profile/component/EditProfile";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector("nav");
    header?.classList.toggle("navFixed", this.window.scrollY > 0);
  });

  const { checkToken } = useCheckToken()
  const token = localStorage.getItem("token");


  if (token) {
    useEffect(() => {
      checkToken();
    }, []);
  }




  return (
    <>
      <div className="flex justify-between bg-first before_screen transisi_right">
        <StatusProject responsive={true} dummy={false} real={true} />
        <Toaster position="top-right" />
        <EditProfile />
        <div className="hidden w-80 lg:flex">
          <Navbar />
        </div>
        <div className="fixed bottom-0 z-50 flex lg:hidden">
          <NavMobile />
        </div>
        <div className="flex justify-start w-full h-screen p-5 px-5 text-white ">
          <Outlet />
        </div>
        {/* <div className="flex">
      </div> */}
        <div className="xl:w-[500px]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
