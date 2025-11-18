import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Dropdown, ButtonGroup, Form } from 'react-bootstrap';
import {
  FileText,
  Eye,
  Download,
  Search,
  MoreVertical,
} from 'lucide-react';
import CompleteRepairModal from '../../../components/common/modal/CompleteRepairModal';

const mockCompletedData = [
  {
    id: 1,
    orderId: 'R#201212',
    customer: 'Mansi Shah',
    invoiceNumber: 'INV-45612',
    amount: 2800,
    paymentMode: 'UPI',
    dispatchedOn: '27-Jun',
  },
  {
    id: 2,
    orderId: 'R#201213',
    customer: 'Rohan Verma',
    invoiceNumber: 'INV-45613',
    amount: 3900,
    paymentMode: 'Card',
    dispatchedOn: '28-Jun',
  },
  {
    id: 3,
    orderId: 'R#201214',
    customer: 'Priya Nair',
    invoiceNumber: 'INV-45614',
    amount: 3400,
    paymentMode: 'Cash',
    dispatchedOn: '28-Jun',
  },
  {
    id: 4,
    orderId: 'R#201215',
    customer: 'Ankit Desai',
    invoiceNumber: 'INV-45615',
    amount: 4500,
    paymentMode: 'UPI',
    dispatchedOn: '29-Jun',
  },
  {
    id: 5,
    orderId: 'R#201216',
    customer: 'Ritika Malhotra',
    invoiceNumber: 'INV-45616',
    amount: 3100,
    paymentMode: 'Card',
    dispatchedOn: '29-Jun',
  },
  {
    id: 6,
    orderId: 'R#201217',
    customer: 'Suresh K.',
    invoiceNumber: 'INV-45617',
    amount: 2750,
    paymentMode: 'Cash',
    dispatchedOn: '30-Jun',
  },
  {
    id: 7,
    orderId: 'R#201218',
    customer: 'Neha Gupta',
    invoiceNumber: 'INV-45618',
    amount: 3600,
    paymentMode: 'UPI',
    dispatchedOn: '30-Jun',
  },
  {
    id: 8,
    orderId: 'R#201219',
    customer: 'Rahul Jain',
    invoiceNumber: 'INV-45619',
    amount: 4200,
    paymentMode: 'Card',
    dispatchedOn: '01-Jul',
  },
  {
    id: 9,
    orderId: 'R#201220',
    customer: 'Sneha Mehta',
    invoiceNumber: 'INV-45620',
    amount: 3050,
    paymentMode: 'Cash',
    dispatchedOn: '01-Jul',
  },
  {
    id: 10,
    orderId: 'R#201221',
    customer: 'Vikas Sharma',
    invoiceNumber: 'INV-45621',
    amount: 3990,
    paymentMode: 'UPI',
    dispatchedOn: '02-Jul',
  },
];


const CompleteRepair = () => {
  const [search, setSearch] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = mockCompletedData.filter((item) =>
    `${item.orderId} ${item.customer} ${item.invoiceNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { name: '#', selector: (_, i) => i + 1, width: '60px' },
    { name: 'Order ID', selector: (row) => row.orderId },
    { name: 'Customer', selector: (row) => row.customer },
    { name: 'Invoice #', selector: (row) => row.invoiceNumber },
    { name: 'Amount', selector: (row) => `₹${row.amount}` },
    { name: 'Payment Mode', selector: (row) => row.paymentMode },
    { name: 'Dispatched On', selector: (row) => row.dispatchedOn },
    {
      name: 'Actions',
      cell: (row) => (
        <Dropdown as={ButtonGroup}>
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => {
              setSelectedRow(row);
              setShowModal(true);
            }}
          >
            <FileText size={14} className="me-1" />
            View PDF
          </Button>
          <Dropdown.Toggle split size="sm" variant="outline-success" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => console.log('Download Invoice')}>
              <Download size={14} className="me-2" />
              Download Invoice PDF
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('View Media')}>
              <Eye size={14} className="me-2" />
              View Repair Media
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('Re-open Ticket')}>
              <MoreVertical size={14} className="me-2" />
              Re-open Ticket
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div>
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <FileText size={18} className="me-2 text-dark" />
        Completed & Invoiced Repairs
      </h5>

      <Form.Group className="mb-3 d-flex align-items-center">
        <Search size={16} className="me-2" />
        <Form.Control
          type="text"
          placeholder="Search by Order ID, Customer or Invoice"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        striped
        highlightOnHover
        responsive
      />

      <CompleteRepairModal
        show={showModal}
        onClose={() => setShowModal(false)}
        data={selectedRow}
      />
    </div>
  );
};

export default CompleteRepair;
