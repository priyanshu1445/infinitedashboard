import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Form, Row, Col, Dropdown, ButtonGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import 'react-toastify/dist/ReactToastify.css';
import { Download } from 'lucide-react';

import '../../../styles/global.css';
import {
  Eye,
  Truck,
  PhoneCall,
  CheckCircle,
  XCircle,
  MessageCircle,
  Ticket
} from 'lucide-react';

import EnquiryModal from '../../../components/common/modal/EnquiriesModal'; // Adjust the relative path

const mockEnquiries = [
  {
    id: 1,
    name: 'Rakesh Sharma',
    phone: '98765xxxxx',
    device: 'iPhone 11',
    issue: 'Screen broken',
    status: 'New',
    source: 'WhatsApp',
    date: '29-Jun',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    phone: '98123xxxxx',
    device: 'Samsung S21',
    issue: 'Battery draining fast',
    status: 'Contacted',
    source: 'Website',
    date: '28-Jun',
  },
  {
    id: 3,
    name: 'Amit Verma',
    phone: '99001xxxxx',
    device: 'Redmi Note 10',
    issue: 'Not charging',
    status: 'Converted',
    source: 'Meta',
    date: '27-Jun',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    phone: '97987xxxxx',
    device: 'OnePlus Nord',
    issue: 'Cracked back glass',
    status: 'Dropped',
    source: 'WhatsApp',
    date: '26-Jun',
  },
  {
    id: 5,
    name: 'Ravi Kumar',
    phone: '98888xxxxx',
    device: 'Vivo Y73',
    issue: 'Overheating',
    status: 'New',
    source: 'Meta',
    date: '25-Jun',
  },
  {
    id: 6,
    name: 'Neha Sinha',
    phone: '98222xxxxx',
    device: 'iPhone XR',
    issue: 'Touch not working',
    status: 'Contacted',
    source: 'Website',
    date: '24-Jun',
  },
  {
    id: 7,
    name: 'Arjun Desai',
    phone: '91234xxxxx',
    device: 'iPhone 13',
    issue: 'Camera blurry',
    status: 'New',
    source: 'Website',
    date: '23-Jun',
  },
  {
    id: 8,
    name: 'Kavita Rao',
    phone: '90123xxxxx',
    device: 'Samsung A52',
    issue: 'Random shutdowns',
    status: 'Contacted',
    source: 'Meta',
    date: '22-Jun',
  },
  {
    id: 9,
    name: 'Manish Jain',
    phone: '98765yyyyy',
    device: 'Realme GT',
    issue: 'Heating issue',
    status: 'Converted',
    source: 'Website',
    date: '21-Jun',
  },
  {
    id: 10,
    name: 'Aisha Khan',
    phone: '92345xxxxx',
    device: 'iPhone SE',
    issue: 'Speaker issue',
    status: 'Dropped',
    source: 'WhatsApp',
    date: '20-Jun',
  },
  {
    id: 11,
    name: 'Tushar Bansal',
    phone: '99887xxxxx',
    device: 'Poco X3',
    issue: 'System freeze',
    status: 'New',
    source: 'Meta',
    date: '19-Jun',
  },
  {
    id: 12,
    name: 'Meera Joshi',
    phone: '97865xxxxx',
    device: 'Oppo F19',
    issue: 'WiFi not working',
    status: 'Contacted',
    source: 'Website',
    date: '18-Jun',
  },
  {
    id: 13,
    name: 'Rahul Dubey',
    phone: '90909xxxxx',
    device: 'iPhone 12 Pro',
    issue: 'Battery swelling',
    status: 'Converted',
    source: 'WhatsApp',
    date: '17-Jun',
  },
  {
    id: 14,
    name: 'Divya Reddy',
    phone: '90110xxxxx',
    device: 'Nokia G10',
    issue: 'Charging port issue',
    status: 'Dropped',
    source: 'Meta',
    date: '16-Jun',
  },
];


const Enquiries = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const filteredData = mockEnquiries.filter((item) => {
    const matchesSearch = `${item.name} ${item.phone}`.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    const matchesSource = sourceFilter ? item.source === sourceFilter : true;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const notify = (message) => toast.success(message);

  const handleViewDetails = (row) => {
    setSelectedEnquiry(row);
    setShowModal(true);
  };

  const handleAssignPickup = (row) => notify(`Assigned pickup for ${row.name}`);
  const handleMarkStatus = (row, status) => notify(`Marked ${row.name} as ${status}`);
  const handleSendWhatsApp = (row) => window.open(`https://wa.me/${row.phone}`, '_blank');
  const handleConvertToTicket = (row) => notify(`Converted ${row.name} to ticket`);

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'warning';
      case 'Contacted': return 'info';
      case 'Converted': return 'success';
      case 'Dropped': return 'danger';
      default: return 'secondary';
    }
  };

  const columns = [
    { name: '#', selector: (row, index) => index + 1, width: '60px' },
    { name: 'Name', selector: (row) => row.name },
    { name: 'Phone', selector: (row) => row.phone },
    { name: 'Device Category', selector: (row) => row.device },
    { name: 'Issue Summary', selector: (row) => row.issue },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => <span className={`badge bg-${getStatusColor(row.status)}`}>{row.status}</span>,
    },
    { name: 'Source', selector: (row) => row.source },
    { name: 'Date', selector: (row) => row.date },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-primary" size="sm" onClick={() => handleViewDetails(row)}>
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleAssignPickup(row)}>
              <Truck size={14} className="me-2" /> Assign for Pickup
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMarkStatus(row, 'Contacted')}>
              <PhoneCall size={14} className="me-2" /> Mark as Contacted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMarkStatus(row, 'Converted')}>
              <CheckCircle size={14} className="me-2" /> Mark as Converted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleMarkStatus(row, 'Dropped')}>
              <XCircle size={14} className="me-2" /> Mark as Dropped
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleSendWhatsApp(row)}>
              <MessageCircle size={14} className="me-2" /> Send WhatsApp
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleConvertToTicket(row)}>
              <Ticket size={14} className="me-2" /> Convert to Ticket
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
      <h5 className="fw-bold mb-3">📝 Enquiries</h5>

      {/* Filters & Export */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={4}>
          <Form.Control
            placeholder="Search by Name / Phone"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Dropped">Dropped</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
            <option value="">All Sources</option>
            <option value="Meta">Meta</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Website">Website</option>
          </Form.Select>
        </Col>
        <Col md={4} className="text-end">
<CSVLink data={filteredData} filename="enquiries.csv" className="btn btn-outline-secondary d-inline-flex align-items-center">
  <Download size={16} className="me-1" /> Export CSV
</CSVLink>

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

      {/* Use external EnquiryModal component */}
      <EnquiryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        enquiry={selectedEnquiry}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Enquiries;
