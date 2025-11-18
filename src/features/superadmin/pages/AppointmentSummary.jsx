import React, { useState, useMemo } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge, // Import Badge for status styling
} from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Import DataTable
import {
  Eye,
  Calendar, // Icon for Total Appointments
  CheckCircle, // Icon for Completed
  XCircle, // Icon for Missed / No-Show
  Timer, // Icon for Avg. Duration
  Banknote, // Icon for Revenue
  Search, // For filter button
  Eraser, // For clear filters button
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentDetailsModal from '../../../components/common/modal/AppointmentDetailsModal';

// Enhanced Mock Data
const mockAppointments = [
  {
    id: 'APPT-3201',
    customer: 'Mansi R.',
    engineer: 'Nikhil G.',
    type: 'Video',
    status: 'Completed', // Changed to string for easier comparison
    payment: 200,
    durationMin: 30, // Changed to number for calculations
    date: '2025-06-28', // YYYY-MM-DD format
    notes: 'Follow-up required',
    source: 'Online',
  },
  {
    id: 'APPT-3202',
    customer: 'Rahul S.',
    engineer: 'Priya A.',
    type: 'Telephonic',
    status: 'Pending',
    payment: 150,
    durationMin: 0, // Pending, so 0 duration
    date: '2025-07-01',
    notes: 'Initial consultation.',
    source: 'Phone Call',
  },
  {
    id: 'APPT-3203',
    customer: 'Amit K.',
    engineer: 'Nikhil G.',
    type: 'Walk-in',
    status: 'No-show',
    payment: 0,
    durationMin: 0,
    date: '2025-06-29',
    notes: 'Customer did not arrive.',
    source: 'Direct',
  },
  {
    id: 'APPT-3204',
    customer: 'Sneha B.',
    engineer: 'Rahul G.',
    type: 'Video',
    status: 'Completed',
    payment: 300,
    durationMin: 45,
    date: '2025-06-27',
    notes: 'Resolved software issue.',
    source: 'Website',
  },
  {
    id: 'APPT-3205',
    customer: 'Vikram C.',
    engineer: 'Priya A.',
    type: 'Telephonic',
    status: 'Cancelled',
    payment: 0,
    durationMin: 0,
    date: '2025-07-02',
    notes: 'Customer cancelled last minute.',
    source: 'Online',
  },
  {
    id: 'APPT-3206',
    customer: 'Deepak M.',
    engineer: 'Nikhil G.',
    type: 'Walk-in',
    status: 'Completed',
    payment: 100,
    durationMin: 20,
    date: '2025-06-28',
    notes: 'Quick diagnostic.',
    source: 'Direct',
  },
];

// Mock data for filter dropdowns
const mockAppointmentTypes = ['All', 'Telephonic', 'Video', 'Walk-in'];
const mockEngineers = ['All', 'Nikhil G.', 'Priya A.', 'Rahul G.']; // Ensure these match mock data
const mockStatuses = ['All', 'Completed', 'Pending', 'No-show', 'Cancelled'];

const AppointmentSummary = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // State for filters
  const [filters, setFilters] = useState({
    appointmentType: '',
    engineer: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  });

  /**
   * Handles changes in filter form inputs.
   * @param {Object} e - The event object.
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  /**
   * Resets all filter values to their initial empty state.
   */
  const handleClearFilters = () => {
    setFilters({
      appointmentType: '',
      engineer: '',
      dateFrom: '',
      dateTo: '',
      status: '',
    });
    toast.info('Filters cleared.');
  };

  /**
   * Filters the mock data based on the current filter state.
   * Memoized to prevent unnecessary re-calculations.
   */
  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter((appt) => {
      const apptDate = new Date(appt.date); // Convert appointment date string to Date object

      const matchType = !filters.appointmentType || filters.appointmentType === 'All' || appt.type === filters.appointmentType;
      const matchEngineer = !filters.engineer || filters.engineer === 'All' || appt.engineer === filters.engineer;
      const matchStatus = !filters.status || filters.status === 'All' || appt.status === filters.status;

      const matchDateFrom = !filters.dateFrom || apptDate >= new Date(filters.dateFrom);
      const matchDateTo = !filters.dateTo || apptDate <= new Date(filters.dateTo);

      return matchType && matchEngineer && matchStatus && matchDateFrom && matchDateTo;
    });
  }, [filters]); // Re-calculate only when filters change

  /**
   * Handles viewing appointment details.
   * Sets the selected appointment and opens the AppointmentDetailsModal.
   * @param {object} appt - The appointment object to view.
   */
  const handleView = (appt) => {
    setSelectedAppointment(appt);
    setShowModal(true);
    toast.info(`Viewing details for Appointment ID: ${appt.id}`);
  };

  // Dynamic Summary Calculations
  const totalAppointments = filteredAppointments.length;
  const completedAppointments = filteredAppointments.filter(appt => appt.status === 'Completed').length;
  const missedOrNoShowAppointments = filteredAppointments.filter(appt => appt.status === 'No-show' || appt.status === 'Cancelled').length;

  const avgDuration = useMemo(() => {
    const completedAppts = filteredAppointments.filter(appt => appt.status === 'Completed');
    if (completedAppts.length === 0) return 'N/A';
    const totalDuration = completedAppts.reduce((sum, appt) => sum + appt.durationMin, 0);
    return (totalDuration / completedAppts.length).toFixed(0) + ' min';
  }, [filteredAppointments]);

  const totalRevenue = useMemo(() => {
    return filteredAppointments.reduce((sum, appt) => {
      return appt.status === 'Completed' ? sum + appt.payment : sum;
    }, 0);
  }, [filteredAppointments]);

  // Define columns for react-data-table-component
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Customer',
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: 'Engineer',
      selector: (row) => row.engineer,
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Completed'
              ? 'success'
              : row.status === 'Pending'
              ? 'warning'
              : row.status === 'No-show' || row.status === 'Cancelled'
              ? 'danger'
              : 'secondary'
          }
          text={row.status === 'Pending' ? 'dark' : 'light'}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Payment',
      selector: (row) => row.payment,
      sortable: true,
      cell: (row) => `₹${row.payment.toLocaleString()}`,
    },
    {
      name: 'Duration',
      selector: (row) => row.durationMin,
      sortable: true,
      cell: (row) => `${row.durationMin} min`,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => handleView(row)}
          className="d-flex align-items-center " // Rounded button
        >
          <Eye size={16} className="me-1" /> View
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4 bg-light min-vh-100"> {/* Added bg-light and min-vh-100 for better page background */}
      <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
        <Calendar size={20} /> Appointment Summary
      </h4>

      {/* Filters Card */}
      <Card className="mb-4 shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">🔍 Filter Appointments</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3 align-items-end"> {/* Align items to bottom for consistent button placement */}
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Appointment Type</Form.Label>
                <Form.Select
                  name="appointmentType"
                  value={filters.appointmentType}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockAppointmentTypes.map((type, index) => (
                    <option key={index} value={type === 'All' ? '' : type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Engineer</Form.Label>
                <Form.Select
                  name="engineer"
                  value={filters.engineer}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockEngineers.map((engineer, index) => (
                    <option key={index} value={engineer === 'All' ? '' : engineer}>
                      {engineer}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Date From</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className=""
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Date To</Form.Label>
                <Form.Control
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className=""
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3 mt-3 align-items-end"> {/* Added mt-3 for spacing */}
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Status</Form.Label>
                <Form.Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockStatuses.map((status, index) => (
                    <option key={index} value={status === 'All' ? '' : status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={8} className="d-flex justify-content-end gap-2">
              <Button variant="outline-danger" onClick={handleClearFilters} className="">
                <Eraser size={16} className="me-1" /> Clear Filters
              </Button>
              <Button variant="primary" onClick={() => toast.info('Applying filters...')} className="">
                <Search size={16} className="me-1" /> Apply Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Summary Cards */}
      <Row className="mb-4 g-3">
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <Calendar size={16} /> Total Appointments
            </h6>
            <h5 className="fw-bold text-primary">{totalAppointments}</h5>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <CheckCircle size={16} /> Completed
            </h6>
            <h5 className="fw-bold text-success">{completedAppointments}</h5>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <XCircle size={16} /> Missed / Cancelled
            </h6>
            <h5 className="fw-bold text-danger">{missedOrNoShowAppointments}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <Timer size={16} /> Avg. Duration
            </h6>
            <h5 className="fw-bold text-info">{avgDuration}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <Banknote size={16} /> Revenue
            </h6>
            <h5 className="fw-bold text-dark">₹{totalRevenue.toLocaleString()}</h5>
          </Card>
        </Col>
      </Row>

      {/* Appointment Table */}
      <Card className="shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">📋 Appointment Log</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <DataTable
            columns={columns}
            data={filteredAppointments}
            pagination
            striped
            highlightOnHover
            responsive
            noDataComponent="No appointments found matching your criteria."
          />
        </Card.Body>
      </Card>

      {/* Modal Component */}
      <AppointmentDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        appointment={selectedAppointment}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AppointmentSummary;
