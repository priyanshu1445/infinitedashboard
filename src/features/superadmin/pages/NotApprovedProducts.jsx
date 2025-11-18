import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import "./../.././../../src/index.css";

// 🔹 Reusable Ellipsis Component
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

const NotApprovedProducts = () => {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [products, setProducts] = useState([
    {
      id: "ORD101",
      name: "Rohan Verma",
      phone: "9988776655",
      email: "rohan@example.com",
      address: "Kota, Rajasthan",
      issue: "Camera not working properly after update",
      date: "2025-11-10",
      wayOfReaching: "Call",
      video: "https://example.com/video3.mp4",
      status: "Not Approved",
      rackNo: "R-01",
    },
    {
      id: "ORD102",
      name: "Yash Gupta",
      phone: "9090909090",
      email: "yash@example.com",
      address: "Jodhpur, Rajasthan",
      issue: "Device overheating issue when charging overnight",
      date: "2025-11-08",
      wayOfReaching: "Email",
      video: "https://example.com/video4.mp4",
      status: "Not Approved",
      rackNo: "R-03",
    },
  ]);

  // Remove product
  const handleApprove = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);

    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // Search filter
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  // ⛔ FIXED COLUMNS WITH ELLIPSIS
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      cell: (row) => <EllipsisCell text={row.id} width="100px" />,
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
      cell: (row) => <EllipsisCell text={row.phone} width="130px" />,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <EllipsisCell text={row.email} width="180px" />,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (row) => <EllipsisCell text={row.address} width="180px" />,
    },
    {
      name: "Issue",
      selector: (row) => row.issue,
      cell: (row) => <EllipsisCell text={row.issue} width="220px" />,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      cell: (row) => <EllipsisCell text={row.date} width="120px" />,
    },
    {
      name: "Way of Reaching",
      selector: (row) => row.wayOfReaching,
      cell: (row) => <EllipsisCell text={row.wayOfReaching} width="150px" />,
    },
    {
      name: "Video",
      cell: (row) => (
        <a
          href={row.video}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline font-medium"
        >
          View
        </a>
      ),
      width: "100px",
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
            row.status === "Approved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
      width: "120px",
    },
    {
      name: "Rack No",
      selector: (row) => row.rackNo,
      cell: (row) => <EllipsisCell text={row.rackNo} width="80px" />,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleApprove(row.id)}
          className="px-3 py-1.5 text-xs font-medium rounded shadow-sm bg-green-600 text-white hover:bg-green-700"
        >
          Parcel
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "120px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#f9fafb",
        color: "#374151",
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingTop: "10px",
        paddingBottom: "10px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  };

  return (
    <div className="p-4 sm:p-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          ❌ Not Approved Products
        </h2>

        {/* Search bar */}
    <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-72">
                <FaSearch
                  size={16}
                  className="absolute left-3 top-4 text-gray-500 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by order, name, or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 text-sm w-full border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
    
              <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-full text-sm shadow-sm hover:bg-indigo-700">
                Search
              </button>
            </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 overflow-auto">
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          highlightOnHover
          dense
          customStyles={customStyles}
          fixedHeader
          fixedHeaderScrollHeight="500px"
        />
      </div>

      {/* Success popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white px-8 py-5 rounded-2xl shadow-lg text-center">
            <h3 className="text-green-600 font-semibold text-lg mb-1">
              📦 Product Moved to Parcel
            </h3>
            <p className="text-sm text-gray-600">
              Product removed from the list.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotApprovedProducts;
