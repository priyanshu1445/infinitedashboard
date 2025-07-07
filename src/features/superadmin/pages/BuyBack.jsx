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
import { Search, CalendarDays, Eye, Truck, FileText, ClipboardEdit, CheckCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import BuybackRequestModal from '../../..//components/common/modal/BuybackRequestModal';
import 'react-toastify/dist/ReactToastify.css';
import { CSVLink } from 'react-csv';

const mockRequests = [
  {
    id: 1,
    customerName: 'Rajeev Kumar',
    device: 'Redmi Note 9',
    address: 'Delhi, Sector 7',
    date: '2024-06-28',
    status: 'New',
    phone: '9876543210',
    source: 'Web',
  },
  {
    id: 2,
    customerName: 'Pooja Sharma',
    device: 'iPhone 11',
    address: 'Noida, Sector 18',
    date: '2024-06-29',
    status: 'Scheduled',
    phone: '9876504321',
    source: 'WhatsApp',
  },
];

const BuyBack = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleView = (row) => {
    setSelectedRequest(row);
    setShowModal(true);
  };

  const handleToast = (message, type = 'default') => {
    toast[type](message);
  };

  const filteredData = mockRequests.filter((item) => {
    const matchesSearch = `${item.customerName} ${item.device} ${item.phone}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || item.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const columns = [
    { name: '#', selector: (_, index) => index + 1, width: '60px' },
    { name: 'Customer Name', selector: (row) => row.customerName },
    { name: 'Device', selector: (row) => row.device },
    { name: 'Pickup Address', selector: (row) => row.address },
    {
      name: 'Request Date',
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    { name: 'Status', selector: (row) => row.status },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button size="sm" variant="outline-primary" onClick={() => handleView(row)}>
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleToast('Pickup assigned', 'success')}>
              <Truck size={14} className="me-2" /> Assign Pickup
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast('Pickup slip generated', 'info')}>
              <FileText size={14} className="me-2" /> Generate Pickup Slip
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast('Remarks added', 'default')}>
              <ClipboardEdit size={14} className="me-2" /> Add Remarks
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleToast('NOC status checked', 'warning')}>
              <CheckCircle size={14} className="me-2" /> View NOC Status
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  return (
    <div>
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        📩 Buyback Requests
      </h5>

      {/* Top Filters */}
      <Row className="g-3 align-items-end mb-3">
        <Col md={3}>
          <Form.Label className="fw-semibold">
            <Search size={16} className="me-2" />
            Search
          </Form.Label>
          <Form.Control
            placeholder="Name / Phone / Device / ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>New</option>
            <option>Scheduled</option>
            <option>Picked Up</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label>Source</Form.Label>
          <Form.Select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option>All</option>
            <option>Web</option>
            <option>WhatsApp</option>
            <option>Walk-in</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label>
            <CalendarDays size={16} className="me-2" />
            Date Range
          </Form.Label>
          <Form.Control type="text" disabled placeholder="Coming soon..." />
        </Col>

        <Col md="auto" className="d-flex align-items-center mt-4">
          <CSVLink
            data={filteredData}
            filename="buyback-requests.csv"
            className="btn btn-outline-success"
          >
            Export CSV
          </CSVLink>
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
      <BuybackRequestModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedRequest}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default BuyBack;
