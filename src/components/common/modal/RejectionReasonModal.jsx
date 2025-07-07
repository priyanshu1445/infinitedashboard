// src/components/common/modal/RejectionReasonModal.jsx
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { MessageSquareWarning } from 'lucide-react';

const RejectionReasonModal = ({
  show,
  handleClose,
  handleSubmit,
  category,
  setCategory,
  remarks,
  setRemarks,
  triggerWhatsApp,
  setTriggerWhatsApp,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <MessageSquareWarning size={20} className="text-danger" />
          Enter Rejection Reason
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Rejection Category */}
          <Form.Group controlId="rejectionCategory">
            <Form.Label className="fw-semibold">Rejection Category</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Fake Serial No.">Fake Serial No.</option>
              <option value="No NOC Provided">No NOC Provided</option>
              <option value="Device Stolen">Device Stolen (Blacklist DB Match)</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          {/* Remarks */}
          <Form.Group className="mt-3" controlId="remarks">
            <Form.Label className="fw-semibold">Remarks</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter remarks about the rejection..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            />
          </Form.Group>

          {/* WhatsApp Message Trigger */}
          <Form.Group className="mt-3">
            <Form.Check
              type="checkbox"
              label="Trigger WhatsApp Message"
              checked={triggerWhatsApp}
              onChange={(e) => setTriggerWhatsApp(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!category || !remarks.trim()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectionReasonModal;
