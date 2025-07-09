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
  Eye,
  Wrench,
  Clock,
  Edit,
  SlidersHorizontal,
} from 'lucide-react';
import DataTable from 'react-data-table-component';
import AutoAssignmentSettingsModal from '../../../components/common/modal/AutoAssignmentSettingsModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockEngineers = [
  {
    id: 1,
    name: 'Ankit R.',
    expertise: 'Laptop, Tablet',
    appointments: 3,
    slots: 2,
    rating: 4,
  },
  {
    id: 2,
    name: 'Sneha K.',
    expertise: 'Mobile',
    appointments: 5,
    slots: 0,
    rating: 5,
  },
  {
    id: 3,
    name: 'Rohit M.',
    expertise: 'Laptop, Mobile',
    appointments: 2,
    slots: 3,
    rating: 3,
  },
];

const EngineerAllocation = () => {
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [availability, setAvailability] = useState('');
  const [limit, setLimit] = useState('');
  const [showModal, setShowModal] = useState(false);

  const renderStars = (count) => {
    return '★★★★★☆☆☆☆☆'.slice(5 - count, 10 - count);
  };

  const filteredData = mockEngineers.filter((eng) => {
    const matchSearch = eng.name.toLowerCase().includes(search.toLowerCase());
    const matchSpec = !specialization || eng.expertise.toLowerCase().includes(specialization.toLowerCase());
    const matchLimit = !limit || (limit === '<5' ? eng.appointments < 5 : eng.appointments < 3);
    return matchSearch && matchSpec && matchLimit;
  });

  const handleAction = (type, name) => {
    if (type === 'assign') {
      toast.success(`Appointment assigned to ${name}`);
    } else if (type === 'leave') {
      toast.info(`${name}'s slot marked as blocked`);
    } else if (type === 'edit') {
      toast.warning(`Working hours updated for ${name}`);
    } else {
      toast(`Action executed for ${name}`);
    }
  };

  const columns = [
    {
      name: 'Engineer',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Expertise',
      selector: (row) => row.expertise,
    },
    {
      name: 'Appointments Today',
      selector: (row) => row.appointments,
      sortable: true,
    },
    {
      name: 'Available Slots',
      selector: (row) => row.slots,
    },
    {
      name: 'Avg. Rating',
      selector: (row) => renderStars(row.rating),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => toast.info(`Viewing schedule for ${row.name}`)}
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleAction('assign', row.name)}>
              <Wrench size={14} className="me-2 text-info" />
              Assign Appointment
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('leave', row.name)}>
              <Clock size={14} className="me-2 text-warning" />
              Block Slot / Leave
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleAction('edit', row.name)}>
              <Edit size={14} className="me-2 text-success" />
              Edit Working Hours
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold">👨‍🔧 Engineer Allocation</h5>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setShowModal(true)}
        >
          <SlidersHorizontal size={16} className="me-2" />
          Auto-Assignment Settings
        </Button>
      </div>

      {/* Filters */}
      <Row className="g-3 mb-3">
        <Col md={3}>
          <Form.Control
            placeholder="Search Engineer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={specialization} onChange={(e) => setSpecialization(e.target.value)}>
            <option value="">Specialization</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Availability</option>
            <option>Online</option>
            <option>On Call</option>
            <option>Idle</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="">Daily Limit</option>
            <option value="<5">{'<'} 5 Appointments</option>
            <option value="<3">{'<'} 3 Appointments</option>
          </Form.Select>
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

      {/* Modal */}
      <AutoAssignmentSettingsModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default EngineerAllocation;
