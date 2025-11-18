// src/apis/admin/racks.js
import axiosInstance from "../axiosInstance";

// ✅ Get all racks
export const getAllRacks = async () => {
  const response = await axiosInstance.get("admin/racks/all");
  return response.data;
};

// ✅ Create a new rack
export const createRack = async (data) => {
  const response = await axiosInstance.post("admin/racks/create", data);
  return response.data;
};

// ✅ Delete a rack
export const deleteRack = async (id) => {
  const response = await axiosInstance.delete(`admin/racks/delete/${id}`);
  return response.data;
};
