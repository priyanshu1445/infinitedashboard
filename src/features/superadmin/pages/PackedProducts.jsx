import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaVideo } from "react-icons/fa";
import "./../../../../src/index.css";

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

const PackedProducts = () => {
  const [search, setSearch] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: "ORD101",
      name: "Priyanshu Sharma",
      phone: "9876543210",
      email: "priyanshu@example.com",
      address: "Udaipur, Rajasthan",
      issue: "Battery draining fast",
      wayOfReaching: "Call",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      status: "Packed",
    },
    {
      id: "ORD102",
      name: "Rahul Singh",
      phone: "9123456780",
      email: "rahul@example.com",
      address: "Jaipur, Rajasthan",
      issue: "Screen cracked",
      wayOfReaching: "Email",
      video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      status: "Packed",
    },
  ]);

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) => {
    const q = search.toLowerCase();
    return (
      order.name.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q) ||
      order.phone.includes(q) ||
      order.id.toLowerCase().includes(q)
    );
  });

  const openConfirmModal = (row) => {
    setSelectedOrder(row);
    setConfirmModal(true);
  };

  const confirmParcel = () => {
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setConfirmModal(false);
    setSelectedOrder(null);
  };

  const ActionButton = ({ row }) => (
    <button
      className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
      onClick={() => openConfirmModal(row)}
    >
      Parcel
    </button>
  );

  const columns = [
    { name: "Order ID", selector: (row) => row.id, cell: (row) => <EllipsisCell text={row.id} width="100px" />, width: "110px" },
    { name: "Name", selector: (row) => row.name, cell: (row) => <EllipsisCell text={row.name} width="130px" /> },
    { name: "Phone", selector: (row) => row.phone, cell: (row) => <EllipsisCell text={row.phone} width="120px" /> },
    { name: "Email", selector: (row) => row.email, cell: (row) => <EllipsisCell text={row.email} width="180px" /> },
    { name: "Address", selector: (row) => row.address, cell: (row) => <EllipsisCell text={row.address} width="180px" /> },
    { name: "Issue", selector: (row) => row.issue, cell: (row) => <EllipsisCell text={row.issue} width="200px" /> },
    { name: "Way of Reaching", selector: (row) => row.wayOfReaching, cell: (row) => <EllipsisCell text={row.wayOfReaching} width="130px" /> },
    {
      name: "Video",
      width: "80px",
      cell: (row) => (
        <button className="text-blue-600 underline" onClick={() => setVideoUrl(row.video)}>
          <FaVideo />
        </button>
      ),
    },
    {
      name: "Status",
      width: "120px",
      cell: (row) => (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      button: true,
      allowOverflow: true,
      ignoreRowClick: true,
      width: "120px",
      cell: (row) => <ActionButton row={row} />,
    },
  ];

  return (
    <div className="p-4">
      {/* SEARCH + HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">📦 Packed Products</h2>

        <div className="flex gap-2">
          <div className="relative w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              className="pl-10 pr-4 py-2 border rounded w-full shadow-sm"
              placeholder="Search order, name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded shadow">Search</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded shadow p-3 overflow-x-auto">
        <DataTable columns={columns} data={filteredOrders} pagination highlightOnHover dense />
      </div>

      {/* VIDEO MODAL */}
      {videoUrl && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <video src={videoUrl} controls autoPlay className="w-full rounded" />
            <button className="absolute top-2 right-2 text-white text-3xl" onClick={() => setVideoUrl(null)}>
              ✖
            </button>
          </div>
        </div>
      )}

      {/* CONFIRM PARCEL MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Parcel</h3>
            <p className="mb-6">
              Are you sure you want to mark <b>{selectedOrder?.id}</b> as Parcel?
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setConfirmModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={confirmParcel}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackedProducts;
