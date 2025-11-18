// src/pages/admin/rack/Rack.jsx
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import { Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlotDetailModal from "../../../components/common/modal/SlotDetailModal";
import { getAllRacks } from "../../../apis/admin/racks"; // ✅ Import API

const Rack = () => {
  const [racks, setRacks] = useState([]);
  const [selectedRack, setSelectedRack] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch racks
  const fetchRacks = async () => {
    setLoading(true);
    try {
      const response = await getAllRacks();
      console.log("Rack API Response:", response);

      // ✅ Safely extract the array (handles all shapes)
      const rackList =
        response?.data?.data?.data ||
        response?.data?.data ||
        response?.data ||
        [];

      if (Array.isArray(rackList) && rackList.length > 0) {
        setRacks(rackList);
        setSelectedRack(rackList[0]?.name || "");
        toast.success("Racks loaded successfully");
      } else {
        toast.warning("No racks found");
      }
    } catch (error) {
      console.error("Error fetching racks:", error);
      toast.error(error.response?.data?.message || "Error loading racks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRacks();
  }, []);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
    toast.info(`Slot ${slot.slotId || slot.name} selected`);
  };

  // 🧠 Dummy slot structure (since API doesn’t return slots)
  const generateSlots = (rack) => {
    const total = rack.total_slots || 0;
    return Array.from({ length: total }).map((_, i) => ({
      slotId: `${rack.name || "RACK"}-S${i + 1}`,
      status: i < (rack.occupied_slots || 0) ? "Occupied" : "Empty",
      deviceId: i < (rack.occupied_slots || 0) ? `DVC-${1000 + i}` : null,
    }));
  };

  // ✅ Filtered slots
  const filteredSlots = racks
    .filter((rack) => !selectedRack || rack.name === selectedRack)
    .flatMap((rack) => generateSlots(rack))
    .filter((slot) => {
      const matchStatus = !statusFilter || slot.status === statusFilter;
      const matchSearch =
        !searchTerm ||
        slot.slotId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (slot.deviceId &&
          slot.deviceId.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchStatus && matchSearch;
    });

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">🧱 Rack Management</h5>

      {/* Controls */}
      <Row className="mb-4 g-3 align-items-end">
        <Col md={3}>
          <Form.Label>Rack Selector</Form.Label>
          <Form.Select
            value={selectedRack}
            onChange={(e) => setSelectedRack(e.target.value)}
          >
            <option value="">All Racks</option>
            {racks.map((rack) => (
              <option key={rack._id} value={rack.name}>
                {rack.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Slot Filter</Form.Label>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option>Occupied</option>
            <option>Empty</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Device Category</Form.Label>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            <option>Phone</option>
            <option>Laptop</option>
            <option>Tablet</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Search</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search Slot/Device ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" className="ms-2" onClick={fetchRacks}>
              <Search size={18} />
            </Button>
          </div>
        </Col>
      </Row>

      {/* Grid */}
      <Row className="g-3">
        {loading ? (
          <Col>
            <p className="text-center text-muted">Loading racks...</p>
          </Col>
        ) : filteredSlots.length === 0 ? (
          <Col>
            <p className="text-muted">No slots found for this rack.</p>
          </Col>
        ) : (
          filteredSlots.map((slot) => (
            <Col key={slot.slotId} md={2}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{slot.status}</Tooltip>}
              >
                <Card
                  className="text-center p-2 shadow-sm d-flex flex-column justify-content-center align-items-center"
                  onClick={() => handleSlotClick(slot)}
                  style={{
                    cursor: "pointer",
                    border: "2px solid #dee2e6",
                    height: "120px",
                  }}
                >
                  <h6 className="fw-bold mb-1">{slot.slotId}</h6>
                  {slot.deviceId ? (
                    <>
                      <small>📦 {slot.deviceId}</small>
                      <Badge bg="secondary" className="mt-1">
                        {slot.status}
                      </Badge>
                    </>
                  ) : (
                    <Badge bg="light" text="dark">
                      {slot.status}
                    </Badge>
                  )}
                </Card>
              </OverlayTrigger>
            </Col>
          ))
        )}
      </Row>

      <SlotDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        slot={selectedSlot}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Rack;
