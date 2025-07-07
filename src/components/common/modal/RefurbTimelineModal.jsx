import React from 'react';
import { Modal, Badge } from 'react-bootstrap';
import {
  Inbox,
  Wrench,
  Video,
  Search,
  CheckCircle,
  XCircle,
} from 'lucide-react';
// import './RefurbTimelineModal.css'; // for optional styling

const steps = [
  {
    icon: <Inbox size={18} className="text-primary" />,
    title: 'Intake',
    date: '26 Jun',
    by: 'Rakesh',
    status: 'done',
  },
  {
    icon: <Wrench size={18} className="text-info" />,
    title: 'Refurb Start',
    date: '27 Jun',
    by: 'Nisha',
    status: 'done',
  },
  {
    icon: <Video size={18} className="text-success" />,
    title: 'Media Uploaded',
    date: '28 Jun',
    by: '',
    status: 'done',
  },
  {
    icon: <Search size={18} className="text-warning" />,
    title: 'QC Test',
    date: '',
    by: '',
    status: 'pending',
  },
  {
    icon: <CheckCircle size={18} className="text-muted" />,
    title: 'Passed',
    date: '',
    by: '',
    status: 'upcoming',
  },
];

const RefurbTimelineModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">🛠️ Repair Timeline</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline">
          {steps.map((step, idx) => (
            <div className="timeline-item d-flex" key={idx}>
              <div className="timeline-icon me-3">
                <div className="icon-circle bg-light border rounded-circle d-flex align-items-center justify-content-center">
                  {step.icon}
                </div>
                {idx !== steps.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
              <div>
                <h6 className="fw-semibold mb-1">{step.title}</h6>
                {step.date && (
                  <Badge bg="light" text="dark" className="me-2">
                    {step.date}
                  </Badge>
                )}
                {step.by && (
                  <span className="text-muted small">By: {step.by}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RefurbTimelineModal;
