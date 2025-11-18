import React, { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  Search,
  PlusCircle,
  Repeat,
  Eye,
  Wrench,
  Trash2,
  Tag,
  CalendarDays,
  Archive,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrapIntakeModal from '../../../components/common/modal/ScrapIntakeModal';

// 📦 Sample data
const mockScrapData = [
  {
    id: 1,
    name: 'Lenovo Tab 4',
    category: 'Tablet',
    date: '2024-06-28',
    engineer: 'Eng. Rakesh',
    condition: 'Screen Cracked',
    status: 'Received',
  },
  {
    id: 2,
    name: 'Redmi Note 7',
    category: 'Mobile',
    date: '2024-06-29',
    engineer: 'Eng. Rohan',
    condition: 'Water Damage',
    status: 'Awaiting Approval',
  },
  {
    id: 3,
    name: 'iPad Mini 5',
    category: 'Tablet',
    date: '2024-06-30',
    engineer: 'Eng. Sneha',
    condition: 'Battery Issue',
    status: 'Marked as Junk',
  },
];

const ScrapIntake = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  // ✅ Toast Actions
  const handleView = (row) => toast.info(`Viewing details for "${row.name}"`);
  const handleMoveToRefurb = (row) => toast.success(`"${row.name}" moved to Refurb`);
  const handleMarkAsJunk = (row) => toast.error(`"${row.name}" marked as Junk`);
  const handlePrintQR = (row) => toast.success(`QR tag printed for "${row.name}"`);

  // ✅ Filter Logic
  const filteredData = mockScrapData.filter((item) => {
    const matchesSearch = `${item.name} ${item.engineer}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    const itemDate = new Date(item.date);
    const matchesDate =
      (!startDate || itemDate >= new Date(startDate)) &&
      (!endDate || itemDate <= new Date(endDate));

    return matchesSearch && matchesStatus && matchesDate;
  });

  // ✅ Table Columns
  const columns = [
    { name: '#', selector: (_, index) => index + 1, width: '60px' },
    { name: 'Device Name', selector: (row) => row.name },
    { name: 'Category', selector: (row) => row.category },
    {
      name: 'Intake Date',
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    { name: 'Engineer', selector: (row) => row.engineer },
    { name: 'Condition', selector: (row) => row.condition },
    {
      name: 'Action',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleView(row)}
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleMoveToRefurb(row)}>
              <Wrench size={14} className="me-2" />
              Move to Refurb
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMarkAsJunk(row)}>
              <Trash2 size={14} className="me-2" />
              Mark as Junk
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handlePrintQR(row)}>
              <Tag size={14} className="me-2" />
              Print QR Tag
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
    <div>
      {/* 🔧 Page Title */}
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <Archive size={18} className="me-2 text-warning" />
        Scrap Intake
      </h5>

      {/* 🔍 Top Filters */}
      <Row className="g-3 align-items-end mb-4">
        <Col md={4}>
          <Form.Label className="fw-semibold">
            <Search size={16} className="me-2" />
            Search
          </Form.Label>
          <Form.Control
            placeholder="Serial No / Device / Engineer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Label className="fw-semibold">
            <CalendarDays size={16} className="me-2" />
            From Date
          </Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Label className="fw-semibold">
            <CalendarDays size={16} className="me-2" />
            To Date
          </Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Label className="fw-semibold">Status</Form.Label>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Received</option>
            <option>Awaiting Approval</option>
            <option>Accepted for Refurb</option>
            <option>Marked as Junk</option>
          </Form.Select>
        </Col>

        <Col md="auto" className="d-flex gap-2">
          <Button variant="success" onClick={() => setShowModal(true)}>
            <PlusCircle size={16} className="me-2" />
            Bulk Add Scrap
          </Button>
          <Button variant="secondary">
            <Repeat size={16} className="me-2" />
            Re-attempt Refurb
          </Button>
        </Col>
      </Row>

      {/* 📋 Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        striped
        highlightOnHover
        responsive
      />

      {/* 📦 Modal */}
      <ScrapIntakeModal show={showModal} onHide={() => setShowModal(false)} />

      {/* ✅ Toasts */}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default ScrapIntake;
