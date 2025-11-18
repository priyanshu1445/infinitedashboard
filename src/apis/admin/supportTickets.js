// src/apis/admin/supportTickets.js
import axiosInstance from "../axiosInstance";

// Get all support tickets
export const getAllTickets = async () => {
  const response = await axiosInstance.get("admin/support-tickets/all");
  return response.data;
};

// Get ticket details by ID
export const getTicketById = async (id) => {
  const response = await axiosInstance.get(`admin/support-tickets/findById/${id}`);
  return response.data;
};

// Update a specific ticket
export const updateTicket = async (id, data) => {
  const response = await axiosInstance.put(`admin/support-tickets/update/${id}`, data);
  return response.data;
};
