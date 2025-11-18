import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge, // Import Badge for status/QC outcome styling
} from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Import DataTable
import { Eye } from 'lucide-react';
import WorkDetailModal from '../../../components/common/modal/WorkDetailModal';
import { ToastContainer, toast } from 'react-toastify'; // Ensure ToastContainer is imported
import 'react-toastify/dist/ReactToastify.css';

const mockData = [
  {
    id: 'WH-001', // Added unique ID for DataTable keying
    device: 'OnePlus Nord',
    task: 'Repair',
    date: '2024-06-27', // Changed to YYYY-MM-DD for date input compatibility
    status: 'Completed',
    qc: 'Pass',
    rating: '★★★★☆',
    notes: 'Replaced motherboard, tested thoroughly.',
    media: 'https://placehold.co/150x100/000000/FFFFFF?text=Media+1',
    engineer: 'Akash J.',
  },
  {
    id: 'WH-002',
    device: 'iPhone 13',
    task: 'QC',
    date: '2024-06-25',
    status: 'Pending',
    qc: 'Fail',
    rating: '★★★☆☆',
    notes: 'Battery drain issue found. Pending resolution.',
    media: '',
    engineer: 'Neha R.',
  },
  {
    id: 'WH-003',
    device: 'Redmi Note 10',
    task: 'Pickup',
    date: '2024-06-20',
    status: 'Missed',
    qc: 'N/A',
    rating: '☆☆☆☆☆',
    notes: 'Pickup was not attempted.',
    media: '',
    engineer: 'Akash J.',
  },
  {
    id: 'WH-004',
    device: 'Samsung S21',
    task: 'Inspection',
    date: '2024-07-01',
    status: 'Completed',
    qc: 'Pass',
    rating: '★★★★★',
    notes: 'Initial diagnosis complete.',
    media: '',
    engineer: 'Neha R.',
  },
  {
    id: 'WH-005',
    device: 'Google Pixel 7',
    task: 'Repair',
    date: '2024-07-02',
    status: 'In Progress',
    qc: 'N/A',
    rating: '★★★★☆',
    notes: 'Screen replacement in progress.',
    media: '',
    engineer: 'Akash J.',
  },
];

const WorkHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Filters
  const [filterEngineer, setFilterEngineer] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  /**
   * Handles viewing a detailed assignment record.
   * Sets the selected record and opens the WorkDetailModal.
   * @param {object} record - The work history record to view.
   */
  const handleView = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
    toast.info(`Viewing details for ${record.device} (${record.task})`);
  };

  // Apply filters to data
  const filteredData = mockData.filter((record) => {
    const recordDate = new Date(record.date);
    const filterMonthYear = filterMonth ? new Date(filterMonth).toISOString().slice(0, 7) : ''; // YYYY-MM
    const recordMonthYear = recordDate.toISOString().slice(0, 7); // YYYY-MM

    const matchEngineer = !filterEngineer || filterEngineer === 'All' || record.engineer === filterEngineer;
    const matchCategory = !filterCategory || filterCategory === 'All' || record.task === filterCategory;
    const matchStatus = !filterStatus || filterStatus === 'All' || record.status === filterStatus;
    const matchMonth = !filterMonth || recordMonthYear === filterMonthYear;

    return matchEngineer && matchCategory && matchStatus && matchMonth;
  });

  // Define columns for react-data-table-component
  const columns = [
    { name: 'Device', selector: (row) => row.device, sortable: true },
    { name: 'Task', selector: (row) => row.task, sortable: true },
    { name: 'Date', selector: (row) => row.date, sortable: true },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Completed'
              ? 'success'
              : row.status === 'Pending'
              ? 'warning'
              : row.status === 'Missed'
              ? 'danger'
              : row.status === 'In Progress'
              ? 'info'
              : 'secondary'
          }
          text={row.status === 'Pending' || row.status === 'In Progress' ? 'dark' : 'light'} // Ensure text color for warning/info badges
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'QC Outcome',
      selector: (row) => row.qc,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.qc === 'Pass'
              ? 'primary'
              : row.qc === 'Fail'
              ? 'danger'
              : 'secondary' // N/A
          }
        >
          {row.qc}
        </Badge>
      ),
    },
    { name: 'Rating', selector: (row) => row.rating, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handleView(row)}
          className="d-flex align-items-center" // For icon alignment
        >
          <Eye size={16} className="me-1" />
          View
        </Button>
      ),
      ignoreRowClick: true, // Prevents row click from interfering with button
      allowOverflow: true, // Ensures button is fully visible
      button: true, // Indicates this column contains a button
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">🕘 Work History</h5>

      {/* Filters */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Form.Label>Engineer</Form.Label>
          <Form.Select
            value={filterEngineer}
            onChange={(e) => setFilterEngineer(e.target.value)}
          >
            <option value="">All</option> {/* Added value="" for 'All' */}
            <option>Akash J.</option>
            <option>Neha R.</option>
            {/* Add more engineer options dynamically if available */}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Month / Year</Form.Label>
          <Form.Control
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All</option> {/* Added value="" for 'All' */}
            <option>Repair</option>
            <option>QC</option>
            <option>Pickup</option>
            <option>Inspection</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option> {/* Added value="" for 'All' */}
            <option>Completed</option>
            <option>Pending</option>
            <option>Missed</option>
            <option>In Progress</option> {/* Added In Progress status */}
            <option>QC Fail</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Metrics */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <h6>Total Assignments</h6>
            <h4 className="fw-bold text-primary">{filteredData.length}</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <h6>Average TAT</h6>
            {/* This would ideally be calculated from filteredData */}
            <h4 className="fw-bold text-success">1.8 hrs</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <h6>QC Pass Rate</h6>
            {/* This would ideally be calculated from filteredData */}
            <h4 className="fw-bold text-info">92%</h4>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm p-3">
            <h6>Late Assignments</h6>
            {/* This would ideally be calculated from filteredData */}
            <h4 className="fw-bold text-danger">6</h4>
          </Card>
        </Col>
      </Row>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent="No work history records found matching your filters."
      />

      {/* Detail Modal */}
      <WorkDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        record={selectedRecord}
      />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default WorkHistory;
