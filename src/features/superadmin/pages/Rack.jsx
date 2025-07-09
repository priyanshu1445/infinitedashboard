import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Badge,
} from 'react-bootstrap';
import { Search } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlotDetailModal from '../../../components/common/modal/SlotDetailModal';

const mockRackSlots = [
  { rack: 'A', id: 'A1', status: 'In QC', deviceId: 'DVC-11203', customer: 'Rahul Mehta', engineer: 'Nikhil Verma', intakeDate: '27-Jun', notes: 'Awaiting QC confirmation' },
  { rack: 'A', id: 'A2', status: 'Empty' },
  { rack: 'A', id: 'A3', status: 'Ready for Dispatch', deviceId: 'DVC-11207', customer: 'Riya', engineer: 'Rakesh', intakeDate: '25-Jun', notes: 'Ready to ship' },
  { rack: 'A', id: 'A4', status: 'Occupied', deviceId: 'DVC-11209', customer: 'Amit', engineer: 'Manish', intakeDate: '28-Jun', notes: 'Under observation' },
  { rack: 'A', id: 'A5', status: 'Empty' },

  { rack: 'B', id: 'B1', status: 'Occupied', deviceId: 'DVC-11210', customer: 'Kunal', engineer: 'Vikas', intakeDate: '26-Jun', notes: 'Needs spare part' },
  { rack: 'B', id: 'B2', status: 'In QC', deviceId: 'DVC-11211', customer: 'Simran', engineer: 'Anjali', intakeDate: '27-Jun', notes: 'QC running' },
  { rack: 'B', id: 'B3', status: 'Empty' },

  { rack: 'C', id: 'C1', status: 'Ready for Dispatch', deviceId: 'DVC-11212', customer: 'Zoya', engineer: 'Pankaj', intakeDate: '25-Jun', notes: 'Packed' },
  { rack: 'C', id: 'C2', status: 'Occupied', deviceId: 'DVC-11213', customer: 'Vishal', engineer: 'Geet', intakeDate: '24-Jun', notes: 'Repair ongoing' },
];

const Rack = () => {
  const [selectedRack, setSelectedRack] = useState('A');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
    toast.info(`Slot ${slot.id} selected`);
  };

  const filteredSlots = mockRackSlots.filter((slot) => {
    const matchRack = slot.rack === selectedRack;
    const matchStatus = !statusFilter || slot.status === statusFilter;
    const matchSearch =
      !searchTerm ||
      slot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (slot.deviceId && slot.deviceId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchRack && matchStatus && matchSearch;
  });

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">🧱 Rack Management</h5>

      {/* Controls */}
      <Row className="mb-4 g-3 align-items-end">
        <Col md={3}>
          <Form.Label>Rack Selector</Form.Label>
          <Form.Select value={selectedRack} onChange={(e) => setSelectedRack(e.target.value)}>
            <option value="A">Rack A</option>
            <option value="B">Rack B</option>
            <option value="C">Rack C</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Slot Filter</Form.Label>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option>Occupied</option>
            <option>Empty</option>
            <option>In QC</option>
            <option>Ready for Dispatch</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Device Category</Form.Label>
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
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
            <Button variant="primary" className="ms-2">
              <Search size={18} />
            </Button>
          </div>
        </Col>
      </Row>

      {/* Grid */}
      <Row className="g-3">
        {filteredSlots.length === 0 ? (
          <Col>
            <p className="text-muted">No slots match your filter/search criteria.</p>
          </Col>
        ) : (
          filteredSlots.map((slot) => (
            <Col key={slot.id} md={2}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{slot.status}</Tooltip>}
              >
                <Card
                  className="text-center p-2 shadow-sm d-flex flex-column justify-content-center align-items-center"
                  onClick={() => handleSlotClick(slot)}
                  style={{
                    cursor: 'pointer',
                    border: '2px solid #dee2e6',
                    height: '120px',
                  }}
                >
                  <h6 className="fw-bold mb-1">{slot.id}</h6>
                  {slot.deviceId ? (
                    <>
                      <small>📦 {slot.deviceId}</small>
                      <Badge bg="secondary" className="mt-1">{slot.status}</Badge>
                    </>
                  ) : (
                    <Badge bg="light" text="dark">{slot.status}</Badge>
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
