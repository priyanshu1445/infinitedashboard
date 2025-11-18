import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Badge } from 'react-bootstrap';
import { MessageCircle, CheckCircle, PhoneCall } from 'lucide-react';

const EscalationDetailModal = ({ show, onHide, escalation, onUpdate }) => {
  const [justification, setJustification] = useState('');
  const [finalResolution, setFinalResolution] = useState('');

  useEffect(() => {
    if (escalation) {
      setJustification('');
      setFinalResolution('');
    }
  }, [escalation]);

  const handleUpdate = () => {
    if (!escalation) return;
    const updated = {
      ...escalation,
      justification,
      finalResolution,
    };
    if (onUpdate) onUpdate(updated); // Call parent's handler
    onHide();
  };

  if (!escalation) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🚨 Escalation Details – {escalation.id}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Escalation Info */}
        <Row className="mb-3">
          <Col md={6}>
            <h6>📌 Escalation Info</h6>
            <p><strong>Customer:</strong> {escalation.customer}</p>
            <p><strong>Level:</strong> {escalation.level}</p>
            <p><strong>Reason:</strong> {escalation.reason}</p>
            <p><strong>Raised By:</strong> {escalation.raisedBy}</p>
          </Col>
          <Col md={6}>
            <h6>🛠 Handler</h6>
            <p><strong>Assigned To:</strong> {escalation.assignedTo}</p>
            <p><strong>Status:</strong> <Badge bg="warning">{escalation.status}</Badge></p>
            <p><strong>Time:</strong> {escalation.time}</p>
          </Col>
        </Row>

        <hr />

        {/* Ticket Thread Placeholder */}
        <h6>📄 Linked Ticket Thread</h6>
        <div className="bg-light p-2 rounded mb-3" style={{ maxHeight: '120px', overflowY: 'auto' }}>
          <p><strong>{escalation.customer}:</strong> Initial issue reported...</p>
          <p><strong>Engineer:</strong> Working on fix...</p>
          <p><strong>{escalation.customer}:</strong> Issue not resolved, reopening...</p>
        </div>

        {/* Justification */}
        <Form.Group className="mb-3">
          <Form.Label>⏱ SLA Justification / Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Describe reason for escalation and plan of action..."
          />
        </Form.Group>

        {/* Final Resolution */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>✅ Final Resolution</Form.Label>
              <Form.Select
                value={finalResolution}
                onChange={(e) => setFinalResolution(e.target.value)}
              >
                <option value="">Select resolution</option>
                <option>Resolved</option>
                <option>Refunded</option>
                <option>Callback Scheduled</option>
                <option>Pending Investigation</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Notification Actions */}
        <div className="d-flex justify-content-end gap-2">
          <Button variant="outline-success" size="sm">
            <PhoneCall size={16} className="me-1" />
            WhatsApp Acknowledge
          </Button>
          <Button variant="outline-primary" size="sm">
            <MessageCircle size={16} className="me-1" />
            Send Feedback Request
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleUpdate}>Update Escalation</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EscalationDetailModal;
