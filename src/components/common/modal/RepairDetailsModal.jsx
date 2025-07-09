import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RepairDetailsModal = ({ show, onHide, report }) => {
  if (!report) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>📋 Repair Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Device ID:</strong> {report.deviceId}</p>
        <p><strong>Customer:</strong> {report.customer}</p>
        <p><strong>Engineer:</strong> {report.engineer}</p>
        <p><strong>Status:</strong> {report.status}</p>
        <p><strong>Repair Time:</strong> {report.repairTime}</p>
        <p><strong>QC Result:</strong> {report.qcResult}</p>
        <p><strong>Rack Slot:</strong> {report.rackSlot}</p>
        <p><strong>Logged At:</strong> {new Date().toLocaleString()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RepairDetailsModal;
