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
import {
  Clock,
  AlarmClockOff,
  CircleCheckBig,
  Gauge,
  ArrowUpRight,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SLAManageModal from '../../../components/common/modal/SLAManageModal';

const mockSlaTickets = [
  {
    id: 'TCKT-7821',
    priority: 'High',
    deadline: '3:30 PM, Today',
    timeRemaining: '1.2',
    status: 'Open',
  },
  {
    id: 'TCKT-7822',
    priority: 'Medium',
    deadline: '5:00 PM, Today',
    timeRemaining: '4.5',
    status: 'Open',
  },
  {
    id: 'TCKT-7823',
    priority: 'High',
    deadline: '12:30 PM, Today',
    timeRemaining: '-1.2',
    status: 'Open',
  },
];

const SlaTimer = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAction = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
    toast.info(`Managing SLA for Ticket: ${ticket.id}`);
  };

  // Calculate SLA status dynamically
  const enrichedTickets = mockSlaTickets.map((ticket) => {
    const hours = parseFloat(ticket.timeRemaining);
    let slaStatus = '';
    if (isNaN(hours)) slaStatus = 'Unknown';
    else if (hours < 0) slaStatus = 'Expired';
    else if (hours < 2) slaStatus = 'Nearing Expiry';
    else slaStatus = 'Within SLA';

    return { ...ticket, slaStatus };
  });

  const filteredTickets = enrichedTickets.filter((ticket) => {
    const matchSlaStatus = !statusFilter || ticket.slaStatus === statusFilter;
    const matchPriority = !priorityFilter || ticket.priority === priorityFilter;
    return matchSlaStatus && matchPriority;
  });

  const getTimeBadge = (time) => {
    const hours = parseFloat(time);
    if (time.includes('-')) return <Badge bg="danger">Overdue</Badge>;
    if (hours < 2) return <Badge bg="warning" text="dark">&lt; 2 hrs</Badge>;
    return <Badge bg="success">&gt; 4 hrs</Badge>;
  };

  const columns = [
    { name: 'Ticket ID', selector: (row) => row.id, sortable: true },
    { name: 'Priority', selector: (row) => row.priority },
    { name: 'SLA Deadline', selector: (row) => row.deadline },
    {
      name: 'Time Remaining',
      cell: (row) => getTimeBadge(row.timeRemaining),
    },
    {
      name: 'SLA Status',
      selector: (row) => row.slaStatus,
      cell: (row) => {
        const status = row.slaStatus;
        const variant =
          status === 'Expired' ? 'danger' :
          status === 'Nearing Expiry' ? 'warning' :
          'success';
        return <Badge bg={variant}>{status}</Badge>;
      }
    },
    { name: 'Status', selector: (row) => row.status },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handleAction(row)}
        >
          <ArrowUpRight size={14} className="me-1" /> Manage
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4">⏱️ SLA Timers</h5>

      {/* SLA Widgets */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="bg-warning bg-opacity-25 border-0 shadow-sm" style={{ minHeight: '110px' }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center mb-2">
                <Clock size={20} className="me-2 text-warning" />
                <h6 className="mb-0 fw-bold text-dark">Nearing SLA (&lt; 2 hrs)</h6>
              </div>
              <h4 className="fw-semibold text-dark mb-0">12</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-danger bg-opacity-25 border-0 shadow-sm" style={{ minHeight: '110px' }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center mb-2">
                <AlarmClockOff size={20} className="me-2 text-danger" />
                <h6 className="mb-0 fw-bold text-dark">SLA Breached</h6>
              </div>
              <h4 className="fw-semibold text-dark mb-0">4</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-success bg-opacity-25 border-0 shadow-sm" style={{ minHeight: '110px' }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center mb-2">
                <CircleCheckBig size={20} className="me-2 text-success" />
                <h6 className="mb-0 fw-bold text-dark">Resolved Today</h6>
              </div>
              <h4 className="fw-semibold text-dark mb-0">18</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-info bg-opacity-25 border-0 shadow-sm" style={{ minHeight: '110px' }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div className="d-flex align-items-center mb-2">
                <Gauge size={20} className="me-2 text-info" />
                <h6 className="mb-0 fw-bold text-dark">Avg. Resolution</h6>
              </div>
              <h4 className="fw-semibold text-dark mb-0">4.3 hrs</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3 g-3">
        <Col md={4}>
          <Form.Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">SLA Status</option>
            <option value="Within SLA">Within SLA</option>
            <option value="Nearing Expiry">Nearing Expiry</option>
            <option value="Expired">Expired</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">Ticket Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* SLA Table */}
      <DataTable
        columns={columns}
        data={filteredTickets}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No SLA tickets match the filters."
      />

      {/* Modal */}
      <SLAManageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        ticket={selectedTicket}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default SlaTimer;
