import axiosInstance from "./axios";

export const signin = (FormData)=> axiosInstance.post('/user/login',FormData);
export const signup= (Form)=> axiosInstance.post('user/register',Form);

// export const createCategory = (data) =>
//   axiosInstance.post("/admin/create/category", data);

// export const getAllCategories = () =>
//   axiosInstance.get("/admin/get/categories");

// export const getCategoryById = (id) =>
//   axiosInstance.get(`/admin/get/category/${id}`);

// export const deleteCategory = (id) =>
//   axiosInstance.delete(`/admin/delete/category/${id}`);

// export const deleteAllCategories = () =>
//   axiosInstance.delete("/admin/delete/categories");