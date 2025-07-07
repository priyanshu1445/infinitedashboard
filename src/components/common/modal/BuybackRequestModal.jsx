import React from 'react';
import { Modal, Row, Col, Form, Image } from 'react-bootstrap';
import {
  Phone,
  User,
  MapPin,
  Smartphone,
  Barcode,
  ImageIcon,
  FileText,
  CalendarClock,
  Paperclip,
} from 'lucide-react';

const BuybackRequestModal = ({ show, onHide, data }) => {
  if (!data) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <FileText size={20} className="me-2 text-primary" />
          Buyback Request Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4">
        <Row>
          {/* Customer Info */}
          <Col md={6} className="mb-3">
            <h6 className="fw-bold mb-3 d-flex align-items-center text-secondary">
              <User size={16} className="me-2 text-primary" /> Customer Info
            </h6>
            <p>
              <strong className="me-1">
                <User size={14} className="me-1" /> Name:
              </strong>{' '}
              {data.customerName}
            </p>
            <p>
              <strong className="me-1">
                <Phone size={14} className="me-1" /> Phone:
              </strong>{' '}
              {data.phone}
            </p>
            <p>
              <strong className="me-1">
                <MapPin size={14} className="me-1" /> Address:
              </strong>{' '}
              {data.address}
            </p>
          </Col>

          {/* Device Info */}
          <Col md={6} className="mb-3">
            <h6 className="fw-bold mb-3 d-flex align-items-center text-secondary">
              <Smartphone size={16} className="me-2 text-primary" /> Device Info
            </h6>
            <p>
              <strong>Model:</strong> {data.device}
            </p>
            <p>
              <strong>
                <Barcode size={14} className="me-1" /> IMEI:
              </strong>{' '}
              Not Provided
            </p>
            <p>
              <strong>
                <Barcode size={14} className="me-1" /> Serial No:
              </strong>{' '}
              Not Provided
            </p>
          </Col>
        </Row>

        <hr />

        {/* Uploaded Images */}
        <h6 className="fw-bold d-flex align-items-center mb-3 text-secondary">
          <ImageIcon size={16} className="me-2 text-primary" /> Uploaded Images
        </h6>
        <div className="d-flex gap-3 mb-4">
          <Image src="https://via.placeholder.com/100" thumbnail />
          <Image src="https://via.placeholder.com/100" thumbnail />
        </div>

        {/* NOC Upload Status */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold d-flex align-items-center text-secondary">
            <FileText size={16} className="me-2 text-primary" />
            NOC Upload Status
          </Form.Label>
          <Form.Select defaultValue="Pending">
            <option>Pending</option>
            <option>Uploaded</option>
          </Form.Select>
        </Form.Group>

        {/* Pickup Slot Assignment */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold d-flex align-items-center text-secondary">
            <CalendarClock size={16} className="me-2 text-primary" />
            Assign Pickup Slot
          </Form.Label>
          <Form.Control type="datetime-local" />
        </Form.Group>

        {/* Attach PDF */}
        <Form.Group>
          <Form.Label className="fw-semibold d-flex align-items-center text-secondary">
            <Paperclip size={16} className="me-2 text-primary" />
            Attach Terms/NOC PDF
          </Form.Label>
          <Form.Control type="file" accept=".pdf" />
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
};

export default BuybackRequestModal;
