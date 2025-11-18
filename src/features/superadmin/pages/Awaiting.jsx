import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ScanLine, Wrench, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AwaitingModal from "../../../components/common/modal/AwaitingModal";
import { getAllRepairOrders } from "../../../apis/admin/repairOrders";

const Awaiting = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState("");

  // ✅ Fetch all repair orders
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const res = await getAllRepairOrders();
        // The data shape from your API example:
        // { status, code, data: { data: [ ...repairs ] } }
        const data = res?.data?.data || res?.data || [];
        if (Array.isArray(data)) {
          // Only show “awaiting” or “intake” type repairs
          const awaiting = data.filter(
            (r) =>
              r.status?.toLowerCase() === "intake" ||
              r.status?.toLowerCase() === "awaiting"
          );
          setRepairs(awaiting);
        } else {
          toast.error("Unexpected data format received from API");
        }
      } catch (err) {
        console.error("Error fetching repair orders:", err);
        toast.error("Failed to load awaiting repairs");
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  // ✅ Search filter
  const filteredData = repairs.filter((row) =>
    `${row.device} ${row.issue} ${row.status}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  // ✅ Table columns
  const columns = [
    { name: "#", selector: (row, index) => index + 1, width: "60px" },
    { name: "Device", selector: (row) => row.device || "N/A" },
    { name: "Issue", selector: (row) => row.issue || "N/A" },
    { name: "Status", selector: (row) => row.status || "N/A" },
    {
      name: "Quote",
      selector: (row) => (row.quote?.amount ? `₹${row.quote.amount}` : "—"),
    },
    {
      name: "Created",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A",
    },
    {
      name: "QR Code",
      cell: (row) => (
        <Button size="sm" variant="outline-success">
          <ScanLine size={14} className="me-1" />
          Scan Now
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Button
          size="sm"
          variant="outline-warning"
          onClick={() => {
            setSelectedOrder(row);
            setShowModal(true);
          }}
        >
          <Wrench size={14} className="me-1" />
          Submit Diagnosis
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <div>
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <Wrench size={18} className="me-2 text-warning" />
        Awaiting Diagnosis
      </h5>

      {/* 🔍 Search Bar */}
      <Form.Group
        className="mb-3 d-flex align-items-center"
        controlId="searchText"
      >
        <Search size={16} className="me-2" />
        <Form.Control
          type="text"
          placeholder="Search by device, issue, or status"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>

      {/* 📋 Table */}
      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          striped
          highlightOnHover
        />
      </div>

      {/* 🧾 Diagnosis Modal */}
      <AwaitingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        order={selectedOrder}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Awaiting;
