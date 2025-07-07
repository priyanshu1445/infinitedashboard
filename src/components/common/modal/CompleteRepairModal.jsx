import React from 'react';
import { Modal, Button, ListGroup, Badge } from 'react-bootstrap';
import {
  FileDown,
  History,
  Image,
  Undo2,
  Smartphone,
} from 'lucide-react';

const CompleteRepairModal = ({ show, onClose, data }) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          <Smartphone size={18} className="me-2 text-primary" />
          Repair Summary – {data.orderId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="fw-bold mb-3">
          Customer: <Badge bg="light" text="dark">{data.customer}</Badge>
        </h6>
        <ListGroup>
          <ListGroup.Item action className="d-flex align-items-center">
            <History size={18} className="me-2 text-info" />
            View Full Journey Log
          </ListGroup.Item>
          <ListGroup.Item action className="d-flex align-items-center">
            <FileDown size={18} className="me-2 text-success" />
            Download Invoice PDF
          </ListGroup.Item>
          <ListGroup.Item action className="d-flex align-items-center">
            <Image size={18} className="me-2 text-warning" />
            View Repair Media
          </ListGroup.Item>
          <ListGroup.Item action className="d-flex align-items-center text-danger">
            <Undo2 size={18} className="me-2" />
            Re-open Ticket (in case of callback)
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteRepairModal;
