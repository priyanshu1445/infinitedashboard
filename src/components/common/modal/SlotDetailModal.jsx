// SlotDetailModal.jsx
import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import {
  MoveRight,
  Printer,
  Upload,
  CheckCircle,
  User,
  Smartphone,
  Calendar,
  FileText,
  StickyNote,
  Send,
} from 'lucide-react';
import { toast } from 'react-toastify';

const SlotDetailModal = ({ show, onHide, slot }) => {
  if (!slot) return null;

  const handleAction = (type) => {
    switch (type) {
      case 'move':
        toast.info(`Move device ${slot.deviceId} to another rack`);
        break;
      case 'print':
        toast.success(`QR code label downloaded for ${slot.deviceId}`);
        break;
      case 'upload':
        toast.info(`Upload repair media for ${slot.deviceId}`);
        break;
      case 'markReady':
        toast.success(`Marked ${slot.deviceId} as Ready for Dispatch`);
        break;
      default:
        toast.warn('Unknown action');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          📦 Slot Details – <span className="text-primary">{slot.slotId}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <p><Smartphone size={16} className="me-2" /> <strong>Device ID:</strong> {slot.deviceId}</p>
            <p><User size={16} className="me-2" /> <strong>Customer:</strong> {slot.customer}</p>
            <p>
              <CheckCircle size={16} className="me-2" />
              <strong>Status:</strong>{' '}
              <Badge bg="info" className="text-dark">{slot.status}</Badge>
            </p>
          </Col>
          <Col md={6}>
            <p><Send size={16} className="me-2" /> <strong>Engineer:</strong> {slot.engineer}</p>
            <p><Calendar size={16} className="me-2" /> <strong>Intake Date:</strong> {slot.intakeDate}</p>
            <p><StickyNote size={16} className="me-2" /> <strong>Notes:</strong> {slot.notes || 'N/A'}</p>
          </Col>
        </Row>

        <hr />
        <h6 className="fw-semibold mb-3">🧰 Actions</h6>
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="outline-primary" onClick={() => handleAction('move')}>
            <MoveRight size={16} className="me-2" /> Move Device
          </Button>
          <Button variant="outline-secondary" onClick={() => handleAction('print')}>
            <Printer size={16} className="me-2" /> Print QR
          </Button>
          <Button variant="outline-warning" onClick={() => handleAction('upload')}>
            <Upload size={16} className="me-2" /> Upload Media
          </Button>
          <Button variant="outline-success" onClick={() => handleAction('markReady')}>
            <CheckCircle size={16} className="me-2" /> Mark Ready
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SlotDetailModal;
