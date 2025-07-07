import React, { useState } from 'react';
import { Button, Badge, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Eye, CheckSquare, Search } from 'lucide-react';
import QcModal from '../../../components/common/modal/QcModal'; // adjust path if needed

const mockQcData = [
  {
    id: 1,
    device: 'Dell Vostro',
    customer: 'Rahul Jain',
    repairedBy: 'Eng. Nikhil',
    qcEngineer: 'QC Ramesh',
    checklistScore: '5/5',
    passed: true,
    mediaUploaded: true,
  },
  {
    id: 2,
    device: 'HP Pavilion',
    customer: 'Tina Sharma',
    repairedBy: 'Eng. Neha',
    qcEngineer: 'QC Ravi',
    checklistScore: '4/5',
    passed: false,
    mediaUploaded: false,
  },
  {
    id: 3,
    device: 'Lenovo ThinkPad',
    customer: 'Amit B.',
    repairedBy: 'Eng. Anil',
    qcEngineer: 'QC Ramesh',
    checklistScore: '5/5',
    passed: true,
    mediaUploaded: true,
  },
  {
    id: 4,
    device: 'MacBook Pro',
    customer: 'Shruti K.',
    repairedBy: 'Eng. Priya',
    qcEngineer: 'QC Ravi',
    checklistScore: '3/5',
    passed: false,
    mediaUploaded: false,
  },
];

const Qc = () => {
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');

  const filteredData = mockQcData.filter((item) =>
    `${item.device} ${item.customer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { name: 'Device', selector: row => row.device },
    { name: 'Customer', selector: row => row.customer },
    { name: 'Repaired By', selector: row => row.repairedBy },
    { name: 'QC Engineer', selector: row => row.qcEngineer },
    {
      name: 'QC Checklist',
      selector: row => row.checklistScore,
      cell: row => (
        <Badge bg={row.checklistScore === '5/5' ? 'success' : 'warning'}>
          ✅ {row.checklistScore}
        </Badge>
      ),
    },
    {
      name: 'Passed?',
      cell: row =>
        row.passed ? (
          <Badge bg="success">Yes</Badge>
        ) : (
          <Badge bg="danger">No</Badge>
        ),
    },
    {
      name: 'Uploaded Media',
      cell: row =>
        row.mediaUploaded ? (
          <Badge bg="info">Yes</Badge>
        ) : (
          <Badge bg="secondary">No</Badge>
        ),
    },
    {
      name: 'Actions',
      cell: row => (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => {
            setSelected(row);
            setShow(true);
          }}
        >
          <Eye size={14} className="me-1" />
          View
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  return (
    <div>
      <h5 className="fw-bold mb-3 d-flex align-items-center">
        <CheckSquare size={18} className="me-2 text-success" />
        In QC (Quality Check)
      </h5>

      {/* 🔍 Search Input */}
      <Form.Group className="mb-3 d-flex align-items-center" controlId="qcSearch">
        <Search size={16} className="me-2" />
        <Form.Control
          type="text"
          placeholder="Search by Device or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      {/* 📋 Table */}
      <div className="custom-table-wrapper">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          striped
          highlightOnHover
          responsive
          dense={false} // You can remove this if not needed
        />
      </div>

      {/* QC Modal */}
      <QcModal show={show} onClose={() => setShow(false)} data={selected} />
    </div>
  );
};

export default Qc;
