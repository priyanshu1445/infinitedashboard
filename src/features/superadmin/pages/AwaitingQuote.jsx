import React, { useState, useEffect } from 'react';
import { Button, Badge, Dropdown, ButtonGroup, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  Phone,
  Repeat,
  XCircle,
  Clock,
  MessageSquareText,
  History,
  Search,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockQuotes = [
  {
    id: 1,
    orderId: 'R#202123',
    device: 'iPhone XR',
    customer: 'Seema S.',
    quoteAmount: 4500,
    sentVia: 'WhatsApp',
    sentOn: '2024-06-28T16:00:00Z',
    expiryHours: 24,
  },
  {
    id: 2,
    orderId: 'R#202125',
    device: 'OnePlus Nord',
    customer: 'Anuj R.',
    quoteAmount: 3200,
    sentVia: 'Email',
    sentOn: '2024-06-28T18:30:00Z',
    expiryHours: 24,
  },
  {
    id: 3,
    orderId: 'R#202126',
    device: 'Samsung Galaxy S21',
    customer: 'Priya V.',
    quoteAmount: 5800,
    sentVia: 'WhatsApp',
    sentOn: '2024-06-29T09:15:00Z',
    expiryHours: 24,
  },
  {
    id: 4,
    orderId: 'R#202127',
    device: 'Google Pixel 6',
    customer: 'Ravi T.',
    quoteAmount: 6100,
    sentVia: 'Email',
    sentOn: '2024-06-29T10:45:00Z',
    expiryHours: 24,
  },
  {
    id: 5,
    orderId: 'R#202128',
    device: 'Vivo V21',
    customer: 'Sneha M.',
    quoteAmount: 2900,
    sentVia: 'WhatsApp',
    sentOn: '2024-06-29T13:00:00Z',
    expiryHours: 24,
  },
  {
    id: 6,
    orderId: 'R#202129',
    device: 'Oppo F19',
    customer: 'Kunal G.',
    quoteAmount: 3100,
    sentVia: 'Email',
    sentOn: '2024-06-29T15:20:00Z',
    expiryHours: 24,
  },
  {
    id: 7,
    orderId: 'R#202130',
    device: 'Realme GT',
    customer: 'Tanya J.',
    quoteAmount: 4300,
    sentVia: 'WhatsApp',
    sentOn: '2024-06-29T17:50:00Z',
    expiryHours: 24,
  },
  {
    id: 8,
    orderId: 'R#202131',
    device: 'Motorola Edge',
    customer: 'Aman P.',
    quoteAmount: 3600,
    sentVia: 'Email',
    sentOn: '2024-06-29T20:10:00Z',
    expiryHours: 24,
  },
  {
    id: 9,
    orderId: 'R#202132',
    device: 'iPhone 12 Mini',
    customer: 'Divya K.',
    quoteAmount: 4900,
    sentVia: 'WhatsApp',
    sentOn: '2024-06-30T08:40:00Z',
    expiryHours: 24,
  },
  {
    id: 10,
    orderId: 'R#202133',
    device: 'Asus ROG Phone 5',
    customer: 'Manoj N.',
    quoteAmount: 7300,
    sentVia: 'Email',
    sentOn: '2024-06-30T10:05:00Z',
    expiryHours: 24,
  },
];

const AwaitingQuote = () => {
  const [quoteList, setQuoteList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setQuoteList(mockQuotes);
  }, []);

  const getCountdown = (sentTime, expiryHours) => {
    const now = new Date();
    const sent = new Date(sentTime);
    const expiry = new Date(sent.getTime() + expiryHours * 60 * 60 * 1000);
    const diff = expiry - now;

    if (diff <= 0) return <Badge bg="danger">Expired</Badge>;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return <Badge bg="warning">{`${hours}h ${minutes}m left`}</Badge>;
  };

  const handleResend = (q) => toast.info(`Quote resent to ${q.customer}`);
  const handleCancel = (q) => toast.error(`Quote for ${q.customer} cancelled`);
  const handleCall = (q) => toast.success(`Calling ${q.customer}...`);
  const handleViewPreview = (q) => toast(`WhatsApp preview for ${q.customer}`);
  const handleViewHistory = (q) => toast(`Quote history for ${q.customer}`);

  const filteredQuotes = quoteList.filter((q) =>
    `${q.orderId} ${q.device} ${q.customer}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const columns = [
    { name: '#', selector: (_, i) => i + 1, width: '60px' },
    { name: 'Order ID', selector: (row) => row.orderId },
    { name: 'Device', selector: (row) => row.device },
    { name: 'Customer', selector: (row) => row.customer },
    {
      name: 'Quote Amount',
      selector: (row) => `₹${row.quoteAmount}`,
    },
    { name: 'Sent Via', selector: (row) => row.sentVia },
    {
      name: 'Sent On',
      selector: (row) => new Date(row.sentOn).toLocaleString(),
    },
    {
      name: 'Countdown',
      cell: (row) => getCountdown(row.sentOn, row.expiryHours),
    },
    {
      name: 'Response',
      cell: () => <Badge bg="secondary">Pending</Badge>,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button className='d-flex align-items-center' size="sm" variant="outline-primary" onClick={() => handleViewPreview(row)}>
            <MessageSquareText size={14} className="" />
            Preview
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleResend(row)}>
              <Repeat size={14} className="me-2" /> Resend
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCancel(row)}>
              <XCircle size={14} className="me-2" /> Cancel
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCall(row)}>
              <Phone size={14} className="me-2" /> Call
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleViewHistory(row)}>
              <History size={14} className="me-2" /> Quote History
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
        <MessageSquareText size={18} className="me-2 text-info" />
        Awaiting Quote Approval
      </h5>

      {/* 🔍 Search Bar */}
      <Form.Group className="mb-3 d-flex align-items-center" controlId="search">
        <Search size={16} className="me-2" />
        <Form.Control
          type="text"
          placeholder="Search Order ID, Device or Customer"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>

      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredQuotes}
          pagination
          responsive
          striped
          highlightOnHover
        />
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AwaitingQuote;
