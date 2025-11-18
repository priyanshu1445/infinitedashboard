// src/apis/admin/users.js
import axiosInstance from "../axiosInstance";

// 🔹 Get all customers (with pagination)
export const getAllUsers = async (page = 1, limit = 10, role = "customer") => {
  try {
    const response = await axiosInstance.get(
      `admin/user/all?page=${page}&limit=${limit}&role=${role}`
    );
    // ✅ Handle nested structure: response.data.data.data
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// 🔹 Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`admin/user/findById/${id}`);
    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// 🔹 Create a new user
export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post("admin/user/create", data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// 🔹 Update user
export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.put(`admin/user/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// 🔹 Delete user
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`admin/user/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
