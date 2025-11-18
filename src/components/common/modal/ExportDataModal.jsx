import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FileDown, Filter, FolderOutput } from 'lucide-react';
import { toast } from 'react-toastify';

const ExportDataModal = ({ show, onHide }) => {
  const [form, setForm] = useState({
    module: 'Repairs',
    format: 'CSV',
    dateRange: '',
    status: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExport = () => {
    toast.success(`Export started for ${form.module} in ${form.format} format.`);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FolderOutput className="me-2" size={20} />
          Export Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Module</Form.Label>
            <Form.Select name="module" value={form.module} onChange={handleChange}>
              <option>Repairs</option>
              <option>Payments</option>
              <option>Rack Logs</option>
              <option>Appointment History</option>
              <option>Buyback/Refurb Items</option>
            </Form.Select>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Form.Control
                  type="date"
                  name="dateRange"
                  value={form.dateRange}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange}>
                  <option>All</option>
                  <option>Completed</option>
                  <option>Pending</option>
                  <option>Failed</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Export Format</Form.Label>
            <Form.Check
              type="radio"
              label="CSV"
              name="format"
              value="CSV"
              checked={form.format === 'CSV'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="PDF"
              name="format"
              value="PDF"
              checked={form.format === 'PDF'}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleExport}>
          <FileDown className="me-2" size={16} />
          Export Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportDataModal;
