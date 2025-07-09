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
  ServerCog,
  LayoutGrid,
  PackageOpen,
  TimerReset,
  Thermometer, // Removed as not directly used in summary, but kept if needed for future
  Eye,
  Search, // For filter button
  Eraser, // For clear filters button
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RackDetailsModal from '../../../components/common/modal/RackDetailsModal';

// Dummy data for rack slots
const mockData = [
  {
    id: 1,
    rack: 'A',
    slot: 'A1',
    status: 'Occupied',
    device: 'iPhone 11',
    deviceCategory: 'Phone',
    engineer: 'Rahul K.',
    durationDays: 3, // Changed to number for calculations
    lastUpdated: '2025-07-05T10:00:00',
    notes: 'Waiting for display part.',
  },
  {
    id: 2,
    rack: 'A',
    slot: 'A2',
    status: 'Empty',
    device: 'N/A',
    deviceCategory: 'N/A',
    engineer: 'N/A',
    durationDays: 0,
    lastUpdated: '2025-07-08T15:00:00',
    notes: 'Available.',
  },
  {
    id: 3,
    rack: 'A',
    slot: 'A3',
    status: 'Occupied',
    device: 'Redmi Note 9',
    deviceCategory: 'Phone',
    engineer: 'Rahul K.',
    durationDays: 5,
    lastUpdated: '2025-07-03T09:30:00',
    notes: 'QC pending.',
  },
  {
    id: 4,
    rack: 'B',
    slot: 'B1',
    status: 'Occupied',
    device: 'Dell XPS 15',
    deviceCategory: 'Laptop',
    engineer: 'Nikhil G.',
    durationDays: 2,
    lastUpdated: '2025-07-06T11:00:00',
    notes: 'Motherboard repair in progress.',
  },
  {
    id: 5,
    rack: 'B',
    slot: 'B2',
    status: 'Awaiting QC',
    device: 'iPad Pro',
    deviceCategory: 'Tablet',
    engineer: 'Neha S.',
    durationDays: 1,
    lastUpdated: '2025-07-07T14:00:00',
    notes: 'Ready for final quality check.',
  },
  {
    id: 6,
    rack: 'B',
    slot: 'B3',
    status: 'Empty',
    device: 'N/A',
    deviceCategory: 'N/A',
    engineer: 'N/A',
    durationDays: 0,
    lastUpdated: '2025-07-08T16:00:00',
    notes: 'Available.',
  },
  {
    id: 7,
    rack: 'C',
    slot: 'C1',
    status: 'Ready to Dispatch',
    device: 'Samsung S21',
    deviceCategory: 'Phone',
    engineer: 'Priya A.',
    durationDays: 0.5,
    lastUpdated: '2025-07-08T11:00:00',
    notes: 'Packed and ready.',
  },
  {
    id: 8,
    rack: 'C',
    slot: 'C2',
    status: 'Occupied',
    device: 'MacBook Air',
    deviceCategory: 'Laptop',
    engineer: 'Priya A.',
    durationDays: 4,
    lastUpdated: '2025-07-04T13:00:00',
    notes: 'Software diagnostics.',
  },
];

// Mock data for filter dropdowns
const mockRacks = ['All', 'A', 'B', 'C'];
const mockDeviceCategories = ['All', 'Phone', 'Laptop', 'Tablet'];
const mockStatuses = ['All', 'Occupied', 'Empty', 'Awaiting QC', 'Ready to Dispatch'];

const RackUtilization = () => {
  const [selectedRack, setSelectedRack] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    rack: '',
    deviceCategory: '',
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
      rack: '',
      deviceCategory: '',
      status: '',
    });
    toast.info('Filters cleared.');
  };

  /**
   * Filters the mock data based on the current filter state.
   * Memoized to prevent unnecessary re-calculations.
   */
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchRack = !filters.rack || filters.rack === 'All' || item.rack === filters.rack;
      const matchDeviceCategory = !filters.deviceCategory || filters.deviceCategory === 'All' || item.deviceCategory.toLowerCase().includes(filters.deviceCategory.toLowerCase());
      const matchStatus = !filters.status || filters.status === 'All' || item.status === filters.status;

      return matchRack && matchDeviceCategory && matchStatus;
    });
  }, [filters]); // Re-calculate only when filters change

  /**
   * Handles viewing rack slot details.
   * Sets the selected rack item and opens the RackDetailsModal.
   * @param {object} row - The rack slot item to view.
   */
  const handleView = (row) => {
    setSelectedRack(row);
    setShowModal(true);
    toast.info(`Viewing details for Rack ${row.rack}, Slot ${row.slot}`);
  };

  // Dynamic Summary Calculations
  const totalSlots = mockData.length;
  const occupiedSlots = filteredData.filter(item => item.status === 'Occupied' || item.status === 'Awaiting QC' || item.status === 'Ready to Dispatch').length;
  const emptySlots = filteredData.filter(item => item.status === 'Empty').length;

  const getUtilization = (rackName) => {
    const rackSlots = mockData.filter(item => item.rack === rackName);
    const occupiedRackSlots = rackSlots.filter(item => item.status === 'Occupied' || item.status === 'Awaiting QC' || item.status === 'Ready to Dispatch').length;
    return rackSlots.length > 0 ? ((occupiedRackSlots / rackSlots.length) * 100).toFixed(0) + '%' : '0%';
  };

  const avgHoldTime = useMemo(() => {
    const occupiedItems = filteredData.filter(item => item.status === 'Occupied' || item.status === 'Awaiting QC' || item.status === 'Ready to Dispatch');
    if (occupiedItems.length === 0) return 'N/A';
    const totalDuration = occupiedItems.reduce((sum, item) => sum + item.durationDays, 0);
    return (totalDuration / occupiedItems.length).toFixed(1) + ' days';
  }, [filteredData]);

  // Define columns for react-data-table-component
  const columns = [
    {
      name: 'Rack',
      selector: (row) => row.rack,
      sortable: true,
      width: '80px', // Fixed width for smaller column
    },
    {
      name: 'Slot',
      selector: (row) => row.slot,
      sortable: true,
      width: '80px', // Fixed width for smaller column
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Occupied'
              ? 'primary'
              : row.status === 'Empty'
              ? 'success'
              : row.status === 'Awaiting QC'
              ? 'info'
              : row.status === 'Ready to Dispatch'
              ? 'warning'
              : 'secondary'
          }
          text={row.status === 'Empty' || row.status === 'Ready to Dispatch' ? 'dark' : 'light'}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      name: 'Device',
      selector: (row) => row.device,
      sortable: true,
    },
    {
      name: 'Assigned Engineer',
      selector: (row) => row.engineer,
      sortable: true,
    },
    {
      name: 'Duration in Slot',
      selector: (row) => row.durationDays,
      sortable: true,
      cell: (row) => `${row.durationDays} days`,
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
        <ServerCog size={20} /> Rack Utilization
      </h4>

      {/* Filters Card */}
      <Card className="mb-4 shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">🔍 Filter Rack Data</h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="g-3 align-items-end"> {/* Align items to bottom for consistent button placement */}
            <Col md={3}>
              <Form.Group>
                <Form.Label className="fw-semibold">Rack</Form.Label>
                <Form.Select
                  name="rack"
                  value={filters.rack}
                  onChange={handleFilterChange}
                  className=""
                >
                  {mockRacks.map((rack, index) => (
                    <option key={index} value={rack === 'All' ? '' : rack}>
                      {rack}
                    </option>
                  ))}
                </Form.Select>
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
            <Col md={3} className="d-flex justify-content-end gap-2">
              <Button variant="outline-danger" onClick={handleClearFilters} className="">
                <Eraser size={16} className="me-1" /> Clear 
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
              <LayoutGrid size={16} /> Rack A Utilization
            </h6>
            <h5 className="fw-bold text-primary">{getUtilization('A')}</h5>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <LayoutGrid size={16} /> Rack B Utilization
            </h6>
            <h5 className="fw-bold text-primary">{getUtilization('B')}</h5>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <LayoutGrid size={16} /> Rack C Utilization
            </h6>
            <h5 className="fw-bold text-primary">{getUtilization('C')}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <PackageOpen size={16} /> Empty Slots
            </h6>
            <h5 className="fw-bold text-success">{emptySlots}</h5>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 text-center shadow-sm rounded-lg border-0">
            <h6 className="text-muted d-flex justify-content-center align-items-center gap-1">
              <TimerReset size={16} /> Avg. Hold Time
            </h6>
            <h5 className="fw-bold text-info">{avgHoldTime}</h5>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card className="shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark">📋 Rack Slot Details</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            striped
            highlightOnHover
            responsive
            noDataComponent="No rack slots found matching your criteria."
          />
        </Card.Body>
      </Card>

      <RackDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedRack}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default RackUtilization;
