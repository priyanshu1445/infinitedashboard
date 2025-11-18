import React from 'react';
import { Modal, Button, Badge, Table } from 'react-bootstrap';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Smartphone,
  Wallet2,
  Gift,
  Ticket,
  FileText
} from 'lucide-react';

const VerifiedCustomerModal = ({ show, onClose, customer }) => {
  if (!customer) return null;

  const { name, email, phone, city, kycStatus, devices, walletLogs, rewardPoints, tickets } = customer;

  const kycColor = {
    Approved: 'success',
    Rejected: 'danger',
    Pending: 'warning',
  }[kycStatus] || 'secondary';

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <User size={18} className="me-2 text-primary" />
          Customer Profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Personal Info */}
        <h6 className="d-flex align-items-center mt-2 mb-3">
          <FileText size={16} className="me-2 text-secondary" /> Personal Info
        </h6>
        <p><strong><User size={14} className="me-2" /> Name:</strong> {name}</p>
        <p><strong><Mail size={14} className="me-2" /> Email:</strong> {email}</p>
        <p><strong><Phone size={14} className="me-2" /> Phone:</strong> {phone}</p>
        <p><strong><MapPin size={14} className="me-2" /> City:</strong> {city}</p>

        {/* KYC Status */}
        <h6 className="d-flex align-items-center mt-4 mb-2">
          <ShieldCheck size={16} className="me-2 text-secondary" /> KYC Status
        </h6>
        <Badge bg={kycColor}>{kycStatus}</Badge>

        {/* Device History */}
        <h6 className="d-flex align-items-center mt-4 mb-2">
          <Smartphone size={16} className="me-2 text-secondary" /> Device History
        </h6>
        <Table size="sm" striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Device</th>
              <th>Issue</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {devices?.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.device}</td>
                <td>{d.issue}</td>
                <td>{d.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Wallet Transaction Logs */}
        <h6 className="d-flex align-items-center mt-4 mb-2">
          <Wallet2 size={16} className="me-2 text-secondary" /> Wallet Transaction Logs
        </h6>
        <Table size="sm" striped bordered responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {walletLogs?.map((log, i) => (
              <tr key={i}>
                <td>{log.date}</td>
                <td>{log.type}</td>
                <td>₹{log.amount}</td>
                <td>{log.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Reward Points */}
        <h6 className="d-flex align-items-center mt-4 mb-2">
          <Gift size={16} className="me-2 text-secondary" /> Reward Points
        </h6>
        <p>Total Points: <strong>{rewardPoints || 0}</strong></p>

        {/* Tickets Raised */}
        <h6 className="d-flex align-items-center mt-4 mb-2">
          <Ticket size={16} className="me-2 text-secondary" /> Tickets Raised
        </h6>
        <Table size="sm" striped bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Raised On</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((t, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{t.issue}</td>
                <td>
                  <Badge bg={
                    t.status === 'Open' ? 'warning' :
                    t.status === 'Resolved' ? 'success' :
                    'secondary'
                  }>
                    {t.status}
                  </Badge>
                </td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifiedCustomerModal;
