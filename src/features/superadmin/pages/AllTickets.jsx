// TicketTable.jsx
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

// 🔹 Reusable Ellipsis Component
const EllipsisCell = ({ text, width = "140px" }) => (
  <div
    style={{
      maxWidth: width,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    title={text}
  >
    {text}
  </div>
);

// 🔹 Mock ticket data
const mockTickets = [
  {
    id: "TICK-001",
    customer: "Priyanshu Sharma",
    phone: "9876543210",
    email: "priyanshu@example.com",
    address: "Udaipur, Rajasthan",
    issue: "Battery not working and heating",
    source: "Mobile App",
    date: "2025-11-11",
    status: "Open",
  },
  {
    id: "TICK-002",
    customer: "Rahul Singh",
    phone: "9876509876",
    email: "rahul@example.com",
    address: "Jaipur, Rajasthan",
    issue: "Screen flickering occasionally",
    source: "Website",
    date: "2025-11-09",
    status: "In Progress",
  },
  {
    id: "TICK-003",
    customer: "Ritu S.",
    phone: "9998887776",
    email: "ritu@example.com",
    address: "Delhi, India",
    issue: "App crashes when login",
    source: "Call",
    date: "2025-11-10",
    status: "Resolved",
  },
];

const TicketTable = () => {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");

  // 🔍 Filtered data based on search and source
  const filteredTickets = mockTickets.filter((ticket) => {
    const q = search.toLowerCase();
    const matchSearch =
      ticket.customer.toLowerCase().includes(q) ||
      ticket.email.toLowerCase().includes(q) ||
      ticket.phone.includes(q) ||
      ticket.id.toLowerCase().includes(q);
    const matchSource = !source || ticket.source === source;
    return matchSearch && matchSource;
  });

  // 🔹 Columns for DataTable
  const columns = [
    { name: "Ticket ID", selector: (row) => row.id, sortable: true, minWidth: "100px" },
    { name: "Customer", selector: (row) => row.customer, cell: (row) => <EllipsisCell text={row.customer} width="120px" />, sortable: true, minWidth: "120px" },
    { name: "Phone", selector: (row) => row.phone, cell: (row) => <EllipsisCell text={row.phone} width="120px" />, minWidth: "120px" },
    { name: "Email", selector: (row) => row.email, cell: (row) => <EllipsisCell text={row.email} width="150px" />, minWidth: "150px" },
    { name: "Address", selector: (row) => row.address, cell: (row) => <EllipsisCell text={row.address} width="150px" />, minWidth: "150px" },
    { name: "Issue", selector: (row) => row.issue, cell: (row) => <EllipsisCell text={row.issue} width="180px" />, grow: 2 },
    { name: "Source", selector: (row) => row.source, sortable: true, minWidth: "100px" },
    { name: "Date", selector: (row) => row.date, sortable: true, minWidth: "100px" },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status === "Open"
              ? "bg-blue-100 text-blue-700"
              : row.status === "In Progress"
              ? "bg-yellow-100 text-yellow-700"
              : row.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {row.status}
        </span>
      ),
      minWidth: "100px",
    },
  ];

  return (
    <div className="p-4">
      {/* ----------- Header + Search ----------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          📂 Support Tickets
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none w-full sm:w-72">
            <FaSearch
              size={16}
              className="absolute left-3 top-3.5 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm w-full border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>


          <button
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-full text-sm shadow-sm hover:bg-indigo-700 w-full sm:w-auto"
            onClick={() => {}}
          >
            Search
          </button>

          
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded shadow-sm text-sm w-full sm:w-auto"
          >
            <option value="">All Sources</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Website">Website</option>
            <option value="Call">Call</option>
          </select>
        </div>
      </div>

      {/* ----------- DataTable ----------- */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredTickets}
          pagination
          dense
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default TicketTable;
