import { useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthPages = () => {
    const [auth, setAuth] = useState<boolean>(false)

    return (
        <>
            {!auth ?
                <Login setAuth={setAuth} />
                :
                <Register setAuth={setAuth} />

            }
        </>

    )
};

export default AuthPages;
