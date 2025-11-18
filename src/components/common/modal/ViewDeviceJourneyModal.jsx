import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewDeviceJourneyModal = ({ show, onHide, journeyData }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered> {/* ✅ Add `centered` here */}
      <Modal.Header closeButton>
        <Modal.Title>📍 Device Journey</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This will display the full journey log of the selected device.</p>
        <pre>{JSON.stringify(journeyData, null, 2)}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDeviceJourneyModal;
