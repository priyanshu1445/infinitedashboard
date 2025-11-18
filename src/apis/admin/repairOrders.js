// src/apis/admin/repairOrders.js
import axiosInstance from "../axiosInstance";

export const getAllRepairOrders = async () => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get("admin/repair-orders/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getRepairOrderById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get(`admin/repair-orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateRepairOrder = async (id, data) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.put(
    `admin/repair-orders/update/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
