import React from 'react';
import { Modal, Button, Row, Col, Badge, Table } from 'react-bootstrap';

const AppointmentDetailsModal = ({ show, onHide, appointment }) => {
  if (!appointment) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg"> {/* Changed size to lg for more space */}
      <Modal.Header closeButton>
        <Modal.Title>📅 Appointment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <strong>ID:</strong> {appointment.id}
          </Col>
          <Col md={6}>
            <strong>Customer:</strong> {appointment.customer}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <strong>Engineer:</strong> {appointment.engineer}
          </Col>
          <Col md={6}>
            <strong>Type:</strong> {appointment.type}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <strong>Status:</strong>{' '}
            <Badge
              bg={
                appointment.status === 'Completed'
                  ? 'success'
                  : appointment.status === 'Pending'
                  ? 'warning'
                  : appointment.status === 'No-show' || appointment.status === 'Cancelled'
                  ? 'danger'
                  : 'secondary'
              }
              text={appointment.status === 'Pending' ? 'dark' : 'light'}
            >
              {appointment.status}
            </Badge>
          </Col>
          <Col md={6}>
            <strong>Payment:</strong> ₹{appointment.payment ? appointment.payment.toLocaleString() : '0'}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <strong>Duration:</strong> {appointment.durationMin ? `${appointment.durationMin} min` : 'N/A'}
          </Col>
          <Col md={6}>
            <strong>Date:</strong> {appointment.date}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <strong>Notes:</strong>
            <p>{appointment.notes || 'N/A'}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <strong>Booked Via:</strong> {appointment.source || 'Online'}
          </Col>
        </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentDetailsModal;
