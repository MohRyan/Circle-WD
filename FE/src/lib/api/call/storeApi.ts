import { API } from "..";

export const getStore = async () => {
  const token = localStorage.getItem("token");
  const response = await API.get("/stores", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
