import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  FileText,
  Truck,
  ClipboardEdit,
  CheckCircle,
  XCircle,
  CalendarDays,
  Eye,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RejectionReasonModal from '../../../components/common/modal/RejectionReasonModal';
import { CSVLink } from 'react-csv';

const mockPaymentData = [
  {
    id: 1,
    requestId: 'BYBK-8921',
    customer: 'Sneha Kapoor',
    quote: 3200,
    mode: 'UPI',
    status: 'Paid',
    rejectedReason: '—',
    date: '2024-06-28',
  },
  {
    id: 2,
    requestId: 'BYBK-8922',
    customer: 'Raj Mehra',
    quote: 2800,
    mode: 'Bank Transfer',
    status: 'Rejected',
    rejectedReason: 'Fake Serial No.',
    date: '2024-06-30',
  },
  {
    id: 3,
    requestId: 'BYBK-8923',
    customer: 'Anjali Sharma',
    quote: 4500,
    mode: 'UPI',
    status: 'Pending Approval',
    rejectedReason: '—',
    date: '2024-07-01',
  },
  {
    id: 4,
    requestId: 'BYBK-8924',
    customer: 'Vikram Rathore',
    quote: 3900,
    mode: 'Bank Transfer',
    status: 'Rejected',
    rejectedReason: 'No NOC Provided',
    date: '2024-07-02',
  },
  {
    id: 5,
    requestId: 'BYBK-8925',
    customer: 'Pooja Singh',
    quote: 2200,
    mode: 'UPI',
    status: 'Paid',
    rejectedReason: '—',
    date: '2024-07-03',
  },
  {
    id: 6,
    requestId: 'BYBK-8926',
    customer: 'Rahul Verma',
    quote: 3100,
    mode: 'Bank Transfer',
    status: 'Rejected',
    rejectedReason: 'Device Stolen',
    date: '2024-07-03',
  },
  {
    id: 7,
    requestId: 'BYBK-8927',
    customer: 'Neha Desai',
    quote: 3700,
    mode: 'UPI',
    status: 'Paid',
    rejectedReason: '—',
    date: '2024-07-04',
  },
  {
    id: 8,
    requestId: 'BYBK-8928',
    customer: 'Amit Bhalla',
    quote: 2950,
    mode: 'Bank Transfer',
    status: 'Rejected',
    rejectedReason: 'Other',
    date: '2024-07-04',
  },
  {
    id: 9,
    requestId: 'BYBK-8929',
    customer: 'Ritu Jaiswal',
    quote: 4100,
    mode: 'UPI',
    status: 'Pending Approval',
    rejectedReason: '—',
    date: '2024-07-05',
  },
  {
    id: 10,
    requestId: 'BYBK-8930',
    customer: 'Karan Malhotra',
    quote: 3300,
    mode: 'Bank Transfer',
    status: 'Rejected',
    rejectedReason: 'Fake Serial No.',
    date: '2024-07-05',
  },
];
            
const PaymentRejection = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [mode, setMode] = useState('');
  const [noc, setNoc] = useState('');
  const [date, setDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [category, setCategory] = useState('');
  const [remarks, setRemarks] = useState('');
  const [triggerWhatsApp, setTriggerWhatsApp] = useState(false);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategory('');
    setRemarks('');
    setTriggerWhatsApp(false);
  };

  const handleSubmitModal = () => {
    toast.success(`Rejection reason submitted for ${selectedRow?.customer}`);
    handleCloseModal();
  };

  const filteredData = mockPaymentData.filter((item) => {
    const matchesSearch = `${item.customer} ${item.requestId}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status === 'All' || item.status === status;
    const matchesMode = !mode || item.mode === mode;
    const matchesDate = !date || item.date === date;
    return matchesSearch && matchesStatus && matchesMode && matchesDate;
  });

  const columns = [
    { name: '#', selector: (_, index) => index + 1, width: '60px' },
    { name: 'Request ID', selector: (row) => row.requestId },
    { name: 'Customer', selector: (row) => row.customer },
    { name: 'Quote Amount', selector: (row) => `₹${row.quote}` },
    { name: 'Payment Mode', selector: (row) => row.mode },
    { name: 'Payment Status', selector: (row) => row.status },
    { name: 'Rejected Reason', selector: (row) => row.rejectedReason },
    { name: 'Date', selector: (row) => row.date },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup} autoClose="outside">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleOpenModal(row)}
            className="d-flex align-items-center"
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          <Dropdown.Toggle
            split
            size="sm"
            variant="outline-primary"
            id={`dropdown-split-${row.id}`}
          />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => toast.info(`Invoice opened for ${row.customer}`)}
              className="d-flex align-items-center"
            >
              <FileText size={16} className="me-2 text-primary" />
              View Invoice (PDF)
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => toast.success(`Marked as Paid for ${row.customer}`)}
              className="d-flex align-items-center"
            >
              <CheckCircle size={16} className="me-2 text-success" />
              Mark as Paid
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => toast.info(`Reopened case for ${row.customer}`)}
              className="d-flex align-items-center"
            >
              <ClipboardEdit size={16} className="me-2 text-warning" />
              Reopen Case
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => toast.info('Payment confirmation downloaded')}
              className="d-flex align-items-center"
            >
              <Truck size={16} className="me-2 text-info" />
              Download Payment Confirmation
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => toast.info('Attach NOC (Coming Soon)')}
              className="d-flex align-items-center"
            >
              <ClipboardEdit size={16} className="me-2 text-secondary" />
              Attach NOC Copy
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => toast.error('Refund Requested')}
              className="d-flex align-items-center"
            >
              <XCircle size={16} className="me-2 text-danger" />
              Refund Request
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        💳 Payments / Rejections
      </h5>

      {/* Top Filters */}
      <Row className="g-3 align-items-end mb-3">
        <Col md={3}>
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Paid</option>
            <option>Rejected</option>
            <option>Pending Approval</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Mode</Form.Label>
          <Form.Select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="">All</option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>NOC</Form.Label>
          <Form.Select value={noc} onChange={(e) => setNoc(e.target.value)}>
            <option>All</option>
            <option>Verified</option>
            <option>Not Verified</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>
            <CalendarDays size={16} className="me-2" /> Date
          </Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search by Customer or Request ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md="auto">
          <CSVLink
            data={filteredData}
            filename="payments-rejections.csv"
            className="btn btn-outline-success"
          >
            Export CSV
          </CSVLink>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
      />

      <RejectionReasonModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitModal}
        category={category}
        setCategory={setCategory}
        remarks={remarks}
        setRemarks={setRemarks}
        triggerWhatsApp={triggerWhatsApp}
        setTriggerWhatsApp={setTriggerWhatsApp}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default PaymentRejection;
