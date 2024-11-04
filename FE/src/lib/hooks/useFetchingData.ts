import { useState } from "react";
import { API } from "../api";
import axios from "axios";


const useFetchingData = async () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1")
    console.log("🚀 ~ useFetchingData ~ res:", res)

    return res
}


export default useFetchingData