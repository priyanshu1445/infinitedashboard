import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const QcModal = ({ show, onClose, data }) => {
  const [checklist, setChecklist] = useState({
    battery: false,
    display: false,
    camera: false,
    ports: false,
  });

  const [remarks, setRemarks] = useState('');
  const [files, setFiles] = useState([]);

  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    setChecklist((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = () => {
    console.log({
      checklist,
      remarks,
      files,
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>QC Report – {data?.device}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="mb-3">Checklist</h6>
        <Row>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Battery"
              name="battery"
              checked={checklist.battery}
              onChange={handleChecklistChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Display"
              name="display"
              checked={checklist.display}
              onChange={handleChecklistChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Camera"
              name="camera"
              checked={checklist.camera}
              onChange={handleChecklistChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Ports"
              name="ports"
              checked={checklist.ports}
              onChange={handleChecklistChange}
            />
          </Col>
        </Row>

        <Form.Group className="mt-4">
          <Form.Label>Upload Images / Videos</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Approve for Dispatch
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QcModal;
