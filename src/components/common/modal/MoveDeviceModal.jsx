import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

const availableSlots = {
  A: ['A1', 'A2', 'A3', 'A4'],
  B: ['B1', 'B2'],
  C: ['C1', 'C2', 'C3'],
};

const MoveDeviceModal = ({ show, onHide }) => {
  const [deviceId, setDeviceId] = useState('');
  const [currentRack, setCurrentRack] = useState('A');
  const [currentSlot, setCurrentSlot] = useState('A1');

  const [newRack, setNewRack] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [note, setNote] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleMove = () => {
    if (!deviceId || !newRack || !newSlot) {
      toast.error('Please fill all required fields');
      return;
    }
    setShowConfirm(true);
  };

  const confirmMove = () => {
    toast.success(`Device ${deviceId} moved to ${newRack}/${newSlot}`);
    onHide();
    resetForm();
  };

  const resetForm = () => {
    setDeviceId('');
    setCurrentRack('A');
    setCurrentSlot('A1');
    setNewRack('');
    setNewSlot('');
    setNote('');
    setShowConfirm(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>🔁 Move Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>📦 Device ID</Form.Label>
            <Form.Control
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="Enter or Scan Device ID"
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Current Rack</Form.Label>
                <Form.Select
                  value={currentRack}
                  onChange={(e) => setCurrentRack(e.target.value)}
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Current Slot</Form.Label>
                <Form.Control
                  type="text"
                  value={currentSlot}
                  onChange={(e) => setCurrentSlot(e.target.value)}
                  placeholder="Enter current slot"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>New Rack</Form.Label>
                <Form.Select
                  value={newRack}
                  onChange={(e) => {
                    setNewRack(e.target.value);
                    setNewSlot(''); // Reset new slot when rack changes
                  }}
                >
                  <option value="">Select</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>New Slot</Form.Label>
                <Form.Select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  disabled={!newRack}
                >
                  <option value="">Select</option>
                  {newRack &&
                    availableSlots[newRack].map((slot) => (
                      <option key={slot}>{slot}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>📝 Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional notes"
            />
          </Form.Group>
        </Form>

        {showConfirm && (
          <Alert variant="warning" className="mt-3">
            Are you sure you want to move <strong>{deviceId}</strong> to <strong>{newRack}/{newSlot}</strong>?
            <div className="d-flex justify-content-end mt-2">
              <Button size="sm" variant="secondary" className="me-2" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="success" onClick={confirmMove}>
                Confirm Move
              </Button>
            </div>
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleMove}>
          Move Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoveDeviceModal;
