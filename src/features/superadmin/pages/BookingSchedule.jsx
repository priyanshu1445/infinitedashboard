import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import {
  Calendar,
  PlusCircle,
} from 'lucide-react';
import CreateAppointmentModal from '../../../components/common/modal/CreateAppointmentModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingSchedule = () => {
  const [showModal, setShowModal] = useState(false);
  const [appointmentType, setAppointmentType] = useState('All');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');

  const handleAppointmentSubmit = (data) => {
    console.log('Appointment Submitted:', data);
    toast.success('Appointment Created Successfully!');
    setShowModal(false);
  };

  return (
    <div className="p-4">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <Calendar size={20} className="me-2 text-primary" />
        Booking Schedule
      </h5>

      {/* Filters */}
      <Row className="g-3 mb-4">
        <Col md={2}>
          <Form.Select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            <option>All Types</option>
            <option>Telephonic</option>
            <option>Video</option>
            <option>Walk-in</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Col>

        <Col md={3}>
          <Form.Control
            placeholder="Search Customer Name / Phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col md={2}>
          <Form.Select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option>Payment Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select
            value={appointmentStatus}
            onChange={(e) => setAppointmentStatus(e.target.value)}
          >
            <option>Status</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </Form.Select>
        </Col>

        <Col md="auto">
          <Button variant="outline-primary" onClick={() => setShowModal(true)}>
            <PlusCircle size={16} className="me-2" />
            Create Appointment
          </Button>
        </Col>
      </Row>

      {/* Calendar View Placeholder */}
      <div
        className="calendar-view border rounded bg-light p-4"
        style={{ height: '60vh', minHeight: '400px' }}
      >
        <p className="text-muted">\ud83d\uddd3\ufe0f Weekly Calendar View will appear here</p>
      </div>

      <CreateAppointmentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleAppointmentSubmit}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default BookingSchedule;
