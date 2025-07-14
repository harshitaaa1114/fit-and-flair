// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/', // change this to your actual API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// export default axiosInstance;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // change this to your backend base URL
  withCredentials: true, // if you use cookies/session
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors if needed for auth tokens etc.

export default axiosInstance;
