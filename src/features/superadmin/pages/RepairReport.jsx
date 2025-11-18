import React, { useState, useMemo } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge, // Import Badge for status/QC result styling
} from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Import DataTable
import {
  Eye,
  Wrench,
  CheckCircle,
  XCircle,
  Timer,
  UserCheck,
  Search, // Added for Filter button
  Eraser, // Added for Clear Filters button
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RepairDetailsModal from '../../../components/common/modal/RepairDetailsModal';

// Enhanced Dummy data with more variety and date format
const mockData = [
  {
    id: 'RPT-001',
    date: '2025-06-28', // Added date in YYYY-MM-DD format
    deviceId: 'DVC-88312',
    customer: 'Aditya M.',
    engineer: 'Nikhil G.',
    deviceCategory: 'Phone', // Added device category
    status: 'Dispatched',
    repairTime: '2.4 hrs',
    qcResult: 'Pass', // Changed to string for easier comparison
    rackSlot: 'B2',
    notes: 'Display replaced and battery calibrated.',
    media: 'https://placehold.co/150x100/000000/FFFFFF?text=Device+1',
  },
  {
    id: 'RPT-002',
    date: '2025-06-27',
    deviceId: 'DVC-91011',
    customer: 'Priya S.',
    engineer: 'Rakesh K.',
    deviceCategory: 'Laptop',
    status: 'In QC',
    repairTime: '3.1 hrs',
    qcResult: 'Fail',
    rackSlot: 'C1',
    notes: 'Keyboard not responding, pending further diagnosis.',
    media: '',
  },
  {
    id: 'RPT-003',
    date: '2025-06-26',
    deviceId: 'DVC-12345',
    customer: 'Amit P.',
    engineer: 'Nikhil G.',
    deviceCategory: 'Tablet',
    status: 'Repaired',
    repairTime: '1.8 hrs',
    qcResult: 'Pass',
    rackSlot: 'A5',
    notes: 'Speaker replaced, audio tested OK.',
    media: 'https://placehold.co/150x100/000000/FFFFFF?text=Device+3',
  },
  {
    id: 'RPT-004',
    date: '2025-06-25',
    deviceId: 'DVC-67890',
    customer: 'Sneha R.',
    engineer: 'Neha K.',
    deviceCategory: 'Phone',
    status: 'Rejected',
    repairTime: '0.5 hrs',
    qcResult: 'N/A', // Not applicable for rejected
    rackSlot: 'D1',
    notes: 'Device beyond economical repair.',
    media: '',
  },
  {
    id: 'RPT-005',
    date: '2025-07-01',
    deviceId: 'DVC-54321',
    customer: 'Rahul V.',
    engineer: 'Rakesh K.',
    deviceCategory: 'Laptop',
    status: 'Dispatched',
    repairTime: '4.0 hrs',
    qcResult: 'Pass',
    rackSlot: 'E3',
    notes: 'OS re-installation and data recovery.',
    media: '',
  },
];

// Mock data for dropdowns (can be fetched from API in real app)
const mockEngineers = ['All', 'Nikhil G.', 'Rakesh K.', 'Neha K.'];
const mockCustomers = ['All', 'Aditya M.', 'Priya S.', 'Amit P.', 'Sneha R.', 'Rahul V.'];
const mockDeviceCategories = ['All', 'Phone', 'Laptop', 'Tablet'];
const mockStatuses = ['All', 'Repaired', 'In QC', 'Rejected', 'Dispatched'];

const RepairReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // State for filters
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    deviceCategory: '',
    status: '',
    engineer: '',
    customer: '',
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
      dateFrom: '',
      dateTo: '',
      deviceCategory: '',
      status: '',
      engineer: '',
      customer: '',
    });
    toast.info('Filters cleared.');
  };

  /**
   * Filters the mock data based on the current filter state.
   * Memoized to prevent unnecessary re-calculations.
   */
  const filteredReports = useMemo(() => {
    return mockData.filter((report) => {
      const reportDate = new Date(report.date); // Convert report date string to Date object

      const matchDateFrom = !filters.dateFrom || reportDate >= new Date(filters.dateFrom);
      const matchDateTo = !filters.dateTo || reportDate <= new Date(filters.dateTo);
      const matchDeviceCategory = !filters.deviceCategory || filters.deviceCategory === 'All' || report.deviceCategory === filters.deviceCategory;
      const matchStatus = !filters.status || filters.status === 'All' || report.status === filters.status;
      const matchEngineer = !filters.engineer || filters.engineer === 'All' || report.engineer === filters.engineer;
      const matchCustomer = !filters.customer || filters.customer === 'All' || report.customer === filters.customer;

      return (
        matchDateFrom &&
        matchDateTo &&
        matchDeviceCategory &&
        matchStatus &&
        matchEngineer &&
        matchCustomer
      );
    });
  }, [filters]); // Re-calculate only when filters change

  /**
   * Handles the 'View' action for a repair report.
   * Sets the selected report and opens the RepairDetailsModal.
   * @param {object} report - The repair report object to view.
   */
  const handleViewClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
    toast.info(`Viewing details for Device ID: ${report.deviceId}`);
  };

  // Define columns for react-data-table-component
  const columns = [
    {
      name: 'Device ID',
      selector: (row) => row.deviceId,
      sortable: true,
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
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Dispatched'
              ? 'success'
              : row.status === 'Repaired'
              ? 'primary'
              : row.status === 'In QC'
              ? 'info'
              : row.status === 'Rejected'
              ? 'danger'
              : 'secondary' // Default
          }
          text={row.status === 'In QC' ? 'dark' : 'light'} // Ensure text color for info badge
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Repair Time',
      selector: (row) => row.repairTime,
      sortable: true,
    },
    {
      name: 'QC Result',
      selector: (row) => row.qcResult,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.qcResult === 'Pass'
              ? 'success'
              : row.qcResult === 'Fail'
              ? 'danger'
              : 'secondary' // N/A
          }
        >
          {row.qcResult}
        </Badge>
      ),
    },
    {
      name: 'Rack Slot',
      selector: (row) => row.rackSlot,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => handleViewClick(row)}
          className="d-flex align-items-center " // Rounded button
        >
          <Eye size={16} className="me-1" /> View
        </Button>
      ),
      ignoreRowClick: true, // Prevents row click from interfering with button
      allowOverflow: true, // Ensures button is fully visible
      button: true, // Indicates this column contains a button
    },
  ];

  return (
    <div className="p-4 bg-light min-vh-100"> {/* Added bg-light and min-vh-100 for better page background */}
      <h4 className="fw-bold mb-4 text-primary">
        <Wrench className="me-2" size={20} /> Repair Reports
      </h4>

      {/* Filters Card */}
      <Card className="mb-4 shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">🔍 Filter Repair Reports</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3 mb-3">
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
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Device Category</Form.Label>
                <Form.Select
                  name="deviceCategory"
                  value={filters.deviceCategory}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockDeviceCategories.map((category, index) => (
                    <option key={index} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
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
          </Row>
          <Row className="g-3 align-items-end">
            <Col md={4}>
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
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Customer</Form.Label>
                <Form.Select
                  name="customer"
                  value={filters.customer}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockCustomers.map((customer, index) => (
                    <option key={index} value={customer === 'All' ? '' : customer}>
                      {customer}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex justify-content-end gap-2">
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
              <Wrench size={16} /> Total Repairs
            </h6>
            <h5 className="fw-bold text-primary">{filteredReports.length}</h5>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <CheckCircle size={16} /> QC Pass
            </h6>
            <h5 className="fw-bold text-success">
              {filteredReports.filter((r) => r.qcResult === 'Pass').length}
            </h5>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <XCircle size={16} /> QC Fail
            </h6>
            <h5 className="fw-bold text-danger">
              {filteredReports.filter((r) => r.qcResult === 'Fail').length}
            </h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <Timer size={16} /> Avg. TAT
            </h6>
            <h5 className="fw-bold text-info">
              {/* Calculate Average TAT dynamically based on filteredReports */}
              {filteredReports.length > 0
                ? (
                    filteredReports.reduce(
                      (sum, r) => sum + parseFloat(r.repairTime),
                      0
                    ) / filteredReports.length
                  ).toFixed(1) + ' hrs'
                : 'N/A'}
            </h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <UserCheck size={16} /> Most Active Engineer
            </h6>
            <h5 className="fw-bold text-dark">
              {/* Calculate Most Active Engineer dynamically */}
              {filteredReports.length > 0
                ? Object.entries(
                    filteredReports.reduce((acc, r) => {
                      acc[r.engineer] = (acc[r.engineer] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort(([, a], [, b]) => b - a)[0][0] +
                  ' (' +
                  Object.entries(
                    filteredReports.reduce((acc, r) => {
                      acc[r.engineer] = (acc[r.engineer] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort(([, a], [, b]) => b - a)[0][1] +
                  ')'
                : 'N/A'}
            </h5>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card className="shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">📊 Repair Log Details</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <DataTable
            columns={columns}
            data={filteredReports}
            pagination
            striped
            highlightOnHover
            responsive
            noDataComponent="No repair reports found matching your criteria."
          />
        </Card.Body>
      </Card>

      {/* Modal */}
      <RepairDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        report={selectedReport}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default RepairReport;
