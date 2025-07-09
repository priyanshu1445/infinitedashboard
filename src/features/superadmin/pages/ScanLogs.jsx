import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import {
  Eye,
  FileText,
  Download,
  Info,
  Search,
  MapPin,
  XCircle, // Added for Clear Filters button
} from 'lucide-react';
import ViewDeviceJourneyModal from '../../../components/common/modal/ViewDeviceJourneyModal';
import ViewQRModal from '../../../components/common/modal/ViewQRModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Dummy data for scan logs
const mockScanLogs = [
  {
    id: 1,
    timestamp: '2025-06-28T14:10:00',
    deviceId: 'DVC-84710',
    scannedBy: 'Engineer Rahul',
    actionType: 'Repair Status Update',
    location: 'Rack B3',
    notes: 'Moved to QC',
    qrData: {
      deviceId: 'DVC-84710',
      status: 'Moved to QC',
      engineer: 'Rahul',
      timestamp: '2025-06-28T14:10:00',
      deviceName: 'OnePlus Nord',
      brandModel: 'OnePlus Nord 2',
      serial: 'SN12345',
      type: 'Mobile',
      rackSlot: 'B3',
      category: 'Repair',
      initialStatus: 'In Repair',
    },
  },
  {
    id: 2,
    timestamp: '2025-06-28T10:20:00',
    deviceId: 'DVC-32211',
    scannedBy: 'Customer Priya',
    actionType: 'Self Check-In',
    location: 'Reception',
    notes: 'Initiated by customer',
    qrData: {
      deviceId: 'DVC-32211',
      status: 'Check-In',
      by: 'Customer',
      timestamp: '2025-06-28T10:20:00',
      deviceName: 'iPhone 13',
      brandModel: 'Apple iPhone 13',
      serial: 'IMEI98765',
      type: 'Mobile',
      rackSlot: 'N/A',
      category: 'Repair',
      initialStatus: 'Awaiting Diagnosis',
    },
  },
  {
    id: 3,
    timestamp: '2025-06-27T16:00:00',
    deviceId: 'DVC-84710',
    scannedBy: 'Admin John',
    actionType: 'Device Check-Out',
    location: 'Dispatch Area',
    notes: 'Device dispatched to customer.',
    qrData: {
      deviceId: 'DVC-84710',
      status: 'Dispatched',
      engineer: 'John',
      timestamp: '2025-06-27T16:00:00',
      deviceName: 'OnePlus Nord',
      brandModel: 'OnePlus Nord 2',
      serial: 'SN12345',
      type: 'Mobile',
      rackSlot: 'N/A',
      category: 'Repair',
      initialStatus: 'Ready for Dispatch',
    },
  },
  {
    id: 4,
    timestamp: '2025-06-29T09:00:00',
    deviceId: 'DVC-55443',
    scannedBy: 'Engineer Sam',
    actionType: 'QC Check',
    location: 'QC Bench',
    notes: 'Passed all QC tests.',
    qrData: {
      deviceId: 'DVC-55443',
      status: 'QC Pass',
      engineer: 'Sam',
      timestamp: '2025-06-29T09:00:00',
      deviceName: 'Redmi Note 10',
      brandModel: 'Xiaomi Redmi Note 10',
      serial: 'XYZ789',
      type: 'Mobile',
      rackSlot: 'A1',
      category: 'Repair',
      initialStatus: 'Pending QC',
    },
  },
  {
    id: 5,
    timestamp: '2025-07-01T11:30:00',
    deviceId: 'DVC-11223',
    scannedBy: 'Engineer Alex',
    actionType: 'Refurbishment Start',
    location: 'Refurbishment Area',
    notes: 'Started display replacement.',
    qrData: {
      deviceId: 'DVC-11223',
      status: 'Refurbishing',
      engineer: 'Alex',
      timestamp: '2025-07-01T11:30:00',
      deviceName: 'Dell XPS 13',
      brandModel: 'Dell XPS 13 (2020)',
      serial: 'DLXPS001',
      type: 'Laptop',
      rackSlot: 'C5',
      category: 'Refurb',
      initialStatus: 'Awaiting Refurbishment',
    },
  },
];

const ScanLogs = () => {
  const [filters, setFilters] = useState({
    scannedBy: '',
    type: '', // Corresponds to actionType for filtering purposes
    deviceId: '',
    dateFrom: '',
    dateTo: '',
  });

  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedQRData, setSelectedQRData] = useState(null);

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
      scannedBy: '',
      type: '',
      deviceId: '',
      dateFrom: '',
      dateTo: '',
    });
    toast.info('Filters cleared.');
  };

  /**
   * Filters the scan logs based on the current filter state.
   */
  const filteredLogs = mockScanLogs.filter((log) => {
    const logDate = new Date(log.timestamp.split('T')[0]); // Get only the date part for comparison

    const matchScannedBy =
      !filters.scannedBy ||
      filters.scannedBy === 'All' ||
      log.scannedBy.toLowerCase().includes(filters.scannedBy.toLowerCase());

    const matchType =
      !filters.type ||
      filters.type === 'All' ||
      log.actionType.toLowerCase().includes(filters.type.toLowerCase());

    const matchDeviceId =
      !filters.deviceId ||
      log.deviceId.toLowerCase().includes(filters.deviceId.toLowerCase()) ||
      (log.qrData && log.qrData.serial && log.qrData.serial.toLowerCase().includes(filters.deviceId.toLowerCase()));

    const matchDateFrom =
      !filters.dateFrom || logDate >= new Date(filters.dateFrom);
    const matchDateTo =
      !filters.dateTo || logDate <= new Date(filters.dateTo);

    return matchScannedBy && matchType && matchDeviceId && matchDateFrom && matchDateTo;
  });

  /**
   * Handles viewing the device journey.
   * Opens the ViewDeviceJourneyModal and shows a toast.
   * @param {object} log - The selected scan log.
   */
  const handleViewJourney = (log) => {
    setSelectedQRData(log.qrData); // Pass the full QR data for journey details
    setShowJourneyModal(true);
    toast.info(`Viewing journey for Device ID: ${log.deviceId}`);
  };

  /**
   * Handles viewing the QR snapshot.
   * Opens the ViewQRModal and shows a toast.
   * @param {object} log - The selected scan log.
   */
  const handleViewQRSnapshot = (log) => {
    setSelectedQRData(log.qrData); // Pass the full QR data for snapshot
    setShowQRModal(true);
    toast.info(`Viewing QR snapshot for Device ID: ${log.deviceId}`);
  };

  /**
   * Handles downloading scan logs as CSV.
   */
  const handleDownloadCSV = () => {
    toast.info('Downloading scan logs as CSV...');
    // In a real application, you would generate a CSV from `filteredLogs`
    // and trigger a download.
  };

  /**
   * Handles downloading scan logs as PDF.
   */
  const handleDownloadPDF = () => {
    toast.info('Downloading scan logs as PDF...');
    // In a real application, you would generate a PDF from `filteredLogs`
    // and trigger a download.
  };

  /**
   * Handles tagging an action (Manual/API/NFC).
   * @param {object} log - The selected scan log.
   */
  const handleTagAction = (log) => {
    toast.info(`Tagging action for Device ID: ${log.deviceId}`);
    // Future logic: Open a modal to select tag type (Manual/API/NFC)
  };

  return (
    <div className="p-4 bg-light min-vh-100"> {/* Added bg-light and min-vh-100 for better page background */}
      <h4 className="fw-bold mb-4 text-primary">📜 Device Scan Logs</h4> {/* Changed heading color */}

      {/* Filters Card */}
      <Card className="mb-4 shadow-sm border-0 rounded-lg"> {/* Added border-0 and rounded-lg */}
        <Card.Header className="bg-white py-3 border-bottom-0"> {/* Styled Card Header */}
          <h5 className="mb-0 fw-bold text-dark">🔍 Filter Scan Logs</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3 mb-3"> {/* Added mb-3 for spacing between rows */}
            <Col md={3}>
              <Form.Group> {/* Use Form.Group for better label/control association */}
                <Form.Label className="fw-semibold">Date From</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="rounded-pill" // Rounded input
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
                  className="rounded-pill" // Rounded input
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Scanned By</Form.Label>
                <Form.Select
                  name="scannedBy"
                  value={filters.scannedBy}
                  onChange={handleFilterChange}
                  className="rounded-pill" // Rounded select
                >
                  <option value="">All</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Action Type</Form.Label>
                <Form.Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="rounded-pill" // Rounded select
                >
                  <option value="">All</option>
                  <option value="Repair Status Update">Repair Status Update</option>
                  <option value="Self Check-In">Self Check-In</option>
                  <option value="Device Check-Out">Device Check-Out</option>
                  <option value="QC Check">QC Check</option>
                  <option value="Refurbishment Start">Refurbishment Start</option>
                  {/* Add more action types as needed */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3 align-items-end"> {/* Align buttons at the bottom */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">Search by Device ID / Serial No.</Form.Label>
                <Form.Control
                  type="text"
                  name="deviceId"
                  value={filters.deviceId}
                  onChange={handleFilterChange}
                  placeholder="e.g. DVC-84710 or SN12345"
                  className="rounded-pill" // Rounded input
                />
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex justify-content-end gap-2"> {/* Align buttons to the right */}
              <Button variant="outline-danger" onClick={handleClearFilters} className="rounded-pill">
                <XCircle size={16} className="me-1" /> Clear Filters
              </Button>
              <Button variant="primary" onClick={handleDownloadCSV} className="rounded-pill">
                <Download size={16} className="me-1" /> Download CSV
              </Button>
              <Button variant="primary" onClick={handleDownloadPDF} className="rounded-pill">
                <FileText size={16} className="me-1" /> Download PDF
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Scan Logs Table */}
      <Card className="shadow-sm border-0 rounded-lg"> {/* Added border-0 and rounded-lg */}
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">📊 Scan Log Details</h5>
        </Card.Header>
        <Card.Body className="p-0"> {/* Removed padding to make table full width inside card */}
          <Table responsive bordered hover className="mb-0 rounded-lg overflow-hidden"> {/* Added rounded-lg and overflow-hidden */}
            <thead className="table-light">
              <tr>
                <th>Timestamp</th>
                <th>Device ID</th>
                <th>Scanned By</th>
                <th>Action Type</th>
                <th>Location</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.deviceId}</td>
                    <td>{log.scannedBy}</td>
                    <td>{log.actionType}</td>
                    <td>{log.location}</td>
                    <td>{log.notes}</td>
                    <td>
                      <Dropdown as={ButtonGroup} align="end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewJourney(log)}
                          className="d-flex align-items-center " // Rounded button
                        >
                          <MapPin size={14} className="me-1" /> Journey
                        </Button>
                        <Dropdown.Toggle
                          split
                          variant="outline-primary"
                          size="sm"
                          id={`dropdown-split-${log.id}`}
                          className="" // Rounded toggle
                        />
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleViewQRSnapshot(log)}
                            className="d-flex align-items-center"
                          >
                            <Eye size={14} className="me-2 text-primary" /> View QR Snapshot
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDownloadReport(log)}
                            className="d-flex align-items-center"
                          >
                            <Download size={14} className="me-2 text-info" /> Download Report
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleTagAction(log)}
                            className="d-flex align-items-center"
                          >
                            <Info size={14} className="me-2 text-warning" /> Tag as Manual/API/NFC
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No scan logs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modals */}
      <ViewDeviceJourneyModal
        show={showJourneyModal}
        onHide={() => setShowJourneyModal(false)}
        journeyData={selectedQRData}
      />
      <ViewQRModal
        show={showQRModal}
        onHide={() => setShowQRModal(false)}
        qrData={selectedQRData}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ScanLogs;
