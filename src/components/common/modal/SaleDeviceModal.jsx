import React from 'react';
import { Modal, Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Download, CheckCircle, XCircle, FileText } from 'lucide-react';

const SaleDeviceModal = ({ show, onHide, device }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Device Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="text-center">
            <Image
              src={device?.image || 'https://via.placeholder.com/150'}
              fluid
              rounded
              className="border p-2"
            />
            <p className="mt-2 fw-semibold">{device?.name || 'Device Name'}</p>
          </Col>

          <Col md={8}>
            <h6 className="fw-bold mb-2">Final QC Checklist</h6>
            <ListGroup className="mb-3">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Battery Check <CheckCircle size={18} className="text-success" />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Touchscreen Test <CheckCircle size={18} className="text-success" />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Camera Function <XCircle size={18} className="text-danger" />
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Audio Output <CheckCircle size={18} className="text-success" />
              </ListGroup.Item>
            </ListGroup>

            <h6 className="fw-bold mb-2">Repair Logs</h6>
            <ul className="ps-3 mb-3">
              <li>Refurb Started: 25 Jun by Nikhil</li>
              <li>Battery Replaced: 26 Jun</li>
              <li>QC Performed: 27 Jun</li>
            </ul>

            <Button variant="outline-primary" className="me-2">
              <FileText size={16} className="me-1" /> PDF Invoice
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">
          <CheckCircle size={16} className="me-1" /> Mark as Sold
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaleDeviceModal;
