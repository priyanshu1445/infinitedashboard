import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Badge,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Import DataTable
import {
  Eye,
  Edit,
  KeyRound,
  ShieldOff,
  Calendar,
  PlusCircle,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Assuming this path is correct for your project structure
import AddEngineerModal from '../../../components/common/modal/AddEngineerModal';

// Initial mock data for engineers
const initialMockEngineers = [
  {
    id: 1,
    name: 'Akash Jain',
    contact: '9876543210',
    email: 'akash@example.com',
    skills: ['Mobile', 'QC'],
    status: 'Active',
    assignments: 3,
    rating: 4,
    availability: 'Online',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    contact: '8765432109',
    email: 'priya@example.com',
    skills: ['Laptop', 'Tablet'],
    status: 'Inactive',
    assignments: 0,
    rating: 5,
    availability: 'On Leave',
  },
  {
    id: 3,
    name: 'Rakesh Kumar',
    contact: '7654321098',
    email: 'rakesh@example.com',
    skills: ['Mobile', 'Laptop'],
    status: 'Active',
    assignments: 5,
    rating: 3,
    availability: 'On Field',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    contact: '6543210987',
    email: 'sneha@example.com',
    skills: ['QC', 'Tablet'],
    status: 'Suspended',
    assignments: 1,
    rating: 4,
    availability: 'Online',
  },
];

const AddEngineer = () => {
  const [engineers, setEngineers] = useState(initialMockEngineers); // State to manage engineers data
  const [showModal, setShowModal] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState(null); // To pass data to modal
  const [modalMode, setModalMode] = useState('add'); // 'add', 'view', 'edit'

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');

  /**
   * Handles various actions for an engineer, including opening the modal
   * in different modes and performing specific operations like suspend/reactivate.
   * @param {string} type - The type of action (e.g., 'view', 'edit', 'reset', 'suspend', 'schedule').
   * @param {object} eng - The engineer object on which the action is performed.
   */
  const handleAction = (type, eng) => {
    setSelectedEngineer(eng); // Always set selected engineer for context

    switch (type) {
      case 'view':
        setModalMode('view');
        setShowModal(true);
        toast.info(`Viewing profile: ${eng.name}`);
        break;
      case 'edit':
        setModalMode('edit');
        setShowModal(true);
        toast.info(`Editing details for: ${eng.name}`);
        break;
      case 'reset':
        // In a real app, this would trigger an API call to reset password
        toast.success(`Password reset initiated for: ${eng.name}`);
        break;
      case 'suspend':
        // Toggle status for demonstration purposes
        setEngineers((prevEngineers) =>
          prevEngineers.map((e) =>
            e.id === eng.id
              ? {
                  ...e,
                  status: e.status === 'Active' ? 'Suspended' : 'Active',
                }
              : e
          )
        );
        toast.warning(
          `${eng.status === 'Active' ? 'Suspended' : 'Reactivated'}: ${eng.name}`
        );
        break;
      case 'schedule':
        // In a real app, this would navigate to a schedule page or open a schedule modal
        toast.info(`Viewing schedule of: ${eng.name}`);
        break;
      default:
        toast.warn(`Unknown action for: ${eng.name}`);
    }
  };

  /**
   * Handles opening the modal for adding a new engineer.
   */
  const handleAddEngineerClick = () => {
    setSelectedEngineer(null); // Clear previous selection
    setModalMode('add'); // Set modal to add mode
    setShowModal(true);
  };

  // Filters the engineers data based on search query and selected filters
  const filteredEngineers = engineers.filter((eng) => {
    const matchSearch =
      searchQuery === '' ||
      eng.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eng.contact.includes(searchQuery) ||
      eng.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eng.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ); // Search in skills too

    const matchStatus = filterStatus === '' || filterStatus === 'All' || eng.status === filterStatus;
    const matchSkill = filterSkill === '' || filterSkill === 'All' || eng.skills.includes(filterSkill);
    const matchAvailability = filterAvailability === '' || filterAvailability === 'All' || eng.availability === filterAvailability;

    return matchSearch && matchStatus && matchSkill && matchAvailability;
  });

  // Define columns for react-data-table-component
  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      sortable: false, // Not typically sortable
      width: '50px',
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Contact',
      selector: (row) => row.contact,
      sortable: false,
    },
    {
      name: 'Skills',
      selector: (row) => row.skills.join(', '), // For default sorting/filtering
      sortable: true,
      cell: (row) => (
        <div>
          {row.skills.map((skill, sIdx) => (
            <Badge key={sIdx} bg="info" className="me-1">
              {skill}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Active'
              ? 'success'
              : row.status === 'Suspended'
              ? 'danger'
              : 'secondary' // Inactive
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Assignments',
      selector: (row) => row.assignments,
      sortable: true,
      center: true, // Center align numeric data
    },
    {
      name: 'Rating',
      selector: (row) => row.rating, // For sorting by number
      sortable: true,
      cell: (row) => (
        <span>{'★'.repeat(row.rating)}{'☆'.repeat(5 - row.rating)}</span>
      ),
      center: true,
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
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          {/* Dropdown Menu */}
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleAction('edit', row)}
              className="d-flex align-items-center"
            >
              <Edit size={14} className="me-2 text-secondary" /> Edit Details
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleAction('reset', row)}
              className="d-flex align-items-center"
            >
              <KeyRound size={14} className="me-2 text-warning" /> Reset Password
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleAction('suspend', row)}
              className="d-flex align-items-center"
            >
              <ShieldOff size={14} className="me-2 text-danger" />{' '}
              {row.status === 'Active' ? 'Suspend' : 'Reactivate'}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleAction('schedule', row)}
              className="d-flex align-items-center"
            >
              <Calendar size={14} className="me-2 text-dark" /> View Schedule
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
      <h5 className="fw-bold mb-4">➕ Add / View Engineers</h5>

      {/* Filter and Search Section */}
      <Row className="mb-4 g-3 align-items-end">
        <Col md={3}>
          <Form.Label>🔍 Search</Form.Label>
          <Form.Control
            placeholder="Name / Phone / Email / Skill"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Skill Type</Form.Label>
          <Form.Select
            value={filterSkill}
            onChange={(e) => setFilterSkill(e.target.value)}
          >
            <option value="">All</option>
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Tablet</option>
            <option>QC</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Availability</Form.Label>
          <Form.Select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
          >
            <option value="">All</option>
            <option>Online</option>
            <option>On Field</option>
            <option>On Leave</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Add Engineer Button */}
      <div className="mb-3 text-end">
        <Button onClick={handleAddEngineerClick} variant="primary">
          <PlusCircle size={18} className="me-2" /> Add Engineer
        </Button>
      </div>

      {/* Engineers DataTable */}
      <DataTable
        columns={columns}
        data={filteredEngineers}
        pagination
        striped
        highlightOnHover
        responsive
        noDataComponent="No engineers found matching your criteria."
      />

      {/* Add/Edit/View Engineer Modal */}
      <AddEngineerModal
        show={showModal}
        onHide={() => setShowModal(false)}
        engineer={selectedEngineer} // Pass selected engineer data
        mode={modalMode} // Pass modal mode ('add', 'view', 'edit')
        // You might want to add an onSave prop here to handle updates/additions
        // onSave={(updatedEngineer) => { /* logic to update engineers state */ }}
      />

      {/* Toast notifications container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AddEngineer;