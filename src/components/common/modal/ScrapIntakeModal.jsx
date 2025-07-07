import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Table,
} from 'react-bootstrap';

const ScrapIntakeModal = ({ show, onHide }) => {
  const [rows, setRows] = useState([
    { device: '', brand: '', category: 'Mobile', notes: '', engineer: '' },
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { device: '', brand: '', category: 'Mobile', notes: '', engineer: '' },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const updated = rows.filter((_, i) => i !== index);
      setRows(updated);
    }
  };

  const handleSubmit = () => {
    console.log('Submitted Scrap Intake:', rows);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>➕ Bulk Scrap Intake</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* CSV Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Upload CSV (Optional)</Form.Label>
          <Form.Control type="file" accept=".csv" />
        </Form.Group>

        <h6 className="fw-bold mt-4">Or Add Manually</h6>

        {/* Manual Add Table */}
        <Table bordered size="sm" responsive>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>Brand/Model</th>
              <th>Category</th>
              <th>Initial Notes</th>
              <th>Engineer</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    value={row.device}
                    onChange={(e) => handleChange(index, 'device', e.target.value)}
                    placeholder="Lenovo Tab 4"
                  />
                </td>
                <td>
                  <Form.Control
                    value={row.brand}
                    onChange={(e) => handleChange(index, 'brand', e.target.value)}
                    placeholder="Lenovo/Model X"
                  />
                </td>
                <td>
                  <Form.Select
                    value={row.category}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                  >
                    <option>Mobile</option>
                    <option>Tablet</option>
                    <option>Laptop</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Control
                    value={row.notes}
                    onChange={(e) => handleChange(index, 'notes', e.target.value)}
                    placeholder="Broken Screen"
                  />
                </td>
                <td>
                  <Form.Control
                    value={row.engineer}
                    onChange={(e) => handleChange(index, 'engineer', e.target.value)}
                    placeholder="Eng. Rakesh"
                  />
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeRow(index)}
                    disabled={rows.length === 1}
                  >
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="outline-success" onClick={addRow}>
          + Add Row
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Intake
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScrapIntakeModal;
