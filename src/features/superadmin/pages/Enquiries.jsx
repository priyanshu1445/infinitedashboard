import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Button, Form, Row, Col, Dropdown, ButtonGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink } from "react-csv";
import "react-toastify/dist/ReactToastify.css";
import {
  Eye,
  Truck,
  PhoneCall,
  CheckCircle,
  XCircle,
  MessageCircle,
  Ticket,
  Download,
} from "lucide-react";

import "../../../styles/global.css";
import EnquiryModal from "../../../components/common/modal/EnquiriesModal";
import { getAllUsers } from "../../../apis/admin/users";

const Enquiries = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all users (customers)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        console.log("Fetched Users:", data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Filter users
  const filteredData = Array.isArray(users)
    ? users.filter((user) => {
        const name = (user.name || "").toLowerCase();
        const email = (user.email || "").toLowerCase();
        const phone = (user.phone || "").toLowerCase();
        const matchesSearch = `${name} ${email} ${phone}`.includes(
          searchText.toLowerCase()
        );
        const matchesStatus = statusFilter
          ? user.kyc?.status === statusFilter
          : true;
        const matchesSource = sourceFilter ? user.role === sourceFilter : true;
        return matchesSearch && matchesStatus && matchesSource;
      })
    : [];

  const handleViewDetails = (row) => {
    setSelectedEnquiry(row);
    setShowModal(true);
  };

  const notify = (msg, type = "info") => toast[type](msg);

  const columns = [
    { name: "#", selector: (row, index) => index + 1, width: "60px" },
    { name: "Name", selector: (row) => row.name || "N/A", sortable: true },
    { name: "Email", selector: (row) => row.email || "N/A", sortable: true },
    { name: "Phone", selector: (row) => row.phone || "N/A" },
    {
      name: "Wallet (INR)",
      selector: (row) => row.wallet?.balance ?? 0,
      sortable: true,
    },
    {
      name: "KYC Status",
      selector: (row) => row.kyc?.status || "N/A",
      cell: (row) => (
        <span
          className={`badge ${
            row.kyc?.status === "approved"
              ? "bg-success"
              : row.kyc?.status === "pending"
              ? "bg-warning text-dark"
              : "bg-secondary"
          }`}
        >
          {row.kyc?.status || "N/A"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleViewDetails(row)}
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => notify(`Pickup assigned for ${row.name}`, "success")}>
              <Truck size={14} className="me-2" /> Assign Pickup
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`Called ${row.name}`, "info")}>
              <PhoneCall size={14} className="me-2" /> Mark as Contacted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`KYC approved for ${row.name}`, "success")}>
              <CheckCircle size={14} className="me-2" /> Approve KYC
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`KYC rejected for ${row.name}`, "error")}>
              <XCircle size={14} className="me-2" /> Reject KYC
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                if (row.phone)
                  window.open(`https://wa.me/${row.phone}`, "_blank");
                else toast.warn("No phone number available");
              }}
            >
              <MessageCircle size={14} className="me-2" /> Send WhatsApp
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`Converted ${row.name} to ticket`, "info")}>
              <Ticket size={14} className="me-2" /> Convert to Ticket
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h5 className="fw-bold mb-3">👥 All Customers</h5>

      {/* Filters */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={4}>
          <Form.Control
            placeholder="Search by Name / Email / Phone"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All KYC Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
          <CSVLink
            data={filteredData}
            filename="customers.csv"
            className="btn btn-outline-success d-inline-flex align-items-center"
          >
            <Download size={16} className="me-1" /> Export CSV
          </CSVLink>
        </Col>
      </Row>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
      />

      {/* Modal */}
      <EnquiryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        enquiry={selectedEnquiry}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Enquiries;
