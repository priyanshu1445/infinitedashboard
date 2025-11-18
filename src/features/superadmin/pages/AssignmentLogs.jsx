import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import { Eye, Play } from "lucide-react";
import ProductDetailsModal from "../../../components/common/modal/ProductAssignmentModal";
import "./../../../../src/index.css"; // keep same import for styling

// 🔹 Reusable Component for ellipsis text
const EllipsisCell = ({ text, width = "140px" }) => (
  <div
    style={{
      maxWidth: width,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    title={text} // show full text on hover
  >
    {text}
  </div>
);

const mockLogs = [
  {
    orderId: "ORD-001",
    name: "Priyanshu Sharma",
    phone: "9876543210",
    email: "priyanshu@example.com",
    address: "Udaipur, Rajasthan",
    issue: "Screen cracked",
    wayOfReaching: "Mobile App",
    date: "2024-06-28",
    status: "Completed",
    video: "/sample1.mp4",
    repairingEngineer: "Akash J.",
    qualityEngineer: "Rohit Verma",
  },
  {
    orderId: "ORD-002",
    name: "Rahul Singh",
    phone: "9876509876",
    email: "rahul@example.com",
    address: "Jaipur, Rajasthan",
    issue: "Charging port not working",
    wayOfReaching: "Call",
    date: "2024-06-29",
    status: "Pending",
    video: "",
    repairingEngineer: "Vikas T.",
    qualityEngineer: "",
  },
];

const AssignmentLogs = () => {
  const [filterSearch, setFilterSearch] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = mockLogs.filter((item) => {
    const q = filterSearch.toLowerCase();
    return (
      item.orderId.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.phone.includes(q)
    );
  });

  const handleView = (row) => {
    setSelectedData(row);
    setShowModal(true);
  };

  // 🔹 Status Badge
  const statusBadge = (status) => {
    if (status === "Completed")
      return (
        <span className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
          Completed
        </span>
      );
    if (status === "Pending")
      return (
        <span className="px-2.5 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
          Pending
        </span>
      );
    return (
      <span className="px-2.5 py-1 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">
        {status}
      </span>
    );
  };

  // 🔹 Columns with ellipsis + modern UI
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.orderId,
      cell: (row) => <EllipsisCell text={row.orderId} width="120px" />,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => <EllipsisCell text={row.name} width="150px" />,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      cell: (row) => <EllipsisCell text={row.phone} width="120px" />,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <EllipsisCell text={row.email} width="200px" />,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (row) => <EllipsisCell text={row.address} width="200px" />,
    },
    {
      name: "Issue",
      selector: (row) => row.issue,
      cell: (row) => <EllipsisCell text={row.issue} width="220px" />,
    },
    {
      name: "Reaching",
      selector: (row) => row.wayOfReaching,
      cell: (row) => <EllipsisCell text={row.wayOfReaching} width="130px" />,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      cell: (row) => <EllipsisCell text={row.date} width="120px" />,
    },

    // 🔹 Video Column
    {
      name: "Video",
      cell: (row) =>
        row.video ? (
          <button
            onClick={() => window.open(row.video, "_blank")}
            className="px-3 py-1 text-xs flex items-center gap-1 bg-indigo-600 text-white rounded shadow-sm hover:bg-indigo-700"
          >
            <Play size={12} /> View
          </button>
        ) : (
          "No Video"
        ),
    },

    // 🔹 Status Badge
    {
      name: "Status",
      cell: (row) => statusBadge(row.status),
    },

    {
      name: "Repair Eng.",
      selector: (row) => row.repairingEngineer,
      cell: (row) => <EllipsisCell text={row.repairingEngineer} width="150px" />,
    },
    {
      name: "Quality Eng.",
      selector: (row) => row.qualityEngineer || "N/A",
      cell: (row) => <EllipsisCell text={row.qualityEngineer || "N/A"} width="150px" />,
    },

    // 🔹 Action Button
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleView(row)}
          className="px-3 py-1.5 bg-indigo-600 text-white text-xs rounded shadow-sm hover:bg-indigo-700 flex items-center gap-1"
        >
          <Eye size={14} /> View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // 🔹 Custom Table Style
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#f9fafb",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          📋 Assignment Logs
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-72">
            <FaSearch
              size={16}
              className="absolute left-3 top-4 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search order, name, or phone..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm w-full border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-full text-sm shadow-sm hover:bg-indigo-700">
            Search
          </button>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 overflow-x-auto">
        <div className="min-w-[1100px]">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            dense
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* Modal */}
      <ProductDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedData}
      />
    </div>
  );
};

export default AssignmentLogs;
