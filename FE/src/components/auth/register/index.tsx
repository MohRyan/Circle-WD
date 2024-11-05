import { LoadingDefault } from "@/components/SVG";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { API } from "@/lib/api";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { day, hours, minutes, month, setDay, setMonth, year } from "../login";

export interface IUser {
    fullname: string
    username: string
    email?: string
    password?: string
}

const Register = ({ setAuth }: { setAuth: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [dataRegister, setDataRegister] = useState<IUser>({
        fullname: "",
        username: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    console.log("🚀 ~ Register ~ isError:", isError)
    // const [error, setError] = useState<string>("")

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setIsError(true)
        await API.post("/register", dataRegister)
            .then(() => {
                setIsLoading(false)
                toast({
                    title: "Register Successfully....",
                    description: `${setDay[day]}, ${setMonth[month]} ${month}, ${year} at ${hours}:${minutes}`,
                })

                setAuth(false)
            })
            .catch(() => {
                setDataRegister({
                    fullname: "",
                    username: "",
                    email: "",
                    password: ""
                })
                setIsLoading(false)
                toast({
                    variant: "destructive",
                    title: "Register UnSuccessfully....",
                    description: `${setDay[day]}, ${setMonth[month]} ${month}, ${year} at ${hours}:${minutes}`,
                })
            })

    }


    return (
        <div className="flex justify-center w-full h-screen text-white ">
            <div className="flex flex-col justify-center gap-3 autoShow">
                <b className="text-[100px] logo_font text-second">Circle</b>
                <span className="text-3xl">Create New Account ?</span>
                <form action="" onSubmit={handleRegister} className="w-[350px]">
                    <div className='flex flex-col gap-5 '>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullname">Full Name</label>
                            <Input placeholder='Your full name' id="fullname" onChange={(e) => setDataRegister({ ...dataRegister, fullname: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <Input placeholder='Your username' id="username" onChange={(e) => setDataRegister({ ...dataRegister, username: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="emailR">Email Address</label>
                            <Input placeholder='Your email address' id="emailR" onChange={(e) => setDataRegister({ ...dataRegister, email: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="passwordR">Password</label>
                            <Input type={showPassword ? "text" : "password"} id="passwordR" placeholder='Your password' onChange={(e) => setDataRegister({ ...dataRegister, password: e.target.value })} />
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
                        {/* <Button className={"px-16"} onClick={handleLogin}>Login</Button> */}

                        {
                            !isLoading && (
                                <Button className={""} type="submit"><span className="z-20">Create</span></Button>
                            )
                        }
                        {
                            isLoading && (
                                <Button className={"before:bg-white before:scale-x-100"} disabled type="submit"><span className="z-20 flex gap-2 text-black"><LoadingDefault /> <span>Loading.......</span></span></Button>
                            )
                        }
                        <span className='text-end'>Dont' have an account? <b className='text-blue-500 cursor-pointer' onClick={() => setAuth(false)}>Login</b></span>
                    </div>
                </form>

            </div>
            {/* <div className="flex w-[50%]">
                <span className="text-2xl">Register</span>
            </div> */}
        </div>
    )
}

export default Register