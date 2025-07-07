import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
  Dropdown,
  ButtonGroup,
  Badge,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  Search,
  Wrench,
  UserCog,
  Clock,
  Layers,
  TabletSmartphone,
  Eye,
  ChevronDown,
  FileText,
  FileUp,
  ClipboardCheck,
  MessageCircleMore,
  Receipt,
  MoveRight,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockRepairs = [
  {
    orderId: 'R#202407',
    device: 'OnePlus 9',
    customer: 'Vishal S.',
    status: 'In QC',
    engineer: 'Eng. Rahul',
    rackSlot: 'B3',
    tat: 5.2,
    updated: '29-Jun, 12:44 PM',
  },
  {
    orderId: 'R#202408',
    device: 'iPhone 13',
    customer: 'Neha T.',
    status: 'Diagnosis',
    engineer: 'Eng. Karan',
    rackSlot: 'A1',
    tat: 8.4,
    updated: '30-Jun, 10:15 AM',
  },
  {
    orderId: 'R#202409',
    device: 'Samsung Galaxy S21',
    customer: 'Aman R.',
    status: 'Quote',
    engineer: 'Eng. Priya',
    rackSlot: 'C2',
    tat: 6.7,
    updated: '30-Jun, 01:22 PM',
  },
  {
    orderId: 'R#202410',
    device: 'Realme X7',
    customer: 'Kiran D.',
    status: 'New',
    engineer: 'Eng. Suman',
    rackSlot: 'D1',
    tat: 2.4,
    updated: '01-Jul, 09:00 AM',
  },
  {
    orderId: 'R#202411',
    device: 'Redmi Note 11',
    customer: 'Mehul P.',
    status: 'Completed',
    engineer: 'Eng. Rahul',
    rackSlot: 'B1',
    tat: 3.1,
    updated: '28-Jun, 04:45 PM',
  },
  {
    orderId: 'R#202412',
    device: 'Vivo V25',
    customer: 'Sneha J.',
    status: 'In QC',
    engineer: 'Eng. Karan',
    rackSlot: 'C1',
    tat: 4.6,
    updated: '02-Jul, 11:10 AM',
  },
  {
    orderId: 'R#202413',
    device: 'Nokia G20',
    customer: 'Deepak M.',
    status: 'Diagnosis',
    engineer: 'Eng. Vikas',
    rackSlot: 'E3',
    tat: 7.3,
    updated: '03-Jul, 02:30 PM',
  },
  {
    orderId: 'R#202414',
    device: 'iPad Air',
    customer: 'Pooja T.',
    status: 'Quote',
    engineer: 'Eng. Priya',
    rackSlot: 'F2',
    tat: 9.1,
    updated: '02-Jul, 03:50 PM',
  },
  {
    orderId: 'R#202415',
    device: 'MacBook Pro',
    customer: 'Siddharth G.',
    status: 'New',
    engineer: 'Eng. Suman',
    rackSlot: 'G1',
    tat: 10.0,
    updated: '04-Jul, 08:00 AM',
  },
  {
    orderId: 'R#202416',
    device: 'Dell Inspiron',
    customer: 'Rajesh K.',
    status: 'Completed',
    engineer: 'Eng. Karan',
    rackSlot: 'H2',
    tat: 6.0,
    updated: '01-Jul, 05:15 PM',
  },
];


const Repair = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    engineer: '',
    rackSlot: '',
    category: '',
    tat: '',
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const notify = (msg) => toast.success(msg);

  const filteredData = mockRepairs.filter((item) => {
    const matchesSearch = `${item.orderId} ${item.device}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filters.status ? item.status === filters.status : true;
    const matchesEngineer = filters.engineer ? item.engineer === filters.engineer : true;
    const matchesRack = filters.rackSlot ? item.rackSlot === filters.rackSlot : true;
    const matchesCategory = filters.category ? item.device.toLowerCase().includes(filters.category.toLowerCase()) : true;
    const matchesTAT = filters.tat ? item.tat > Number(filters.tat) : true;

    return matchesSearch && matchesStatus && matchesEngineer && matchesRack && matchesCategory && matchesTAT;
  });

  const columns = [
    { name: 'Order ID', selector: (row) => row.orderId, sortable: true },
    { name: 'Device', selector: (row) => row.device, sortable: true },
    { name: 'Customer', selector: (row) => row.customer },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge bg={
          row.status === 'In QC' ? 'info' :
          row.status === 'Diagnosis' ? 'warning' :
          row.status === 'Quote' ? 'primary' :
          row.status === 'Completed' ? 'success' :
          'secondary'
        }>
          {row.status}
        </Badge>
      ),
    },
    { name: 'Assigned Engineer', selector: (row) => row.engineer },
    { name: 'Rack/Slot', selector: (row) => row.rackSlot },
    { name: 'TAT (hrs)', selector: (row) => row.tat },
    { name: 'Last Updated', selector: (row) => row.updated },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => notify(`Viewing details of ${row.orderId}`)}
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item><MoveRight size={14} className="me-2" /> Update Status</Dropdown.Item>
            <Dropdown.Item><ClipboardCheck size={14} className="me-2" /> View/Add Diagnosis</Dropdown.Item>
            <Dropdown.Item><MessageCircleMore size={14} className="me-2" /> View/Send Quote</Dropdown.Item>
            <Dropdown.Item><FileUp size={14} className="me-2" /> Upload Image/Video</Dropdown.Item>
            <Dropdown.Item><Receipt size={14} className="me-2" /> Generate Invoice</Dropdown.Item>
            <Dropdown.Item><UserCog size={14} className="me-2" /> Assign/Reassign Engineer</Dropdown.Item>
            <Dropdown.Item><Layers size={14} className="me-2" /> Move Rack</Dropdown.Item>
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
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <Wrench size={20} className="me-2 text-danger" />
        All Repairs – Master View
      </h5>

      {/* 🔍 Filters */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={3}>
          <Form.Label><Search size={16} className="me-2" />Device ID / QR</Form.Label>
          <Form.Control
            placeholder="Search by Order ID or Device"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Status</Form.Label>
          <Form.Select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)}>
            <option value="">All</option>
            <option>New</option>
            <option>Diagnosis</option>
            <option>Quote</option>
            <option>In QC</option>
            <option>Completed</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Label>Engineer</Form.Label>
          <Form.Control
            placeholder="e.g., Eng. Rahul"
            value={filters.engineer}
            onChange={(e) => handleFilterChange('engineer', e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Rack / Slot</Form.Label>
          <Form.Control
            placeholder="e.g., B3"
            value={filters.rackSlot}
            onChange={(e) => handleFilterChange('rackSlot', e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Category</Form.Label>
          <Form.Select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)}>
            <option value="">All</option>
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Tablet</option>
          </Form.Select>
        </Col>
        <Col md={1}>
          <Form.Label>TAT ></Form.Label>
          <Form.Control
            type="number"
            placeholder="hrs"
            value={filters.tat}
            onChange={(e) => handleFilterChange('tat', e.target.value)}
          />
        </Col>
      </Row>

      {/* 📋 Table */}
      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          striped
          highlightOnHover
          responsive
        />
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Repair;
