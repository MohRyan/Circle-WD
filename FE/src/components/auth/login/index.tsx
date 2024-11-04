import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/redux";
import { LOGIN } from "@/lib/redux/slice/auth";
import { toast } from "@/components/ui/use-toast";
import { API } from "@/lib/api";
import { LoadingDefault } from "@/components/SVG";
import OptionPageProfile from "./OptionPageProfile";


const Login = ({ setAuth }: { setAuth: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [coba, setCoba] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const { token } = useAppSelector((state) => state.auth)
    // const { fullname, profile } = useAppSelector((state) => state.auth.user)

    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await API.post("/login", dataLogin)
            setIsLoading(false)
            toast({
                title: "Login Successfully....",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })
            dispatch(LOGIN(res.data))
            setCoba(true)
        } catch (error) {
            setIsLoading(false)
            toast({
                variant: "destructive",
                title: "Login UnSuccessfully....",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })

        }

    }


    return (
        <div className="flex justify-center h-screen text-white ">
            {coba ?
                <div className=""></div>
                :
                <div className={`flex flex-col justify-center gap-3 autoShow`}>
                    <b className="text-[100px] logo_font text-second">Circle</b>
                    <span className="text-4xl">Login</span>
                    <form action="" onSubmit={handleLogin} className="w-[350px]">
                        <div className='flex flex-col gap-5'>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email Address</label>
                                <Input id="email" placeholder='Your email address' onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Password</label>
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder='Your password' onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
                                {showPassword ?
                                    <span className="flex justify-end cursor-pointer" onClick={() => setShowPassword(false)}>Hide Password?</span>
                                    :
                                    <span className="flex justify-end cursor-pointer" onClick={() => setShowPassword(true)}>Show Password?</span>
                                }
                            </div>
                            <div className="flex items-center justify-between">
                                <div className='flex items-center gap-1'>
                                    <Checkbox className="border-white" id="remember" />
                                    <Label htmlFor='remember'>Remember Me?</Label>
                                </div>
                                <Link to={"/forgot-password"} className='hover:text-gray-400'>
                                    Forgot Password?
                                </Link>
                            </div>
                            {
                                !isLoading && (
                                    <Button type="submit" className={`px-16`} ><span className="z-20 ">Login</span></Button>
                                )
                            }
                            {
                                isLoading && (
                                    <Button type="submit" className={"before:bg-white before:scale-x-100"} disabled><span className="z-20 flex gap-2 text-black"><LoadingDefault /> <span>Loading.......</span></span></Button>
                                )
                            }

                            <span className='text-end'>Dont' have an account? <b className='text-blue-500 cursor-pointer' onClick={() => setAuth(token ? false : true)}>Register</b></span>
                        </div>
                    </form>

                </div>
            }

            {!token ?
                <div className="">
                    <span className="text-5xl"></span>
                </div>
                :
                <OptionPageProfile />
            }
        </div>
    )
}

export default Login