import axiosInstance from "../axiosInstance";

export const adminLogin = async (email, password) => {
  const response = await axiosInstance.post("admin/login", { email, password });
  return response.data;
};
