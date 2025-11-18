import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import {
  Search,
  Video,
  Eye,
  UserCheck,
  CheckCircle,
  XCircle,
  Archive,
  CalendarDays,
} from 'lucide-react';
import DataTable from 'react-data-table-component';
import RefurbTimelineModal from '../../../components/common/modal/RefurbTimelineModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockRefurbData = [
  {
    id: 'RFD101',
    device: 'Redmi 6A',
    batch: '#SCRP1021',
    engineer: 'Nisha M.',
    stage: 'Under Repair',
    qcStatus: 'Pending',
    date: '2024-07-02',
  },
  {
    id: 'RFD102',
    device: 'iPhone X',
    batch: '#SCRP1022',
    engineer: 'Rohit B.',
    stage: 'QC',
    qcStatus: 'Passed',
    date: '2024-07-03',
  },
];

const RefurbProcess = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  const handleUploadVideo = (row) => {
    toast.success(`Upload video for ${row.device}`);
  };

  const handleAssignQC = (row) => {
    toast.info(`Assigned QC Engineer for ${row.device}`);
  };

  const handleMarkPassed = (row) => {
    toast.success(`${row.device} marked as Passed`);
  };

  const handleMarkFailed = (row) => {
    toast.error(`${row.device} marked as Failed`);
  };

  // Filtering logic
  const filteredData = mockRefurbData.filter((item) => {
    const matchesSearch = item.device
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      !statusFilter || item.stage.toLowerCase() === statusFilter.toLowerCase();

    const matchesDate =
      !dateFilter || item.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const columns = [
    { name: 'Device', selector: (row) => row.device },
    { name: 'Scrap Batch', selector: (row) => row.batch },
    { name: 'Assigned Engineer', selector: (row) => row.engineer },
    { name: 'Current Stage', selector: (row) => row.stage },
    { name: 'QC Status', selector: (row) => row.qcStatus },
    {
      name: 'Media',
      cell: () => (
        <div>
          <Video size={18} className="me-2 text-danger" />
          <Eye size={18} className="text-primary" />
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => setShowTimelineModal(true)}
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleUploadVideo(row)}>
              <Video size={14} className="me-2" />
              Upload Repair Video
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAssignQC(row)}>
              <UserCheck size={14} className="me-2" />
              Assign QC Engineer
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMarkPassed(row)}>
              <CheckCircle size={14} className="me-2 text-success" />
              Mark as Passed
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMarkFailed(row)}>
              <XCircle size={14} className="me-2 text-danger" />
              Mark as Failed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <Archive size={18} className="me-2 text-success" />
        Refurb Progress
      </h5>

      {/* Filters */}
      <Row className="g-3 align-items-end mb-3">
        <Col md={4}>
          <Form.Label className="fw-semibold">
            <Search size={16} className="me-2" />
            Device Search
          </Form.Label>
          <Form.Control
            placeholder="Device ID / Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label className="fw-semibold">Refurb Status</Form.Label>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option>Under Repair</option>
            <option>QC</option>
            <option>Passed</option>
            <option>Failed</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label className="fw-semibold">
            <CalendarDays size={16} className="me-2" />
            Intake Date
          </Form.Label>
          <Form.Control
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </Col>
      </Row>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        striped
        highlightOnHover
        responsive
      />

      {/* Timeline Modal */}
      <RefurbTimelineModal
        show={showTimelineModal}
        onHide={() => setShowTimelineModal(false)}
      />

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default RefurbProcess;
