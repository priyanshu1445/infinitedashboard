import React, { useState } from "react";
import DataTable from "react-data-table-component";
import AllocateEngineerModal from "./../../../components/common/modal/AllocateEngineerModal";
import { Edit } from "lucide-react";

// Dummy Appointment Data
const mockAppointments = [
  {
    id: 1,
    name: "Rohit Sharma",
    phone: "9876543210",
    email: "rohit@example.com",
    address: "Udaipur, Rajasthan",
    date: "2025-02-18",
    time: "4:00 PM",
    issue: "Screen Replacement",
  },
  {
    id: 2,
    name: "Priyanshu Verma",
    phone: "9123456780",
    email: "priyanshu@example.com",
    address: "Jaipur, Rajasthan",
    date: "2025-02-18",
    time: "2:30 PM",
    issue: "Battery Issue",
  },
  {
    id: 3,
    name: "Sneha Sharma",
    phone: "9988776655",
    email: "sneha@example.com",
    address: "Jodhpur, Rajasthan",
    date: "2025-02-19",
    time: "11:00 AM",
    issue: "Camera Not Working",
  },
];

const AppointmentAllocation = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openAllocateModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Issue",
      selector: (row) => row.issue,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => openAllocateModal(row)}
          className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-700"
        >
          <Edit size={14} /> Allocate Engineer
        </button>
      ),
      width: "180px",
    },
  ];

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">📋 Appointment Allocation</h2>

      <DataTable
        columns={columns}
        data={mockAppointments}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {showModal && (
        <AllocateEngineerModal
          show={showModal}
          onClose={() => setShowModal(false)}
          appointment={selectedAppointment}
        />
      )}
    </div>
  );
};

export default AppointmentAllocation;
