
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fit-and-flair.onrender.com", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
