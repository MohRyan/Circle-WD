import MyProfileFooter from "./MyProfileFooter";
import Suggested from "./Suggested";
import Develop from "./Develop";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  return (
    <>
      <div className="fixed flex flex-col xl:w-[21%] 2xl:w-[19%] h-screen gap-4 px-5 py-5 text-white border-l border-content text-md">
        {token ?
          <>
            <MyProfileFooter />
            <Suggested />
            <Develop />
          </>
          :
          <>
            <div className="flex justify-center">
              <Button className="px-24 rounded-lg " onClick={() => navigate("/auth")}><span className="z-20 ">Login</span></Button>
            </div>
            <Develop />
          </>
        }
      </div>
    </>
  )
};

export default Footer;
