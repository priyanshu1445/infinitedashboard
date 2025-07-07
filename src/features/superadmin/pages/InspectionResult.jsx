import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  Eye,
  Search,
  CheckCircle,
  XCircle,
  Pencil,
  Tag,
  Send,
  CalendarDays,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InspectionReportModal from '../../../components/common/modal/InspectionReportModal';
import { CSVLink } from 'react-csv';

const mockInspectionData = [
  {
    id: 1,
    device: 'Oppo A57',
    inspector: 'Eng. Alok',
    condition: 'Minor Scratches',
    quote: 2500,
    issues: 'Display Flicker',
    status: 'Passed',
    date: '2024-07-01',
    remarks: 'Minor display flickering observed',
    images: ['https://via.placeholder.com/80', 'https://via.placeholder.com/80'],
    imei: '123456789012345',
  },
  {
    id: 2,
    device: 'Realme C11',
    inspector: 'Eng. Sneha',
    condition: 'Back Panel Crack',
    quote: 1800,
    issues: 'Back Panel + Button Jam',
    status: 'Rejected',
    date: '2024-07-02',
    remarks: 'Back panel broken and buttons jammed',
    images: [],
    imei: '987654321098765',
  },
];

const InspectionResult = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleOpenModal = (row) => {
    setSelectedData(row);
    setShowModal(true);
  };

  const handleToast = (message, type = 'default') => {
    toast[type](message);
  };

  const filteredData = mockInspectionData.filter((item) => {
    const matchesSearch = `${item.device} ${item.inspector}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { name: '#', selector: (_, index) => index + 1, width: '60px' },
    { name: 'Device', selector: (row) => row.device },
    { name: 'Inspector', selector: (row) => row.inspector },
    { name: 'Condition', selector: (row) => row.condition },
    { name: 'Suggested Quote', selector: (row) => `₹${row.quote}` },
    { name: 'Issues Found', selector: (row) => row.issues },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button size="sm" variant="outline-primary" onClick={() => handleOpenModal(row)}>
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleToast(`Approved quote for ${row.device}`, 'success')}>
              <CheckCircle size={14} className="me-2 text-success" />
              Approve
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast(`Rejected quote for ${row.device}`, 'error')}>
              <XCircle size={14} className="me-2 text-danger" />
              Reject
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast(`Modify quote for ${row.device}`, 'info')}>
              <Pencil size={14} className="me-2 text-warning" />
              Modify Quote
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast(`Quote sent for ${row.device}`, 'success')}>
              <Send size={14} className="me-2 text-info" />
              Send Quote
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast('Tag note (coming soon)', 'default')}>
              <Tag size={14} className="me-2 text-secondary" />
              Tag Note
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  return (
    <div>
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        🧪 Inspection Results
      </h5>

      {/* Top Filters */}
      <Row className="g-3 align-items-end mb-3">
        <Col md={3}>
          <Form.Label className="fw-semibold">
            <Search size={16} className="me-2" />
            Search
          </Form.Label>
          <Form.Control
            placeholder="Search Device / Inspector"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Passed</option>
            <option>Rejected</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label>
            <CalendarDays size={16} className="me-2" />
            Date Range
          </Form.Label>
          <Form.Control type="text" disabled placeholder="Coming soon..." />
        </Col>

        <Col md="auto" className="d-flex align-items-center mt-4">
          <CSVLink
            data={filteredData}
            filename="inspection-results.csv"
            className="btn btn-outline-success"
          >
            Export CSV
          </CSVLink>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        striped
        highlightOnHover
        responsive
      />

      <InspectionReportModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedData}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default InspectionResult;
