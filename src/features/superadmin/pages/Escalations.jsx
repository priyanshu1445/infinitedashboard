import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Badge,
  Card,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Bell, MessageCircleWarning, ArrowUpRight } from 'lucide-react';
import EscalationDetailModal from '../../../components/common/modal/EscalationDetailModal';

const mockEscalations = [
  {
    escalationId: 'ESC-5562',
    ticketId: 'TCKT-8119',
    customer: 'Meera S.',
    reason: 'Reopened',
    raisedBy: 'Customer',
    time: '28-Jun, 5:12 PM',
    assignedTo: 'Supervisor A',
    status: 'Pending',
    level: 'Level 1',
  },
  {
    escalationId: 'ESC-5563',
    ticketId: 'TCKT-8120',
    customer: 'Ravi Kumar',
    reason: 'Poor Service',
    raisedBy: 'Auto',
    time: '29-Jun, 10:30 AM',
    assignedTo: 'Supervisor B',
    status: 'In Review',
    level: 'Level 2',
  },
];

const Escalations = () => {
  const [levelFilter, setLevelFilter] = useState('');
  const [reasonFilter, setReasonFilter] = useState('');
  const [initiatorFilter, setInitiatorFilter] = useState('');
  const [selectedEscalation, setSelectedEscalation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = mockEscalations.filter((e) => {
    const levelMatch = !levelFilter || e.level === levelFilter;
    const reasonMatch = !reasonFilter || e.reason === reasonFilter;
    const initiatorMatch = !initiatorFilter || e.raisedBy === initiatorFilter;
    return levelMatch && reasonMatch && initiatorMatch;
  });

  const columns = [
    { name: 'Escalation ID', selector: (row) => row.escalationId },
    { name: 'Ticket ID', selector: (row) => row.ticketId },
    { name: 'Customer', selector: (row) => row.customer },
    { name: 'Reason', selector: (row) => row.reason },
    { name: 'Raised By', selector: (row) => row.raisedBy },
    { name: 'Time', selector: (row) => row.time },
    { name: 'Assigned To', selector: (row) => row.assignedTo },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge bg={row.status === 'Pending' ? 'warning' : 'info'}>
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => {
            setSelectedEscalation(row);
            setShowModal(true);
          }}
        >
          <ArrowUpRight size={14} className="me-1" /> Resolve
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">🚨 Escalations</h5>

      {/* Filters */}
      <Row className="mb-3 g-3">
        <Col md={4}>
          <Form.Select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
            <option value="">Escalation Level</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Admin Intervention">Admin Intervention</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={reasonFilter} onChange={(e) => setReasonFilter(e.target.value)}>
            <option value="">Reason</option>
            <option value="Reopened">Reopened</option>
            <option value="Delayed Response">Delayed Response</option>
            <option value="Poor Service">Poor Service</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={initiatorFilter} onChange={(e) => setInitiatorFilter(e.target.value)}>
            <option value="">Initiated By</option>
            <option value="Customer">Customer</option>
            <option value="Auto">Auto</option>
            <option value="Engineer">Engineer</option>
          </Form.Select>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No escalations found."
      />

      <EscalationDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        escalation={selectedEscalation}
      />
    </div>
  );
};

export default Escalations;
