import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Eye, MoveRight, Settings } from 'lucide-react';
import SlotActionModal from '../../../components/common/modal/SlotActionModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockSlots = [
  {
    rack: 'A',
    slot: 'A2',
    device: 'Redmi 9',
    status: 'Repairing',
    customer: 'S. Roy',
    date: '2024-06-28',
    engineer: 'Eng. Ashok',
    notes: 'Battery issue',
  },
  {
    rack: 'B',
    slot: 'B1',
    device: 'iPhone 12',
    status: 'QC',
    customer: 'K. Verma',
    date: '2024-06-26',
    engineer: 'Eng. Neha',
    notes: 'Pending QC',
  },
  {
    rack: 'A',
    slot: 'A1',
    device: 'Samsung S20',
    status: 'Empty',
    customer: '',
    date: '',
    engineer: '',
    notes: '',
  },
  {
    rack: 'C',
    slot: 'C3',
    device: 'Google Pixel 7',
    status: 'Pending Repair',
    customer: 'J. Singh',
    date: '2024-07-01',
    engineer: 'Eng. Rakesh',
    notes: 'Screen replacement',
  },
  {
    rack: 'B',
    slot: 'B3',
    device: 'OnePlus 8',
    status: 'Occupied',
    customer: 'M. Khan',
    date: '2024-06-29',
    engineer: 'Eng. Ashok',
    notes: 'Charging port issue',
  },
];

const SlotOverview = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRack, setFilterRack] = useState('');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleOpenModal = (slot, mode = 'view') => {
    setSelectedSlot(slot);
    setModalMode(mode);
    setShowModal(true);
    toast.info(`${mode === 'view' ? 'Viewing' : 'Updating'} slot: ${slot.slot}`);
  };

  const handleMoveSlot = (slot) => {
    toast.info(`Moving Slot: ${slot.slot}`);
  };

  const filteredSlots = mockSlots.filter((slot) => {
    const matchStatus = !filterStatus || slot.status === filterStatus;
    const matchRack = !filterRack || slot.rack === filterRack;
    const matchKeyword =
      !filterKeyword ||
      slot.device.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      slot.engineer.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      slot.customer.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      slot.slot.toLowerCase().includes(filterKeyword.toLowerCase());
    const matchDate = !filterDate || slot.date === filterDate;

    return matchStatus && matchRack && matchKeyword && matchDate;
  });

  const columns = [
    {
      name: 'Rack',
      selector: row => row.rack,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Slot',
      selector: row => row.slot,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Device',
      selector: row => row.device,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge rounded-pill px-3 py-1 fw-semibold ${
          row.status === 'Repairing'
            ? 'bg-primary'
            : row.status === 'QC'
            ? 'bg-warning text-dark'
            : row.status === 'Empty'
            ? 'bg-secondary'
            : row.status === 'Pending Repair'
            ? 'bg-info text-dark'
            : 'bg-success'
        }`}>
          {row.status}
        </span>
      ),
      sortable: true,
      width: '160px',
    },
    {
      name: 'Customer',
      selector: row => row.customer || '-',
    },
    {
      name: 'Date',
      selector: row => row.date || '-',
    },
    {
      name: 'Engineer',
      selector: row => row.engineer || '-',
    },
    {
      name: 'Actions',
      cell: row => (
        <Dropdown as={ButtonGroup} align="end">
          <Button variant="outline-primary" size="sm">Actions</Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleOpenModal(row, 'view')}
              className="d-flex align-items-center"
            >
              <Eye size={14} className="me-2 text-primary" />
              View Full Journey
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleMoveSlot(row)}
              className="d-flex align-items-center"
            >
              <MoveRight size={14} className="me-2 text-info" />
              Move to Another Slot
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleOpenModal(row, 'update')}
              className="d-flex align-items-center"
            >
              <Settings size={14} className="me-2 text-success" />
              Mark Status / Add Note
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">🔍 Slot Overview</h4>

      {/* Filter Section */}
      <Card className="p-4 shadow-sm mb-4">
        <Row className="g-3">
          <Col md={3}>
            <Form.Label>Status</Form.Label>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              <option>Occupied</option>
              <option>Empty</option>
              <option>QC</option>
              <option>Repairing</option>
              <option>Pending Repair</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Rack</Form.Label>
            <Form.Select value={filterRack} onChange={(e) => setFilterRack(e.target.value)}>
              <option value="">All</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Search (Engineer / Customer / Slot)</Form.Label>
            <Form.Control
              placeholder="Enter keyword..."
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Entry Date</Form.Label>
            <Form.Control
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </Col>
        </Row>
      </Card>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredSlots}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent="No matching slots found."
      />

      {/* Modal */}
      <SlotActionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        slot={selectedSlot}
        mode={modalMode}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default SlotOverview;
