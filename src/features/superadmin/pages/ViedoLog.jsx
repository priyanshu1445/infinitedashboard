import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  Eye,
  Download,
  CheckCircle,
  FileText,
  Share2,
  MessageSquare,
  Wrench, // New: For Assign Appointment
  Clock, // New: For Block Slot / Leave
  Edit, // New: For Edit Working Hours
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assuming this path is correct for your project structure
import VideoLogActionModal from '../../../components/common/modal/VideoLogActionModal';

// Mock data for demonstration
const mockLogs = [
  {
    id: 'VC-20892',
    customer: 'Ritu S.',
    engineer: 'Nikhil G.',
    platform: 'Zoom',
    duration: '23 mins',
    status: 'Completed',
  },
  {
    id: 'VC-20893',
    customer: 'Amit P.',
    engineer: 'Sneha K.',
    platform: 'Google Meet',
    duration: '0 mins',
    status: 'Missed',
  },
  {
    id: 'VC-20894',
    customer: 'Riya K.',
    engineer: 'Rohit M.',
    platform: 'Teams',
    duration: '12 mins',
    status: 'No Show',
  },
  {
    id: 'VC-20895',
    customer: 'Priya A.',
    engineer: 'Ankit B.',
    platform: 'Zoom',
    duration: '5 mins',
    status: 'Failed',
  },
  {
    id: 'VC-20896',
    customer: 'Sameer J.',
    engineer: 'Pooja V.',
    platform: 'Google Meet',
    duration: '30 mins',
    status: 'Completed',
  },
];

const VideoLog = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [platform, setPlatform] = useState(''); // Initial state for platform filter
  const [selectedLog, setSelectedLog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * Handles various actions triggered from the table,
   * showing toasts and potentially opening a modal.
   * @param {string} type - The type of action (e.g., 'view', 'download', 'assign').
   * @param {object} log - The log object related to the action.
   */
  const handleAction = (type, log) => {
    setSelectedLog(log); // Set the selected log for the modal
    setShowModal(true); // Open the modal for any action

    switch (type) {
      case 'view':
        toast.info(`Viewing details for: ${log.id}`);
        break;
      case 'download':
        toast.info(`Downloading report: ${log.id}`);
        break;
      case 'markBilled':
        toast.success(`Marked as billed: ${log.id}`);
        break;
      case 'notes':
        toast.info(`Showing engineer notes for: ${log.id}`);
        break;
      case 'feedback':
        toast.info(`Adding feedback for: ${log.id}`);
        break;
      case 'share':
        toast.info(`Sharing report: ${log.id}`);
        break;
      case 'assign': // New Action
        toast.info(`Assigning appointment for ${log.customer} (Call ID: ${log.id})`);
        break;
      case 'leave': // New Action
        toast.info(`Blocking slot/leave for ${log.engineer} (Call ID: ${log.id})`);
        break;
      case 'edit': // New Action
        toast.info(`Editing working hours for ${log.engineer} (Call ID: ${log.id})`);
        break;
      default:
        toast.warn(`Unknown action: ${type}`);
    }
  };

  // Filters the mock logs based on search, status, and platform criteria
  const filteredLogs = mockLogs.filter((log) => {
    const matchSearch =
      log.customer.toLowerCase().includes(search.toLowerCase()) ||
      log.engineer.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase()); // Also search by call ID
    const matchStatus = !status || log.status === status;
    const matchPlatform = !platform || log.platform === platform;
    return matchSearch && matchStatus && matchPlatform;
  });

  // Defines the columns for the DataTable component
  const columns = [
    { name: 'Call ID', selector: (row) => row.id, sortable: true },
    { name: 'Customer', selector: (row) => row.customer, sortable: true },
    { name: 'Engineer', selector: (row) => row.engineer, sortable: true },
    { name: 'Platform', selector: (row) => row.platform, sortable: true },
    { name: 'Duration', selector: (row) => row.duration, sortable: true },
    {
      name: 'Status',
      cell: (row) => (
        <span
          className={`badge ${
            row.status === 'Completed'
              ? 'bg-success'
              : row.status === 'Missed'
              ? 'bg-warning text-dark'
              : row.status === 'No Show'
              ? 'bg-secondary'
              : row.status === 'Failed'
              ? 'bg-danger'
              : 'bg-info' // Default or other status
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup} align="end">
          {/* View Button */}
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleAction('view', row)}
            className="d-flex align-items-center"
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          {/* Dropdown Toggle */}
          <Dropdown.Toggle
            split
            size="sm"
            variant="outline-primary"
            id={`dropdown-split-${row.id}`}
            aria-label={`Actions for call ${row.id}`}
          />
          {/* Dropdown Menu */}
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleAction('download', row)}>
              <Download size={14} className="me-2 text-info" />
              Download Report
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('markBilled', row)}>
              <CheckCircle size={14} className="me-2 text-success" />
              Mark as Billed
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('notes', row)}>
              <FileText size={14} className="me-2 text-dark" />
              Engineer Notes
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('feedback', row)}>
              <MessageSquare size={14} className="me-2 text-warning" />
              Add Feedback
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('share', row)}>
              <Share2 size={14} className="me-2 text-primary" />
              Share Report
            </Dropdown.Item>
            <Dropdown.Divider /> {/* Separator for the new actions */}
            {/* New Actions as per your request */}
            <Dropdown.Item onClick={() => handleAction('assign', row)}>
              <Wrench size={14} className="me-2 text-info" />
              Assign Appointment
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('leave', row)}>
              <Clock size={14} className="me-2 text-warning" />
              Block Slot / Leave
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('edit', row)}>
              <Edit size={14} className="me-2 text-success" />
              Edit Working Hours
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true, // Indicates this column contains buttons/actions
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">🎥 Video Call Logs</h5>

      {/* Filter controls */}
      <Row className="g-3 mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search Customer, Engineer, or Call ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Call Statuses</option>
            <option>Completed</option>
            <option>Missed</option>
            <option>No Show</option>
            <option>Failed</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="">All Platforms</option>
            <option value="Zoom">Zoom</option>
            <option value="Google Meet">Google Meet</option>
            <option value="Teams">Microsoft Teams</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent="No video call logs to display." // Message when no data is found
      />

      {/* Modal for displaying details/performing actions */}
      <VideoLogActionModal
        show={showModal}
        onHide={() => setShowModal(false)}
        log={selectedLog}
      />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VideoLog;