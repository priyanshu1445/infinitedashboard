import React from 'react';
import { Modal, Button, Row, Col, Badge, Image } from 'react-bootstrap';

const AssignmentDetailsModal = ({ show, onHide, data }) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>📝 Assignment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}><strong>Device:</strong> {data.device}</Col>
          <Col md={6}><strong>Customer:</strong> {data.customer}</Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}><strong>Type:</strong> {data.type}</Col>
          <Col md={6}><strong>Status:</strong> <Badge bg="success">{data.status}</Badge></Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}><strong>Start Time:</strong> {data.startTime}</Col>
          <Col md={6}><strong>End Time:</strong> {data.endTime}</Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}><strong>Task Performed:</strong><br />{data.task}</Col>
        </Row>
        {data.media && (
          <Row className="mb-3">
            <Col><strong>Media Uploaded:</strong><br /><Image src={data.media} thumbnail width={150} /></Col>
          </Row>
        )}
        <Row className="mb-3">
          <Col md={12}><strong>Remarks:</strong><br />{data.remarks}</Col>
        </Row>
        {data.rackMovement && (
          <Row className="mb-2">
            <Col><strong>Rack Movement:</strong> {data.rackMovement}</Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignmentDetailsModal;
