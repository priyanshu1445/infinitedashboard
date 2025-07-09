import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {
  Mail,
  MessageCircle,
  AlertCircle,
  Smartphone,
} from 'lucide-react';

const TicketDetailModal = ({ show, onHide, ticket, onUpdate }) => {
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [internalNote, setInternalNote] = useState('');

  // Sync local state when modal opens
  useEffect(() => {
    if (ticket) {
      setPriority(ticket.priority || '');
      setStatus(ticket.status || '');
      setInternalNote('');
    }
  }, [ticket]);

  const handleUpdate = () => {
    if (!ticket) return;
    const updatedTicket = {
      ...ticket,
      priority,
      status,
      internalNote,
    };
    onUpdate && onUpdate(updatedTicket); // Only call if provided
    onHide(); // Close modal after update
  };

  if (!ticket) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🎫 Ticket Details – {ticket.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-4">
          <Col md={6}>
            <h6 className="text-primary mb-2">👤 Customer Info</h6>
            <p className="mb-1"><strong>Name:</strong> {ticket.customer}</p>
            <p className="mb-1"><strong>Source:</strong> {ticket.source}</p>
            <p className="mb-1"><strong>Last Updated:</strong> {ticket.updated}</p>
          </Col>
          <Col md={6}>
            <h6 className="text-primary mb-2">🔧 Linked Device / Order</h6>
            <p className="mb-1"><strong>Device:</strong> {ticket.device}</p>
            <p><strong>Order ID:</strong> {ticket.orderId || 'N/A'}</p>
          </Col>
        </Row>

        <hr />
        <h6 className="text-primary mb-2">📝 Issue Summary</h6>
        <p className="mb-3">{ticket.summary || 'No detailed summary provided.'}</p>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="prioritySelect">
              <Form.Label className="fw-semibold">
                <AlertCircle size={14} className="me-1" />
                Priority
              </Form.Label>
              <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="statusSelect">
              <Form.Label className="fw-semibold">
                <Smartphone size={14} className="me-1" />
                Status
              </Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">🧠 Add Internal Note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={internalNote}
            onChange={(e) => setInternalNote(e.target.value)}
            placeholder="Type internal notes for support team..."
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-secondary" size="sm">
            <Mail size={16} className="me-1" />
            Send Email
          </Button>
          <Button variant="outline-success" size="sm">
            <MessageCircle size={16} className="me-1" />
            Send WhatsApp
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update Ticket
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketDetailModal;
