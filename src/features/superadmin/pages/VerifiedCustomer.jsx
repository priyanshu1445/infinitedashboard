import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Dropdown, ButtonGroup } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Eye, Wallet, Ticket, UserX, Search, Smartphone, Repeat, FileDown } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import VerifiedCustomerModal from '../../../components/common/modal/VerifiedCustomerModal';
import { getAllUsers } from '../../../apis/admin/users'; // ✅ Import API
import '../../../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

const VerifiedCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [serviceCount, setServiceCount] = useState('');
  const [repeatOnly, setRepeatOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (msg) => toast.success(msg);

  // ✅ Fetch real users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        // Handle possible response structures safely
        const usersArray = res?.data?.data || res?.data || res || [];
        setCustomers(Array.isArray(usersArray) ? usersArray : []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch verified customers');
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Apply filters to users
  const filteredData = Array.isArray(customers)
    ? customers.filter((c) => {
        const name = (c.name || c.fullName || '').toLowerCase();
        const email = (c.email || '').toLowerCase();
        const phone = (c.phone || c.mobile || '').toLowerCase();
        const city = (c.city || '').toLowerCase();
        const query = `${name} ${email} ${phone} ${city}`;
        const matchesSearch = query.includes(search.toLowerCase());
        const matchesDevice = deviceType ? c.device?.includes(deviceType) : true;
        const matchesService = serviceCount ? (c.services || 0) >= Number(serviceCount) : true;
        const matchesRepeat = repeatOnly ? (c.services || 0) > 1 : true;
        return matchesSearch && matchesDevice && matchesService && matchesRepeat;
      })
    : [];

  const columns = [
    { name: '#', selector: (row, i) => i + 1, width: '50px' },
    { name: 'Name', selector: (row) => row.name || row.fullName || 'N/A' },
    { name: 'Email', selector: (row) => row.email || 'N/A' },
    { name: 'Phone', selector: (row) => row.phone || row.mobile || 'N/A' },
    { name: 'City', selector: (row) => row.city || 'N/A' },
    { name: 'Services Availed', selector: (row) => row.services || 0 },
    {
      name: 'Wallet Balance',
      selector: (row) => row.wallet || 0,
      cell: (row) => `₹${row.wallet || 0}`,
    },
    { name: 'Joined On', selector: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A' },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
              setSelectedCustomer(row);
              setShowModal(true);
            }}
          >
            <Eye size={14} className="me-1" /> View
          </Button>
          <Dropdown.Toggle split variant="outline-primary" size="sm" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => notify(`Credit wallet for ${row.name || row.fullName}`)}>
              <Wallet size={14} className="me-2" /> Credit Wallet
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`View tickets for ${row.name || row.fullName}`)}>
              <Ticket size={14} className="me-2" /> View Tickets
            </Dropdown.Item>
            <Dropdown.Item onClick={() => notify(`Disabled ${row.name || row.fullName}'s account`)}>
              <UserX size={14} className="me-2" /> Disable / Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <Eye size={18} className="me-2 text-primary" />
        Verified Customers
      </h5>

      {/* Filters */}
      <Row className="g-3 mb-3 align-items-end">
        <Col md={4}>
          <Form.Label className="d-flex align-items-center">
            <Search size={16} className="me-2" /> Search
          </Form.Label>
          <Form.Control
            placeholder="By Name / Email / Phone / City"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Label className="d-flex align-items-center">
            <Smartphone size={16} className="me-2" /> Device Type
          </Form.Label>
          <Form.Select value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
            <option value="">All</option>
            <option value="iPhone">iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Realme">Realme</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label>Min Services</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 2"
            value={serviceCount}
            onChange={(e) => setServiceCount(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <div className="d-flex justify-content-between align-items-center">
            <Form.Check
              type="checkbox"
              label={
                <>
                  <Repeat size={14} className="me-2" /> Repeat Only
                </>
              }
              checked={repeatOnly}
              onChange={(e) => setRepeatOnly(e.target.checked)}
            />
            <CSVLink
              data={filteredData}
              filename="verified-customers.csv"
              className="btn btn-outline-secondary btn-sm ms-2"
            >
              <FileDown size={14} className="me-1" /> Export CSV
            </CSVLink>
          </div>
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
      <VerifiedCustomerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        customer={selectedCustomer}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VerifiedCustomer;
