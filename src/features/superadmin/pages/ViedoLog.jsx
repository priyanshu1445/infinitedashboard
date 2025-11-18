import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import MediaModal from "../../../components/common/modal/VideoLogActionModal";

// ----------- Reusable Ellipsis Component -----------
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

// ----------- Mock Logs -----------
const mockLogs = [
  {
    id: "VC-20892",
    customer: "Ritu S.",
    phone: "9876543210",
    email: "ritu@example.com",
    address: "Udaipur, Rajasthan",
    engineer: "Nikhil G.",
    platform: "Zoom",
    duration: "23 mins",
    startISO: "2025-11-18T10:00:00",
    endISO: "2025-11-18T10:23:00",
    issue: "Screen flicker after update",
    status: "Complete",
    media: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: "VC-20893",
    customer: "Amit P.",
    phone: "9994567890",
    email: "amit@example.com",
    address: "Jaipur, Rajasthan",
    engineer: "Sneha K.",
    platform: "Google Meet",
    duration: "0 mins",
    startISO: "2025-11-18T11:00:00",
    endISO: "2025-11-18T11:00:00",
    issue: "Battery drains fast",
    status: "Missed",
    media: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

const VideoLog = () => {
  const [search, setSearch] = useState("");
  const [mediaFile, setMediaFile] = useState(null);

  // 🔍 Search Filter
  const filtered = mockLogs.filter((row) => {
    const q = search.toLowerCase();

    return (
      row.customer.toLowerCase().includes(q) ||
      row.phone.includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.id.toLowerCase().includes(q)
    );
  });

  // ----------- Columns with Ellipsis -----------
  const columns = [
    {
      name: "Call ID",
      selector: (row) => row.id,
      cell: (row) => <EllipsisCell text={row.id} width="120px" />,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer,
      cell: (row) => <EllipsisCell text={row.customer} width="150px" />,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      cell: (row) => <EllipsisCell text={row.phone} width="120px" />,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <EllipsisCell text={row.email} width="180px" />,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (row) => <EllipsisCell text={row.address} width="200px" />,
    },
    {
      name: "Issue",
      selector: (row) => row.issue,
      cell: (row) => <EllipsisCell text={row.issue} width="200px" />,
      grow: 2,
    },
    {
      name: "Platform",
      selector: (row) => row.platform,
      cell: (row) => <EllipsisCell text={row.platform} width="120px" />,
    },
    {
      name: "Media File",
      cell: (row) => (
        <span className="text-blue-600 font-medium">
          {row.media ? "Available" : "No File"}
        </span>
      ),
      width: "120px",
    },
   
    {
      name: "Date",
      selector: (row) => new Date(row.startISO).toLocaleDateString(),
      width: "130px",
    },
    {
      name: "Start Time",
      selector: (row) =>
        new Date(row.startISO).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      width: "120px",
    },
    {
      name: "End Time",
      selector: (row) =>
        new Date(row.endISO).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            row.status === "Complete"
              ? "bg-green-100 text-green-700"
              : row.status === "Missed"
              ? "bg-red-100 text-red-700"
              : "bg-gray-200 text-gray-700"
          },
          `}
        >
          {row.status}
        </span>
      ),
      width: "120px",
    },
     {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => setMediaFile(row.media)}
          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
        >
          View
        </button>
      ),
      width: "120px",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#f9fafb",
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
    <div className="p-4">
      {/* ----------- Header + Search Bar ----------- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          🎥 Video Call Logs
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-72">
            <FaSearch
              size={16}
              className="absolute left-3 top-3.5 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 text-sm w-full border border-gray-300 rounded shadow-sm"
            />
          </div>

          <button className="px-4 py-2.5 bg-indigo-600 text-white rounded-full text-sm shadow-sm hover:bg-indigo-700">
            Search
          </button>
        </div>
      </div>

      {/* ----------- Table ----------- */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 overflow-x-auto">
        <div className="min-w-[1100px]">
          <DataTable
            columns={columns}
            data={filtered}
            pagination
            dense
            highlightOnHover
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* ----------- Media Modal ----------- */}
      {mediaFile && (
        <MediaModal file={mediaFile} onClose={() => setMediaFile(null)} />
      )}
    </div>
  );
};

export default VideoLog;
