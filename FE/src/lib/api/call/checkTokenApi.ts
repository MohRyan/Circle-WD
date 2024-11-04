import { API } from "..";

export const checkTokenCall = async () => {
    const token = localStorage.getItem("token");
    const response = await API.get("/checkToken", {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    })
    return response.data.userLogin;
};