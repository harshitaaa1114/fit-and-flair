
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fit-and-flair.onrender.com", // change this to your backend base URL
  withCredentials: true, // if you use cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors if needed for auth tokens etc.

export default axiosInstance;
