import React, { useState } from 'react';
import { Modal, Row, Col, Badge, Image, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import {
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Tag,
  Camera,
  Pencil,
  Send,
} from 'lucide-react';

const InspectionReportModal = ({ show, onHide, data }) => {
  const [action, setAction] = useState(null);

  if (!data) return null;

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'passed':
        return (
          <Badge bg="success">
            <CheckCircle size={14} className="me-1" />
            Passed
          </Badge>
        );
      case 'rejected':
        return (
          <Badge bg="danger">
            <XCircle size={14} className="me-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge bg="warning" text="dark">
            <AlertCircle size={14} className="me-1" />
            Pending
          </Badge>
        );
    }
  };

  const handleSelect = (key) => {
    setAction(key);
    // yaha apne functions call kar sakte ho jaise API call ya toast
    alert(`Action selected: ${key} for ${data.device}`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FileText size={20} className="me-2 text-primary" />
          Inspection Report
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-3">
          <Col md={6}>
            <h6 className="fw-bold">📱 Device Info</h6>
            <p><strong>Model:</strong> {data.device}</p>
            <p><strong>IMEI:</strong> {data.imei || 'N/A'}</p>
            <p><strong>Inspected By:</strong> {data.inspector || '—'}</p>
          </Col>
          <Col md={6}>
            <h6 className="fw-bold">📊 Inspection Summary</h6>
            <p>
              <strong>Status:</strong> {statusBadge(data.status)}
            </p>
            <p><strong>Quote:</strong> ₹{data.quote || 'N/A'}</p>
            <p><strong>Date:</strong> {data.date || '—'}</p>

            {/* Dropdown for actions */}
            <Dropdown onSelect={handleSelect} className="mt-3">
              <Dropdown.Toggle variant="outline-primary" id="dropdown-actions" size="sm">
                {action ? `Action: ${action}` : 'Select Action'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Approve">
                  <CheckCircle size={14} className="me-2 text-success" />
                  Approve
                </Dropdown.Item>
                <Dropdown.Item eventKey="Reject">
                  <XCircle size={14} className="me-2 text-danger" />
                  Reject
                </Dropdown.Item>
                <Dropdown.Item eventKey="Modify Quote">
                  <Pencil size={14} className="me-2 text-warning" />
                  Modify Quote
                </Dropdown.Item>
                <Dropdown.Item eventKey="Send Quote">
                  <Send size={14} className="me-2 text-info" />
                  Send Quote
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h6 className="fw-bold">
              <Tag size={16} className="me-1 text-muted" />
              Issues Found
            </h6>
            <p>{data.issues || 'No issues reported'}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h6 className="fw-bold">
              <Camera size={16} className="me-1 text-muted" />
              Uploaded Images
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {(data.images?.length > 0 ? data.images : []).map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt={`Image ${idx + 1}`}
                  thumbnail
                  width={100}
                  height={100}
                />
              ))}
              {(!data.images || data.images.length === 0) && <p>No images uploaded.</p>}
            </div>
          </Col>
        </Row>

        {data.remarks && (
          <Row className="mb-2">
            <Col>
              <h6 className="fw-bold">📝 Inspector Remarks</h6>
              <p>{data.remarks}</p>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default InspectionReportModal;
