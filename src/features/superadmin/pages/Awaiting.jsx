import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { ScanLine, Wrench, Search } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import AwaitingModal from '../../../components/common/modal/AwaitingModal';

const mockAwaitingOrders = [
  {
    id: 1,
    device: 'Redmi Note 10',
    customer: 'Aarav Mehta',
    intakeTime: '29-Jun, 9:30AM',
    engineer: 'Eng. Suman',
    tat: 3.8,
    qrCode: 'Scan Now',
  },
  {
    id: 2,
    device: 'Samsung A32',
    customer: 'Ritika Rao',
    intakeTime: '30-Jun, 11:15AM',
    engineer: 'Eng. Vikas',
    tat: 2.2,
    qrCode: 'Scan Now',
  },
  {
    id: 3,
    device: 'iPhone 11',
    customer: 'Neha Kapoor',
    intakeTime: '01-Jul, 10:00AM',
    engineer: 'Eng. Rahul',
    tat: 4.1,
    qrCode: 'Scan Now',
  },
  {
    id: 4,
    device: 'OnePlus Nord',
    customer: 'Amit Verma',
    intakeTime: '30-Jun, 03:45PM',
    engineer: 'Eng. Suman',
    tat: 5.6,
    qrCode: 'Scan Now',
  },
  {
    id: 5,
    device: 'Realme 8 Pro',
    customer: 'Sneha Jain',
    intakeTime: '29-Jun, 01:20PM',
    engineer: 'Eng. Karan',
    tat: 2.9,
    qrCode: 'Scan Now',
  },
  {
    id: 6,
    device: 'Vivo Y21',
    customer: 'Rohan Shah',
    intakeTime: '02-Jul, 08:30AM',
    engineer: 'Eng. Priya',
    tat: 3.3,
    qrCode: 'Scan Now',
  },
  {
    id: 7,
    device: 'iPad Mini',
    customer: 'Tina D.',
    intakeTime: '02-Jul, 12:00PM',
    engineer: 'Eng. Vikas',
    tat: 1.8,
    qrCode: 'Scan Now',
  },
  {
    id: 8,
    device: 'Poco X3',
    customer: 'Hardik P.',
    intakeTime: '01-Jul, 05:45PM',
    engineer: 'Eng. Suman',
    tat: 4.7,
    qrCode: 'Scan Now',
  },
  {
    id: 9,
    device: 'Moto G60',
    customer: 'Megha T.',
    intakeTime: '30-Jun, 07:10AM',
    engineer: 'Eng. Rahul',
    tat: 3.1,
    qrCode: 'Scan Now',
  },
  {
    id: 10,
    device: 'Lava Blaze',
    customer: 'Ishaan G.',
    intakeTime: '01-Jul, 02:20PM',
    engineer: 'Eng. Priya',
    tat: 2.5,
    qrCode: 'Scan Now',
  },
];

const Awaiting = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filteredData = mockAwaitingOrders.filter((row) =>
    `${row.device} ${row.customer} ${row.engineer}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns = [
    { name: '#', selector: (row, index) => index + 1, width: '60px' },
    { name: 'Device', selector: (row) => row.device },
    { name: 'Customer', selector: (row) => row.customer },
    { name: 'Intake Time', selector: (row) => row.intakeTime },
    { name: 'Assigned To', selector: (row) => row.engineer },
    { name: 'TAT', selector: (row) => `${row.tat} hrs` },
    {
      name: 'QR Code',
      cell: (row) => (
        <Button size="sm" variant="outline-success">
          <ScanLine size={14} className="me-1" />
          {row.qrCode}
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          size="sm"
          variant="outline-warning"
          onClick={() => {
            setSelectedOrder(row);
            setShowModal(true);
          }}
        >
          <Wrench size={14} className="me-1" />
          Submit Diagnosis
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div>
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <Wrench size={18} className="me-2 text-warning" />
        Awaiting Diagnosis
      </h5>

      {/* 🔍 Search Bar */}
      <Form.Group className="mb-3 d-flex align-items-center" controlId="search">
        <Search size={16} className="me-2" />
        <Form.Control
          type="text"
          placeholder="Search Device, Customer or Engineer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>

      {/* 📋 Table */}
      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          striped
          highlightOnHover
        />
      </div>

      {/* Modal for Diagnosis */}
      <AwaitingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        order={selectedOrder}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Awaiting;
