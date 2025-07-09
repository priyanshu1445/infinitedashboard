import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VideoLogActionModal = ({ show, onHide, log }) => {
  if (!log) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>📋 Call Details – {log.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Customer:</strong> {log.customer}</p>
        <p><strong>Engineer:</strong> {log.engineer}</p>
        <p><strong>Platform:</strong> {log.platform}</p>
        <p><strong>Duration:</strong> {log.duration}</p>
        <p><strong>Status:</strong> {log.status}</p>
        <hr />
        <p><strong>Recording URL:</strong> (if stored)</p>
        <p><strong>Notes:</strong> Engineer notes here...</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={() => alert("Report Shared")}>Share Report</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoLogActionModal;
