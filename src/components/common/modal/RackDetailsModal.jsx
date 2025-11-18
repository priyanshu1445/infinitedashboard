import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RackDetailsModal = ({ show, onHide, data }) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rack Slot Details - {data.rack}/{data.slot}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Device:</strong> {data.device}</p>
        <p><strong>Assigned Engineer:</strong> {data.engineer}</p>
        <p><strong>Duration in Slot:</strong> {data.duration}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RackDetailsModal;
