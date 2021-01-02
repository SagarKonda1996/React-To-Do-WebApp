import Axios from "axios";
import { toast } from "react-toastify";

const axios = Axios.create();

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error("Failed to proceed request");
    return Promise.reject(error);
  }
);

export default axios;
