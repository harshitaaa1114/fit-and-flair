import axiosInstance from "./axios";

export const signin = (FormData)=> axiosInstance.post('/user/login',FormData);
export const signup= (Form)=> axiosInstance.post('user/register',Form);

