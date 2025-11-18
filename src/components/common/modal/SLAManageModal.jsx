import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {
  AlertCircle,
  RefreshCcw,
  CheckCircle,
  Info,
  Clock,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { toast } from 'react-toastify';

const SLAManageModal = ({ show, onHide, ticket }) => {
  if (!ticket) return null;

  // Toast Handlers with Lucide Icons
  const handleEscalate = () => {
    toast.error(
      <>
        <AlertCircle size={18} className="me-2 text-danger" />
        Ticket <strong>{ticket.id}</strong> escalated!
      </>
    );
    onHide();
  };

  const handleReassign = () => {
    toast.warning(
      <>
        <RefreshCcw size={18} className="me-2 text-warning" />
        Ticket <strong>{ticket.id}</strong> reassigned!
      </>
    );
    onHide();
  };

  const handleSave = () => {
    toast.success(
      <>
        <CheckCircle size={18} className="me-2 text-success" />
        Changes saved for ticket <strong>{ticket.id}</strong>
      </>
    );
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <Clock size={18} className="me-2 text-primary" />
          SLA Ticket Management – {ticket.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <h6 className="d-flex align-items-center">
              <Info size={16} className="me-2 text-secondary" />
              Ticket Info
            </h6>
            <p className="mb-1"><strong>Priority:</strong> {ticket.priority}</p>
            <p className="mb-1"><strong>Status:</strong> {ticket.status}</p>
            <p className="mb-1"><strong>SLA Deadline:</strong> {ticket.deadline}</p>
            <p className="mb-1"><strong>Time Remaining:</strong> {ticket.timeRemaining}</p>
          </Col>

          <Col md={6}>
            <h6 className="d-flex align-items-center">
              <ShieldCheck size={16} className="me-2 text-secondary" />
              Assigned Engineer
            </h6>
            <Form.Group className="mb-2">
              <Form.Label>Engineer</Form.Label>
              <Form.Select defaultValue={ticket.assigned || ''}>
                <option>Eng. Rakesh</option>
                <option>Eng. Priya</option>
                <option>Eng. Sneha</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select defaultValue={ticket.status}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Escalated</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <FileText size={16} className="me-2 text-muted" />
            Internal Note
          </Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Add a note for internal tracking..." />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleEscalate}>
          <AlertCircle size={16} className="me-1" />
          Escalate
        </Button>
        <Button variant="warning" onClick={handleReassign}>
          <RefreshCcw size={16} className="me-1" />
          Reassign
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          <CheckCircle size={16} className="me-1" />
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SLAManageModal;
