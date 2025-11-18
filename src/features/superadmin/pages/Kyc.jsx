import React, { useState } from 'react';
import { Button, Col, Form, Row, Dropdown, ButtonGroup, Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Eye, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import KycModal from '../../../components/common/modal/KycModal'; // Adjust path as needed
import 'react-toastify/dist/ReactToastify.css';

const mockKYCData = [
  {
    id: 1,
    name: 'Sameer Khan',
    aadhar: '****1234',
    pan: 'XXP5',
    status: 'Pending',
    date: '28-Jun',
    kycDocs: {
      aadharFront: '/images/aadhar-front.jpg',
      aadharBack: '/images/aadhar-back.jpg',
      panCard: '/images/pan-card.jpg',
      aadharPdf: '/docs/aadhar-sameer.pdf',
      panPdf: '/docs/pan-sameer.pdf',
    },
  },
  {
    id: 2,
    name: 'Aditi Sharma',
    aadhar: '****9876',
    pan: 'BRL7',
    status: 'Approved',
    date: '25-Jun',
    kycDocs: {
      aadharFront: '/images/aadhar-front.jpg',
      aadharBack: '/images/aadhar-back.jpg',
      panCard: '/images/pan-card.jpg',
      aadharPdf: '/docs/aadhar-aditi.pdf',
      panPdf: '/docs/pan-aditi.pdf',
    },
  },
  {
    id: 3,
    name: 'Rajeev Mehta',
    aadhar: '****4567',
    pan: 'ZXP3',
    status: 'Rejected',
    date: '26-Jun',
    kycDocs: {
      aadharFront: '/images/aadhar-front.jpg',
      aadharBack: '/images/aadhar-back.jpg',
      panCard: '/images/pan-card.jpg',
      aadharPdf: '/docs/aadhar-rajeev.pdf',
      panPdf: '/docs/pan-rajeev.pdf',
    },
  },
];

const Kyc = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState(null);

  const notify = (msg) => toast.success(msg);

  const filteredData = mockKYCData.filter((item) => {
    const matchesSearch = `${item.name} ${item.aadhar} ${item.pan}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge bg="success">Approved</Badge>;
      case 'Rejected':
        return <Badge bg="danger">Rejected</Badge>;
      case 'Pending':
        return <Badge bg="warning">Pending</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleViewDocs = (row) => {
    setSelectedDocs(row.kycDocs);
    setShowModal(true);
  };

  const handleApprove = (row) => notify(`✅ Approved KYC for ${row.name}`);
  const handleReject = (row) => notify(`❌ Rejected KYC for ${row.name}`);
  const handleSendNotification = (row) => notify(`📩 Notification sent to ${row.name}`);

  const columns = [
    { name: '#', selector: (row, i) => i + 1, width: '50px' },
    { name: 'Name', selector: (row) => row.name },
    { name: 'Aadhar', selector: (row) => row.aadhar },
    { name: 'PAN', selector: (row) => row.pan },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => getStatusBadge(row.status),
    },
    { name: 'Submitted On', selector: (row) => row.date },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-primary" size="sm" onClick={() => handleViewDocs(row)}>
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleApprove(row)}>
              <CheckCircle size={14} className="me-2" /> Approve
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleReject(row)}>
              <XCircle size={14} className="me-2" /> Reject with Remark
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSendNotification(row)}>
              <Clock size={14} className="me-2" /> Send Notification
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
        <CheckCircle size={18} className="me-2 text-success" />
        KYC Requests
      </h5>

      {/* Filters */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={5}>
          <Form.Label className="d-flex align-items-center">
            <Search size={16} className="me-2" /> Search
          </Form.Label>
          <Form.Control
            placeholder="By Name / Aadhar / PAN"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Status</Form.Label>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
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
      <KycModal show={showModal} onClose={() => setShowModal(false)} kycDocs={selectedDocs} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Kyc;
