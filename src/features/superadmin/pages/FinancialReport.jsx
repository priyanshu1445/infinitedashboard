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
  FileDown,
  CreditCard,
  ArrowDownLeft,
  ReceiptText,
  Banknote,
  Search, // For filter button
  Eraser, // For clear filters button
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FinancialInvoiceModal from '../../../components/common/modal/FinancialInvoiceModal';

// Enhanced Dummy data with more variety and date format
const mockData = [
  {
    id: 'INV-1012',
    invoiceId: 'INV-1012',
    customer: 'Sneha R.',
    type: 'Repair',
    amount: 1750,
    paymentMode: 'Razorpay',
    status: 'Paid',
    date: '2025-06-28', //YYYY-MM-DD format
  },
  {
    id: 'INV-1013',
    invoiceId: 'INV-1013',
    customer: 'Rahul K.',
    type: 'Buyback',
    amount: 5000,
    paymentMode: 'Cash',
    status: 'Paid',
    date: '2025-06-27',
  },
  {
    id: 'INV-1014',
    invoiceId: 'INV-1014',
    customer: 'Amit S.',
    type: 'Appointment',
    amount: 250,
    paymentMode: 'UPI',
    status: 'Pending',
    date: '2025-06-26',
  },
  {
    id: 'INV-1015',
    invoiceId: 'INV-1015',
    customer: 'Priya L.',
    type: 'Repair',
    amount: 2000,
    paymentMode: 'Gateway',
    status: 'Paid',
    date: '2025-06-25',
  },
  {
    id: 'INV-1016',
    invoiceId: 'INV-1016',
    customer: 'Vijay M.',
    type: 'Repair',
    amount: 3500,
    paymentMode: 'Wallet',
    status: 'Refunded',
    date: '2025-06-24',
  },
  {
    id: 'INV-1017',
    invoiceId: 'INV-1017',
    customer: 'Deepika A.',
    type: 'Buyback',
    amount: 7500,
    paymentMode: 'Bank Transfer', // Added a new payment mode
    status: 'Paid',
    date: '2025-07-01',
  },
  {
    id: 'INV-1018',
    invoiceId: 'INV-1018',
    customer: 'Suresh B.',
    type: 'Repair',
    amount: 1200,
    paymentMode: 'Cash',
    status: 'Paid',
    date: '2025-07-02',
  },
];

const mockPaymentMethods = ['All', 'UPI', 'Cash', 'Wallet', 'Gateway', 'Razorpay', 'Bank Transfer'];
const mockStatuses = ['All', 'Paid', 'Pending', 'Refunded'];
const mockTypes = ['All', 'Repair', 'Buyback', 'Appointment'];

const FinancialReport = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // State for filters
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    paymentMethod: '',
    status: '',
    type: '',
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
      paymentMethod: '',
      status: '',
      type: '',
    });
    toast.info('Filters cleared.');
  };

  /**
   * Filters the mock data based on the current filter state.
   * Memoized to prevent unnecessary re-calculations.
   */
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const itemDate = new Date(item.date); // Convert item date string to Date object

      const matchDateFrom = !filters.dateFrom || itemDate >= new Date(filters.dateFrom);
      const matchDateTo = !filters.dateTo || itemDate <= new Date(filters.dateTo);
      const matchPaymentMethod = !filters.paymentMethod || filters.paymentMethod === 'All' || item.paymentMode === filters.paymentMethod;
      const matchStatus = !filters.status || filters.status === 'All' || item.status === filters.status;
      const matchType = !filters.type || filters.type === 'All' || item.type === filters.type;

      return (
        matchDateFrom &&
        matchDateTo &&
        matchPaymentMethod &&
        matchStatus &&
        matchType
      );
    });
  }, [filters]); // Re-calculate only when filters change

  /**
   * Handles viewing a financial invoice.
   * Sets the selected invoice and opens the FinancialInvoiceModal.
   * @param {object} invoice - The invoice object to view.
   */
  const handleViewClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
    toast.info(`Viewing Invoice ID: ${invoice.invoiceId}`);
  };

  /**
   * Handles downloading a financial invoice.
   * @param {string} invoiceId - The ID of the invoice to download.
   */
  const handleDownloadClick = (invoiceId) => {
    toast.success(`📥 Invoice ${invoiceId} download started!`);
    // Actual logic for PDF download can be implemented here
  };

  // Calculate summary metrics dynamically
  const totalCollected = useMemo(() => {
    return filteredData.reduce((sum, item) => {
      return item.status === 'Paid' ? sum + item.amount : sum;
    }, 0);
  }, [filteredData]);

  const totalRefunds = useMemo(() => {
    return filteredData.reduce((sum, item) => {
      return item.status === 'Refunded' ? sum + item.amount : sum;
    }, 0);
  }, [filteredData]);

  const totalInvoices = filteredData.length;

  const totalGatewayCharges = useMemo(() => {
    // This is a placeholder; real gateway charges would come from specific data
    // For demonstration, let's assume 2% of gateway payments
    return filteredData.reduce((sum, item) => {
      return (item.paymentMode === 'Razorpay' || item.paymentMode === 'Gateway') && item.status === 'Paid'
        ? sum + item.amount * 0.02
        : sum;
    }, 0);
  }, [filteredData]);


  // Define columns for react-data-table-component
  const columns = [
    {
      name: 'Invoice ID',
      selector: (row) => row.invoiceId,
      sortable: true,
    },
    {
      name: 'Customer',
      selector: (row) => row.customer,
      sortable: true,
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => `₹${row.amount.toLocaleString()}`, // Format as currency
    },
    {
      name: 'Payment Mode',
      selector: (row) => row.paymentMode,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Paid'
              ? 'success'
              : row.status === 'Pending'
              ? 'warning'
              : row.status === 'Refunded'
              ? 'danger'
              : 'secondary' // Default
          }
          text={row.status === 'Pending' ? 'dark' : 'light'} // Ensure text color for warning badge
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex flex-row gap-2"> {/* Changed to flex-row for horizontal stacking */}
          <Button
            size="sm"
            variant="outline-primary"
            className="" // Rounded button
            onClick={() => handleViewClick(row)}
          >
            <Eye size={16} className="me-1" /> View
          </Button>
          <Button
            size="sm"
            variant="success" // Changed to solid green variant
            className="" // Rounded button
            onClick={() => handleDownloadClick(row.invoiceId)}
          >
            <FileDown size={16} className="me-1" /> Download
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4 text-primary">
        <CreditCard size={20} className="me-2" /> Financial Reports
      </h4>

      {/* Filters Card */}
      <Card className="mb-4 shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">🔍 Filter Financial Data</h5>
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
                <Form.Label className="fw-semibold">Payment Method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={filters.paymentMethod}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockPaymentMethods.map((method, index) => (
                    <option key={index} value={method === 'All' ? '' : method}>
                      {method}
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
                <Form.Label className="fw-semibold">Type</Form.Label>
                <Form.Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockTypes.map((type, index) => (
                    <option key={index} value={type === 'All' ? '' : type}>
                      {type}
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
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <Banknote size={16} /> Total Collected
            </h6>
            <h5 className="fw-bold text-primary">₹{totalCollected.toLocaleString()}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <ArrowDownLeft size={16} /> Refunds
            </h6>
            <h5 className="fw-bold text-danger">₹{totalRefunds.toLocaleString()}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <ReceiptText size={16} /> Total Invoices
            </h6>
            <h5 className="fw-bold text-dark">{totalInvoices}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <CreditCard size={16} /> Gateway Charges
            </h6>
            <h5 className="fw-bold text-info">₹{totalGatewayCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          </Card>
        </Col>
      </Row>

      {/* Transactions Table */}
      <Card className="shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">📊 Transaction Details</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            striped
            highlightOnHover
            responsive
            noDataComponent="No financial records found matching your criteria."
          />
        </Card.Body>
      </Card>

      {/* Modal */}
      <FinancialInvoiceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        invoice={selectedInvoice}
      />

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default FinancialReport;
