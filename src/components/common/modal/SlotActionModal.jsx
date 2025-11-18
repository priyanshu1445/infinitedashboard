import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Badge,
} from 'react-bootstrap';
import {
  Eye,
  MoveRight,
  Pencil,
  Save,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';

const SlotActionModal = ({ show, onHide, slot }) => {
  const [status, setStatus] = useState(slot?.status || '');
  const [notes, setNotes] = useState(slot?.notes || '');

  const handleUpdate = () => {
    toast.success(`Slot ${slot?.slot} updated!`);
    onHide();
  };

  if (!slot) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          🔍 Slot: {slot.slot} ({slot.device})
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <p><strong>Rack:</strong> {slot.rack}</p>
            <p><strong>Status:</strong> <Badge bg="info">{slot.status}</Badge></p>
            <p><strong>Entry Date:</strong> {slot.entryDate}</p>
          </Col>
          <Col md={6}>
            <p><strong>Customer:</strong> {slot.customer}</p>
            <p><strong>Engineer:</strong> {slot.engineer}</p>
            <p><strong>Device:</strong> {slot.device}</p>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>
            <Pencil size={14} className="me-1" />
            Update Status
          </Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Occupied</option>
            <option>In QC</option>
            <option>Pending Repair</option>
            <option>Ready for Dispatch</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Update Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add remarks, updates or technician feedback..."
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" onClick={() => toast.info('Viewing full journey')}>
            <Eye size={16} className="me-1" />
            View Journey
          </Button>

          <Button variant="outline-warning" onClick={() => toast.info('Move to new slot triggered')}>
            <MoveRight size={16} className="me-1" />
            Move Slot
          </Button>

          <Button variant="primary" onClick={handleUpdate}>
            <Save size={16} className="me-1" />
            Save Changes
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <X size={14} className="me-1" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SlotActionModal;
