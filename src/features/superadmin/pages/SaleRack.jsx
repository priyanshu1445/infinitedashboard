import React, { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {
  Eye,
  MoveHorizontal,
  Download,
  ShoppingCart,
  Filter,
  Package,
  FileDown,
} from 'lucide-react';
import { CSVLink } from 'react-csv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SaleDeviceModal from '../../../components/common/modal/SaleDeviceModal';

const mockSaleData = [
  {
    id: 1,
    device: 'Samsung M12',
    engineer: 'Nikhil S.',
    qcDate: '27-Jun',
    price: 3999,
    rack: 'Rack C2',
    status: 'Available',
  },
  {
    id: 2,
    device: 'Redmi Note 10',
    engineer: 'Sneha K.',
    qcDate: '28-Jun',
    price: 4599,
    rack: 'Rack B1',
    status: 'Reserved',
  },
  {
    id: 3,
    device: 'Realme Narzo 50',
    engineer: 'Ajay M.',
    qcDate: '25-Jun',
    price: 4299,
    rack: 'Rack A3',
    status: 'Sold',
  },
  {
    id: 4,
    device: 'iPhone SE 2020',
    engineer: 'Pooja R.',
    qcDate: '29-Jun',
    price: 10999,
    rack: 'Rack D4',
    status: 'Available',
  },
];

const SaleRack = () => {
  const [search, setSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = mockSaleData.filter((item) =>
    `${item.device} ${item.rack}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleView = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleToast = (msg, type = 'info') => {
    toast[type](msg, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  const columns = [
    { name: 'Device', selector: (row) => row.device, sortable: true },
    { name: 'Refurb By', selector: (row) => row.engineer },
    { name: 'QC Date', selector: (row) => row.qcDate },
    {
      name: 'Price',
      selector: (row) => `₹${row.price}`,
      sortable: true,
    },
    { name: 'Rack/Slot', selector: (row) => row.rack },
    {
      name: 'Status',
      selector: (row) => (
        <span
          className={`badge bg-${
            row.status === 'Available'
              ? 'success'
              : row.status === 'Reserved'
              ? 'warning'
              : 'secondary'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => handleView(row)}
          >
            <Eye size={14} className="me-1" />
            View
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-primary" />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleToast(`${row.device} moved to another slot`, 'success')}
            >
              <MoveHorizontal size={14} className="me-2" />
              Move Slot
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleToast(`${row.device} reserved`, 'info')}
            >
              <ShoppingCart size={14} className="me-2" />
              Reserve Item
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleToast(`PDF generated for ${row.device}`, 'success')}
            >
              <Download size={14} className="me-2" />
              Generate PDF
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
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <Package size={18} className="me-2 text-success" />
        Sale Rack Items
      </h5>

      <Row className="g-3 align-items-end mb-3">
        <Col md={4}>
          <Form.Label className="fw-semibold d-flex align-items-center">
            <Filter size={16} className="me-2" />
            Search
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Search Rack / Slot / Device"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md="auto">
          <CSVLink
            data={filteredData}
            filename="sale_rack_items.csv"
            className="btn btn-outline-secondary mt-3"
          >
            <FileDown size={16} className="me-2" />
            Export CSV
          </CSVLink>
        </Col>
      </Row>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        striped
        highlightOnHover
        responsive
      />

      {selectedRow && (
        <SaleDeviceModal
          show={showModal}
          onHide={() => setShowModal(false)}
          device={selectedRow}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default SaleRack;
