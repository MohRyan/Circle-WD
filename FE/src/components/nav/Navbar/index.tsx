import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/lib/redux";
import { LOGOUT } from "@/lib/redux/slice/auth";
import UseShowProfile from "@/lib/hooks/useShowProfile";
import { IconHomeUser, IconLogout, IconLove, IconProfileUser, IconSearchUser } from "@/components/SVG";



const Navbar = () => {
  // const { token } = useAppSelector((state) => state.auth)
  const token = localStorage.getItem("token")
  const { handleNavigateNavbarOutProfile, handleNavigateNavbarProfile } = UseShowProfile()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(LOGOUT())
    handleNavigateNavbarOutProfile()
    navigate("/auth")
  }

  const dataNav = [
    {
      title: "Home",
      icon: <IconHomeUser />,
      link: "/",
      propsProfile: handleNavigateNavbarOutProfile
    },
    {
      title: "Search",
      icon: <IconSearchUser />,
      link: "/search",
      propsProfile: handleNavigateNavbarOutProfile
    },
    {
      title: "Follows",
      icon: <IconLove />,
      link: "/follows",
      propsProfile: handleNavigateNavbarOutProfile
    },
    {
      title: "Profile",
      icon: <IconProfileUser />,
      link: "/myProfile",
      propsProfile: handleNavigateNavbarProfile
    },

  ]

  return (
    <div className="fixed flex flex-col justify-between h-screen gap-2 p-10 text-white border-r border-content xl:px-10 px-14 ">
      {token ?
        <>
          <div className="flex flex-col gap-5 text-xl">
            <b className="text-5xl logo_font text-second">Circle</b>
            {dataNav.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                onClick={item.propsProfile}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "font-bold text-second text-2xl border-l-2 border-second pl-2 duration-300" : "hover:font-bold hover:text-second hover:text-2xl hover:border-l-2 hover:border-second hover:pl-2 duration-300"
                }
              >
                <div key={index} className="flex w-[90%] items-center gap-4">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
              </NavLink>
            ))}
          </div>
          <div onClick={handleLogout} className="flex items-center gap-2 text-xl duration-500 cursor-pointer hover:text-second hover:text-2xl">
            <IconLogout />
            <span className="">LogOut</span>
          </div>
        </>
        :
        <>
          <div className="flex flex-col gap-5 text-xl">
            <b className="text-5xl logo_font text-second ">Circle</b>
          </div>
        </>
      }
    </div>
  );
};

export default Navbar;
