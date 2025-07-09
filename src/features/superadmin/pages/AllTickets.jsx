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
  MessageSquare,
  Repeat,
  AlertCircle,
  CheckCircle,
  Flag,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// Assuming this path is correct for your project structure
import TicketDetailModal from '../../../components/common/modal/TicketDetailModal';

const mockTickets = [
  {
    id: 'TCKT-8123',
    customer: 'Arjun Mehta',
    summary: 'No audio after repair',
    priority: 'High',
    status: 'In Progress',
    assigned: 'Eng. Rakesh',
    updated: '2 hrs ago',
    device: 'iPhone 11',
    orderId: 'ORD-2391',
    source: 'App',
  },
  {
    id: 'TCKT-8124',
    customer: 'Sneha Roy',
    summary: 'Battery draining fast',
    priority: 'Medium',
    status: 'Open',
    assigned: 'Eng. Priya',
    updated: '1 day ago',
    device: 'Samsung S21',
    orderId: 'ORD-2392',
    source: 'WhatsApp',
  },
  {
    id: 'TCKT-8125',
    customer: 'Rahul Sharma',
    summary: 'Screen cracked',
    priority: 'High',
    status: 'Open',
    assigned: 'Eng. Rakesh',
    updated: '30 mins ago',
    device: 'Google Pixel 6',
    orderId: 'ORD-2393',
    source: 'Call',
  },
  {
    id: 'TCKT-8126',
    customer: 'Priya Singh',
    summary: 'Software update failed',
    priority: 'Low',
    status: 'Resolved',
    assigned: 'Eng. Priya',
    updated: '2 days ago',
    device: 'OnePlus 9',
    orderId: 'ORD-2394',
    source: 'Email',
  },
];

const AllTickets = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /**
   * Handles various actions triggered from the table's dropdown menu.
   * Sets the selected ticket and opens the modal, and shows a toast notification.
   * @param {string} type - The type of action (e.g., 'view', 'addReply', 'changeStatus').
   * @param {object} ticket - The ticket object related to the action.
   */
  const handleAction = (type, ticket) => {
    setSelectedTicket(ticket); // Set the selected ticket for the modal
    setShowModal(true); // Open the modal for any action

    switch (type) {
      case 'view':
        toast.info(`Viewing details for Ticket ID: ${ticket.id}`);
        break;
      case 'addReply':
        toast.info(`Adding reply for Ticket ID: ${ticket.id}`);
        break;
      case 'changeStatus':
        toast.info(`Changing status for Ticket ID: ${ticket.id}`);
        break;
      case 'changePriority':
        toast.info(`Changing priority for Ticket ID: ${ticket.id}`);
        break;
      case 'reassign':
        toast.info(`Reassigning Ticket ID: ${ticket.id}`);
        break;
      case 'closeTicket':
        toast.success(`Closing Ticket ID: ${ticket.id}`);
        break;
      default:
        toast.warn(`Unknown action: ${type}`);
    }
  };

  // Filters the mock tickets based on search, status, and priority criteria
  const filteredTickets = mockTickets.filter((t) => {
    const matchSearch =
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.summary.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || t.status === status;
    const matchPriority = !priority || t.priority === priority;
    return matchSearch && matchStatus && matchPriority;
  });

  // Defines the columns for the DataTable component
  const columns = [
    { name: 'Ticket ID', selector: (row) => row.id, sortable: true },
    { name: 'Customer', selector: (row) => row.customer, sortable: true },
    { name: 'Issue Summary', selector: (row) => row.summary, sortable: true },
    {
      name: 'Priority',
      cell: (row) => (
        <span
          className={`badge ${
            row.priority === 'High'
              ? 'bg-danger'
              : row.priority === 'Medium'
              ? 'bg-warning text-dark'
              : 'bg-secondary' // For 'Low' priority
          }`}
        >
          {row.priority}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row) => (
        <span
          className={`badge ${
            row.status === 'Open'
              ? 'bg-primary'
              : row.status === 'In Progress'
              ? 'bg-info text-dark'
              : row.status === 'Resolved'
              ? 'bg-success'
              : row.status === 'Closed'
              ? 'bg-dark'
              : 'bg-secondary' // Default or other status
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    { name: 'Assigned To', selector: (row) => row.assigned, sortable: true },
    { name: 'Last Updated', selector: (row) => row.updated, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup} align="end"> {/* Added align="end" for dropdown menu alignment */}
          {/* View Button */}
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleAction('view', row)} // Call handleAction for View
            className="d-flex align-items-center" // Added for consistent icon-text alignment
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          {/* Dropdown Toggle */}
          <Dropdown.Toggle
            split
            size="sm"
            variant="outline-primary"
            id={`dropdown-split-${row.id}`} // Unique ID for accessibility
            aria-label={`Actions for ticket ${row.id}`}
          />
          {/* Dropdown Menu */}
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleAction('addReply', row)}>
              <MessageSquare size={14} className="me-2 text-primary" /> Add Reply
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('changeStatus', row)}>
              <Repeat size={14} className="me-2 text-warning" /> Change Status
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('changePriority', row)}>
              <Flag size={14} className="me-2 text-danger" /> Change Priority
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('reassign', row)}>
              <AlertCircle size={14} className="me-2 text-dark" /> Reassign
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('closeTicket', row)}>
              <CheckCircle size={14} className="me-2 text-success" /> Close Ticket
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true, // Important for react-data-table-component to render buttons correctly
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">📂 All Tickets</h5>

      {/* Filter controls */}
      <Row className="g-3 mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search Ticket ID, Customer, or Issue"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option> {/* Added "All Statuses" option */}
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">All Priorities</option> {/* Added "All Priorities" option */}
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredTickets}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent="No tickets to display." // Message when no data is found
      />

      {/* Modal for displaying ticket details */}
      <TicketDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        ticket={selectedTicket}
      />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AllTickets;