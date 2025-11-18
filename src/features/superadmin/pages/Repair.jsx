import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Dropdown,
  ButtonGroup,
  Badge,
  Modal,
  Spinner,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {
  Search,
  Wrench,
  UserCog,
  Layers,
  Eye,
  ClipboardCheck,
  MessageCircleMore,
  FileUp,
  Receipt,
  MoveRight,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllRepairOrders,
  getRepairOrderById,
} from "../../../apis/admin/repairOrders";

const Repair = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "" });
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const notify = (msg, type = "success") =>
    type === "error" ? toast.error(msg) : toast.success(msg);

  // ✅ Fetch all repair orders
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const res = await getAllRepairOrders();
        // Correctly extract array from API
        const data = res?.data?.data || [];
        if (Array.isArray(data)) {
          setRepairs(data);
        } else {
          notify("Unexpected data format", "error");
        }
      } catch (err) {
        console.error("Error fetching repairs:", err);
        notify("Failed to load repair orders", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchRepairs();
  }, []);

  // ✅ Fetch repair by ID
  const handleView = async (id) => {
    try {
      const res = await getRepairOrderById(id);
      const data = res?.data || null;
      if (data) {
        setSelectedRepair(data);
        setShowModal(true);
      } else {
        notify("No repair details found", "error");
      }
    } catch (err) {
      console.error("Error fetching repair by ID:", err);
      notify("Failed to fetch repair details", "error");
    }
  };

  // ✅ Filter logic
  const filteredData = repairs.filter((item) => {
    const matchesSearch =
      `${item.device || ""} ${item.issue || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStatus = filters.status
      ? item.status?.toLowerCase() === filters.status.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  // ✅ Table Columns
  const columns = [
    { name: "Order ID", selector: (row) => row._id, sortable: true },
    { name: "Device", selector: (row) => row.device || "N/A", sortable: true },
    { name: "Issue", selector: (row) => row.issue || "N/A" },
    {
      name: "Status",
      selector: (row) => row.status || "N/A",
      cell: (row) => (
        <Badge
          bg={
            row.status === "intake"
              ? "info"
              : row.status === "approved"
              ? "success"
              : row.status === "quote"
              ? "warning"
              : "secondary"
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: "Quote Amount",
      selector: (row) =>
        row.quote?.amount ? `₹${row.quote.amount}` : "—",
    },
    {
      name: "Created",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleView(row._id)}
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item>
              <MoveRight size={14} className="me-2" /> Update Status
            </Dropdown.Item>
            <Dropdown.Item>
              <ClipboardCheck size={14} className="me-2" /> View/Add Diagnosis
            </Dropdown.Item>
            <Dropdown.Item>
              <MessageCircleMore size={14} className="me-2" /> View/Send Quote
            </Dropdown.Item>
            <Dropdown.Item>
              <FileUp size={14} className="me-2" /> Upload Image/Video
            </Dropdown.Item>
            <Dropdown.Item>
              <Receipt size={14} className="me-2" /> Generate Invoice
            </Dropdown.Item>
            <Dropdown.Item>
              <UserCog size={14} className="me-2" /> Assign/Reassign Engineer
            </Dropdown.Item>
            <Dropdown.Item>
              <Layers size={14} className="me-2" /> Move Rack
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
        <Wrench size={20} className="me-2 text-danger" />
        All Repairs – Master View
      </h5>

      {/* 🔍 Filters */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={4}>
          <Form.Label>
            <Search size={16} className="me-2" /> Search (Device / Issue)
          </Form.Label>
          <Form.Control
            placeholder="Search by device or issue"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="intake">Intake</option>
            <option value="approved">Approved</option>
            <option value="quote">Quote</option>
          </Form.Select>
        </Col>
      </Row>

      {/* 📋 Table */}
      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          striped
          highlightOnHover
          responsive
        />
      </div>

      {/* 🔍 Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Repair Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRepair ? (
            <>
              <p><strong>ID:</strong> {selectedRepair._id}</p>
              <p><strong>Device:</strong> {selectedRepair.device}</p>
              <p><strong>Issue:</strong> {selectedRepair.issue}</p>
              <p><strong>Status:</strong> {selectedRepair.status}</p>
              <p>
                <strong>Quote Amount:</strong>{" "}
                {selectedRepair.quote?.amount
                  ? `₹${selectedRepair.quote.amount}`
                  : "—"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRepair.createdAt).toLocaleString()}
              </p>
            </>
          ) : (
            <p>Loading details...</p>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Repair;
