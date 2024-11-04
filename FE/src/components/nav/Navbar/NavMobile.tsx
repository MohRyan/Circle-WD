import { IconHomeUser, IconLogout, IconLove, IconProfileUser, IconSearchUser } from "@/components/SVG"
import useScroll from "@/lib/hooks/useScroll";
import UseShowProfile from "@/lib/hooks/useShowProfile"
import { useAppDispatch } from "@/lib/redux";
import { LOGOUT } from "@/lib/redux/slice/auth";
import { NavLink, useNavigate } from "react-router-dom";





const NavMobile = () => {
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
    const { show, lastScrollY } = useScroll()

    return (
        <>
            <div className={`transform p-2 bg-gray-400 w-screen items-center flex ${lastScrollY > 20 ? "sticky -top-0 w-[100%] z-10" : "bg-first"} transition-transform duration-300 bg-first ${show ? "transform translate-y-20" : ` ${lastScrollY > 20 ? "-translate-y-0" : "translate-y-0"}`}`}>
                <b className="text-5xl logo_font">Circle</b>
                {token ?
                    <>
                        <div className="flex items-center w-full gap-5 text-3xl justify-evenly">
                            {dataNav.map((item, index) => (
                                <NavLink
                                    to={item.link}
                                    key={index}
                                    onClick={item.propsProfile}
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "font-bold text-second text-3xl  pl-2 duration-300" : "hover:font-bold hover:text-second hover:text-4xl  duration-300"
                                    }
                                >
                                    <div key={index} className="flex w-[90%] items-center gap-4">
                                        <span>{item.icon}</span>
                                    </div>
                                </NavLink>
                            ))}
                            <div onClick={handleLogout} className="flex items-center text-3xl duration-500 cursor-pointer hover:text-second hover:text-4xl">
                                <IconLogout />
                            </div>
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
        </>

    )
}

export default NavMobile