// components/common/modal/WorkDetailModal.jsx
import React from 'react';
import { Modal, Button, Row, Col, Badge, Image } from 'react-bootstrap';

const WorkDetailModal = ({ show, onHide, record }) => {
  if (!record) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>📝 Work History Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <strong>Device:</strong> {record.device}
          </Col>
          <Col md={6}>
            <strong>Task:</strong> {record.task}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <strong>Date:</strong> {record.date}
          </Col>
          <Col md={6}>
            <strong>Engineer:</strong> {record.engineer} {/* Added Engineer field */}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <strong>Status:</strong>{' '}
            <Badge
              bg={
                record.status === 'Completed'
                  ? 'success'
                  : record.status === 'Pending'
                  ? 'warning'
                  : record.status === 'Missed'
                  ? 'danger'
                  : record.status === 'In Progress'
                  ? 'info'
                  : 'secondary'
              }
              text={record.status === 'Pending' || record.status === 'In Progress' ? 'dark' : 'light'} // Ensure text color for warning/info badges
            >
              {record.status}
            </Badge>
          </Col>
          <Col md={6}>
            <strong>QC Outcome:</strong>{' '}
            <Badge
              bg={
                record.qc === 'Pass'
                  ? 'primary'
                  : record.qc === 'Fail'
                  ? 'danger'
                  : 'secondary' // N/A
              }
            >
              {record.qc}
            </Badge>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <strong>Rating:</strong> {record.rating}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <strong>Remarks:</strong>
            <p>{record.notes}</p>
          </Col>
        </Row>

        {record.media && (
          <Row className="mb-3">
            <Col>
              <strong>Media:</strong>
              <Image src={record.media} fluid rounded />
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkDetailModal;
