import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Import DataTable
import { Eye, FileText, StickyNote } from 'lucide-react';
import AssignmentDetailsModal from '../../../components/common/modal/AssignmentDetailsModal';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const mockLogs = [
  {
    id: 'ASN-001', // Added unique ID for better keying and potential future use
    date: '2024-06-28', // Changed to YYYY-MM-DD for date input compatibility
    engineer: 'Akash J.',
    type: 'Repair',
    device: 'iPhone 11',
    customer: 'A. Mehta',
    status: 'Completed',
    timeTaken: '2.1 hrs',
    task: 'Replaced charging IC and tested speaker.',
    startTime: '10:00 AM',
    endTime: '12:06 PM',
    remarks: 'All tests passed. Ready for dispatch.',
    rackMovement: 'Moved from B2 to C1',
    media: '[https://placehold.co/150x100/000000/FFFFFF?text=Media+1](https://placehold.co/150x100/000000/FFFFFF?text=Media+1)', // Updated placeholder
  },
  {
    id: 'ASN-002',
    date: '2024-06-29',
    engineer: 'Neha K.',
    type: 'QC',
    device: 'OnePlus Nord',
    customer: 'S. Reddy',
    status: 'In Progress',
    timeTaken: '1.5 hrs',
    task: 'Conducting QC tests for screen touch sensitivity.',
    startTime: '11:00 AM',
    endTime: '',
    remarks: 'Midway through tests.',
    rackMovement: '',
    media: '',
  },
  {
    id: 'ASN-003',
    date: '2024-06-30',
    engineer: 'Raj S.',
    type: 'Pickup',
    device: 'Redmi Note 10',
    customer: 'P. Gupta',
    status: 'Completed',
    timeTaken: '0.8 hrs',
    task: 'Collected device from customer address.',
    startTime: '9:30 AM',
    endTime: '10:20 AM',
    remarks: 'Pickup successful.',
    rackMovement: 'Placed in A1',
    media: '[https://placehold.co/100x80/000000/FFFFFF?text=Media+2](https://placehold.co/100x80/000000/FFFFFF?text=Media+2)',
  },
  {
    id: 'ASN-004',
    date: '2024-07-01',
    engineer: 'Pooja M.',
    type: 'Inspection',
    device: 'Dell Inspiron 15',
    customer: 'K. Khan',
    status: 'Completed',
    timeTaken: '3 hrs',
    task: 'Full hardware and software diagnosis.',
    startTime: '12:00 PM',
    endTime: '3:00 PM',
    remarks: 'Fan and thermal paste issue found.',
    rackMovement: 'Moved from D4 to Repair Bench',
    media: '',
  },
  {
    id: 'ASN-005',
    date: '2024-07-02',
    engineer: 'Rakesh N.',
    type: 'Repair',
    device: 'Samsung M33',
    customer: 'L. Dsouza',
    status: 'Pending',
    timeTaken: '',
    task: '',
    startTime: '',
    endTime: '',
    remarks: '',
    rackMovement: '',
    media: '',
  },
  {
    id: 'ASN-006',
    date: '2024-07-02',
    engineer: 'Anjali R.',
    type: 'QC',
    device: 'MacBook Air',
    customer: 'A. Sharma',
    status: 'Completed',
    timeTaken: '1.9 hrs',
    task: 'Battery cycle check and keyboard test.',
    startTime: '2:00 PM',
    endTime: '3:54 PM',
    remarks: 'Device cleared all QC stages.',
    rackMovement: 'Moved to Dispatch Shelf',
    media: '[https://placehold.co/120x90/000000/FFFFFF?text=Media+3](https://placehold.co/120x90/000000/FFFFFF?text=Media+3)',
  },
  {
    id: 'ASN-007',
    date: '2024-07-03',
    engineer: 'Vikas T.',
    type: 'Repair',
    device: 'iPad Pro',
    customer: 'S. Yadav',
    status: 'Completed',
    timeTaken: '4 hrs',
    task: 'Replaced LCD and digitizer.',
    startTime: '10:00 AM',
    endTime: '2:00 PM',
    remarks: 'Replaced successfully. Calibrated.',
    rackMovement: 'From E3 to C2',
    media: '',
  },
];

const AssignmentLogs = () => {
  // State for filters
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterEngineer, setFilterEngineer] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // State for modal
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * Handles the 'View Detailed Assignment' action.
   * Sets the selected assignment and opens the modal.
   * @param {object} assignment - The assignment log object to view.
   */
  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
    toast.info(`Viewing details for assignment by ${assignment.engineer} on ${assignment.date}`);
  };

  /**
   * Handles the 'Add Note' action.
   * @param {object} assignment - The assignment log object to add a note to.
   */
  const handleAddNote = (assignment) => {
    toast.info(`Adding note for assignment by ${assignment.engineer} on ${assignment.date}`);
    // Future logic: Potentially open a specific note-taking modal
  };

  /**
   * Handles the 'Download Report (PDF)' action.
   * @param {object} assignment - The assignment log object to download a report for.
   */
  const handleDownloadReport = (assignment) => {
    toast.success(`Downloading report for assignment by ${assignment.engineer} on ${assignment.date}`);
    // Future logic: Trigger PDF generation/download
  };

  // Filters the mock logs based on selected criteria
  const filteredLogs = mockLogs.filter((log) => {
    const matchType = !filterType || filterType === 'All' || log.type === filterType;
    const matchCategory = !filterCategory || log.device.toLowerCase().includes(filterCategory.toLowerCase());
    const matchEngineer = !filterEngineer || log.engineer.toLowerCase().includes(filterEngineer.toLowerCase());
    const matchDate = !filterDate || log.date === filterDate; // Date format YYYY-MM-DD

    return matchType && matchCategory && matchEngineer && matchDate;
  });

  // Define columns for react-data-table-component
  const columns = [
    { name: 'Date', selector: (row) => row.date, sortable: true },
    { name: 'Engineer', selector: (row) => row.engineer, sortable: true },
    { name: 'Type', selector: (row) => row.type, sortable: true },
    { name: 'Device', selector: (row) => row.device, sortable: true },
    { name: 'Customer', selector: (row) => row.customer, sortable: true },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`badge ${
            row.status === 'Completed'
              ? 'bg-success'
              : row.status === 'In Progress'
              ? 'bg-info text-dark'
              : row.status === 'Pending'
              ? 'bg-warning text-dark'
              : 'bg-secondary' // Default for other statuses
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { name: 'Time Taken', selector: (row) => row.timeTaken, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup} align="end"> {/* Added align="end" for dropdown menu alignment */}
          <Button variant="outline-primary" size="sm">
            Actions
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleView(row)}
              className="d-flex align-items-center" // For icon alignment
            >
              <Eye size={14} className="me-2 text-primary" />
              View Detailed Assignment
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleAddNote(row)}
              className="d-flex align-items-center" // For icon alignment
            >
              <StickyNote size={14} className="me-2 text-info" />
              Add Note
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleDownloadReport(row)}
              className="d-flex align-items-center" // For icon alignment
            >
              <FileText size={14} className="me-2 text-success" />
              Download Report (PDF)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true, // Prevents row click from interfering with dropdown
      allowOverflow: true, // Allows dropdown to overflow table boundaries
      button: true, // Indicates this column contains buttons/actions
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">📋 Assignment Logs</h5>

      {/* Filters */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Form.Label>Engineer Name</Form.Label>
          <Form.Control
            placeholder="Search engineer"
            value={filterEngineer}
            onChange={(e) => setFilterEngineer(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Assignment Type</Form.Label>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option>Repair</option>
            <option>QC</option>
            <option>Pickup</option>
            <option>Inspection</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Device Category</Form.Label>
          <Form.Control
            placeholder="e.g. iPhone, Laptop"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
        </Col>
      </Row>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent="No assignment logs found matching your criteria."
      />

      {/* Modal */}
      <AssignmentDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedAssignment}
      />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AssignmentLogs;