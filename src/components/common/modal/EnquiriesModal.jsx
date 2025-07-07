import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const EnquiryModal = ({ show, onClose, enquiry }) => {
  const [internalNote, setInternalNote] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  if (!enquiry) return null;

  const handleAutoSchedulePickup = () => {
    // Simulated Shiprocket logic
    toast.success(`🚚 Pickup auto-scheduled for ${enquiry.name}`);
  };

  const handleTagEngineer = () => {
    if (!assignedTo) {
      toast.warn("Please select an engineer or team first.");
      return;
    }
    toast.success(`🔖 Tagged ${enquiry.name} to ${assignedTo}`);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>📌 Enquiry Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Customer Info */}
        <h6 className="mb-3">👤 Customer Info</h6>
        <p><strong>Name:</strong> {enquiry.name}</p>
        <p><strong>Phone:</strong> {enquiry.phone}</p>
        <p><strong>Device:</strong> {enquiry.device}</p>
        <p><strong>Source:</strong> {enquiry.source}</p>
        <p><strong>Date:</strong> {enquiry.date}</p>

        {/* Issue Description */}
        <h6 className="mt-4 mb-2">🔧 Issue Description</h6>
        <p>{enquiry.issue}</p>

        {/* Pickup Option */}
        <h6 className="mt-4 mb-2">🚚 Pickup Option</h6>
        <Button variant="outline-success" size="sm" onClick={handleAutoSchedulePickup}>
          Auto-schedule via Shiprocket
        </Button>

        {/* Internal Notes */}
        <h6 className="mt-4 mb-2">📝 Internal Notes</h6>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add any internal comments here..."
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
        />

        {/* Tag Engineer / Team */}
        <h6 className="mt-4 mb-2">👨‍🔧 Tag with Engineer / Team</h6>
        <Form.Select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Select Engineer or Team</option>
          <option value="engineer1">Engineer 1</option>
          <option value="engineer2">Engineer 2</option>
          <option value="teamA">Team A</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleTagEngineer}>Assign</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnquiryModal;
