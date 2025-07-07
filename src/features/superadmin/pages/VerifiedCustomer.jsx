import React, { useState } from 'react';
import { Button, Col, Form, Row, Dropdown, ButtonGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Eye, Wallet, Ticket, UserX, Search, Smartphone, Repeat, FileDown } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import VerifiedCustomerModal from '../../../components/common/modal/VerifiedCustomerModal'; // Adjust path
import '../../../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

const mockCustomers = [
  {
    id: 1,
    name: 'Aditi Verma',
    email: 'aditi@example.com',
    phone: '98765xxxxx',
    city: 'Delhi',
    services: 3,
    wallet: 350,
    joined: '10-Jun',
    kycStatus: 'Approved',
    devices: ['iPhone 11', 'Samsung M30'],
    walletLogs: [],
    rewardPoints: 120,
    tickets: [],
  },
  {
    id: 2,
    name: 'Rajeev Singh',
    email: 'rajeev@example.com',
    phone: '98231xxxxx',
    city: 'Mumbai',
    services: 5,
    wallet: 120,
    joined: '08-Jun',
    kycStatus: 'Pending',
    devices: ['Realme 8 Pro'],
    walletLogs: [],
    rewardPoints: 60,
    tickets: [],
  },
  {
    id: 3,
    name: 'Pooja Sharma',
    email: 'pooja@example.com',
    phone: '98321xxxxx',
    city: 'Bangalore',
    services: 2,
    wallet: 200,
    joined: '12-Jun',
    kycStatus: 'Approved',
    devices: ['Samsung S21'],
    walletLogs: [],
    rewardPoints: 80,
    tickets: [],
  },
  {
    id: 4,
    name: 'Aman Mehra',
    email: 'aman@example.com',
    phone: '98711xxxxx',
    city: 'Hyderabad',
    services: 1,
    wallet: 50,
    joined: '15-Jun',
    kycStatus: 'Rejected',
    devices: ['OnePlus 9'],
    walletLogs: [],
    rewardPoints: 20,
    tickets: [],
  },
  {
    id: 5,
    name: 'Sneha Kapoor',
    email: 'sneha@example.com',
    phone: '98650xxxxx',
    city: 'Pune',
    services: 4,
    wallet: 300,
    joined: '18-Jun',
    kycStatus: 'Approved',
    devices: ['iPhone 13 Pro'],
    walletLogs: [],
    rewardPoints: 100,
    tickets: [],
  },
  {
    id: 6,
    name: 'Vikram Rao',
    email: 'vikram@example.com',
    phone: '98531xxxxx',
    city: 'Chennai',
    services: 2,
    wallet: 150,
    joined: '20-Jun',
    kycStatus: 'Pending',
    devices: ['Samsung Note 10', 'iPhone XR'],
    walletLogs: [],
    rewardPoints: 90,
    tickets: [],
  },
  {
    id: 7,
    name: 'Megha Desai',
    email: 'megha@example.com',
    phone: '98475xxxxx',
    city: 'Ahmedabad',
    services: 6,
    wallet: 400,
    joined: '22-Jun',
    kycStatus: 'Approved',
    devices: ['Pixel 6', 'OnePlus 8T'],
    walletLogs: [],
    rewardPoints: 180,
    tickets: [],
  },
  {
    id: 8,
    name: 'Nikhil Tiwari',
    email: 'nikhil@example.com',
    phone: '98800xxxxx',
    city: 'Kolkata',
    services: 3,
    wallet: 220,
    joined: '25-Jun',
    kycStatus: 'Pending',
    devices: ['Realme GT', 'iPhone 12'],
    walletLogs: [],
    rewardPoints: 75,
    tickets: [],
  },
  {
    id: 9,
    name: 'Anjali Rao',
    email: 'anjali@example.com',
    phone: '98100xxxxx',
    city: 'Noida',
    services: 2,
    wallet: 180,
    joined: '27-Jun',
    kycStatus: 'Approved',
    devices: ['Samsung A52'],
    walletLogs: [],
    rewardPoints: 55,
    tickets: [],
  },
  {
    id: 10,
    name: 'Rohit Khanna',
    email: 'rohit@example.com',
    phone: '98012xxxxx',
    city: 'Gurgaon',
    services: 1,
    wallet: 90,
    joined: '29-Jun',
    kycStatus: 'Rejected',
    devices: ['iPhone SE 2020'],
    walletLogs: [],
    rewardPoints: 30,
    tickets: [],
  },
];


const VerifiedCustomer = () => {
  const [search, setSearch] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [serviceCount, setServiceCount] = useState('');
  const [repeatOnly, setRepeatOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const notify = (msg) => toast.success(msg);

  const filteredData = mockCustomers.filter((c) => {
    const query = `${c.name} ${c.email} ${c.phone} ${c.city}`.toLowerCase();
    const matchesSearch = query.includes(search.toLowerCase());
    const matchesDevice = deviceType ? c.devices?.some(d => d.includes(deviceType)) : true;
    const matchesService = serviceCount ? c.services >= Number(serviceCount) : true;
    const matchesRepeat = repeatOnly ? c.services > 1 : true;
    return matchesSearch && matchesDevice && matchesService && matchesRepeat;
  });

  const columns = [
    { name: '#', selector: (row, i) => i + 1, width: '50px' },
    { name: 'Name', selector: (row) => row.name },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Phone', selector: (row) => row.phone },
    { name: 'City', selector: (row) => row.city },
    { name: 'Services Availed', selector: (row) => row.services },
    {
      name: 'Wallet Balance',
      selector: (row) => row.wallet,
      cell: (row) => `₹${row.wallet}`,
    },
    { name: 'Joined On', selector: (row) => row.joined },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
              setSelectedCustomer(row);
              setShowModal(true);
            }}
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => notify(`Credit wallet for ${row.name}`)}>
              <Wallet size={14} className="me-2" /> Credit Wallet
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`View tickets for ${row.name}`)}>
              <Ticket size={14} className="me-2" /> View Tickets
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`Disabled ${row.name}'s account`)}>
              <UserX size={14} className="me-2" /> Disable / Delete
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
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <Eye size={18} className="me-2 text-primary" />
        Verified Customers
      </h5>

      {/* Filters */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={4}>
          <Form.Label className="d-flex align-items-center">
            <Search size={16} className="me-2" /> Search
          </Form.Label>
          <Form.Control
            placeholder="By Name / Email / Phone / City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Label className="d-flex align-items-center">
            <Smartphone size={16} className="me-2" /> Device Type
          </Form.Label>
          <Form.Select value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
            <option value="">All</option>
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Realme">Realme</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label>Min Services</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 2"
            value={serviceCount}
            onChange={(e) => setServiceCount(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Check
              type="checkbox"
              label={<><Repeat size={14} className="me-2" /> Repeat Only</>}
              checked={repeatOnly}
              onChange={(e) => setRepeatOnly(e.target.checked)}
            />
            <CSVLink
              data={filteredData}
              filename="verified-customers.csv"
              className="btn btn-outline-secondary btn-sm ms-2"
            >
              <FileDown size={14} className="me-1" /> Export CSV
            </CSVLink>
          </div>
        </Col>
      </Row>

      {/* Table */}
      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          striped
        />
      </div>

      {/* Modal */}
      <VerifiedCustomerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        customer={selectedCustomer}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VerifiedCustomer;
