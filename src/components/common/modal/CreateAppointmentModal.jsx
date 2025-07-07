
// CreateAppointmentModal.jsx
import React from 'react';
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CreateAppointmentModal = ({ show, onHide, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Appointment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                {...register('customerName', { required: true })}
                placeholder="Enter customer name"
              />
              {errors.customerName && (
                <small className="text-danger">Required</small>
              )}
            </Col>

            <Col md={6}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                {...register('phone', { required: true })}
                placeholder="Enter phone number"
              />
              {errors.phone && <small className="text-danger">Required</small>}
            </Col>

            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email')}
                placeholder="Enter email (optional)"
              />
            </Col>

            <Col md={6}>
              <Form.Label>Device Model</Form.Label>
              <Form.Control
                {...register('deviceModel', { required: true })}
                placeholder="e.g. iPhone 11"
              />
              {errors.deviceModel && (
                <small className="text-danger">Required</small>
              )}
            </Col>

            <Col md={12}>
              <Form.Label>Issue Description</Form.Label>
              <Form.Control
                {...register('issue')}
                placeholder="Describe the issue"
              />
            </Col>

            <Col md={6}>
              <Form.Label>Assign Engineer</Form.Label>
              <Form.Select {...register('engineer')}>
                <option>Auto Assign</option>
                <option>Eng. Alok</option>
                <option>Eng. Sneha</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label>Appointment Mode</Form.Label>
              <Form.Select {...register('mode', { required: true })}>
                <option value="">Select Mode</option>
                <option>Telephonic</option>
                <option>Video</option>
                <option>Walk-in</option>
              </Form.Select>
              {errors.mode && <small className="text-danger">Required</small>}
            </Col>

            <Col md={6}>
              <Form.Label>Duration</Form.Label>
              <Form.Select {...register('duration', { required: true })}>
                <option value="">Select Duration</option>
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </Form.Select>
              {errors.duration && <small className="text-danger">Required</small>}
            </Col>

            <Col md={6}>
              <Form.Label>Preferred Time</Form.Label>
              <Form.Control
                type="datetime-local"
                {...register('preferredTime', { required: true })}
              />
              {errors.preferredTime && (
                <small className="text-danger">Required</small>
              )}
            </Col>

            <Col md={6}>
              <Form.Label>Payment Method</Form.Label>
              <Form.Select {...register('paymentMode')}>
                <option>Wallet</option>
                <option>Razorpay</option>
                <option>Manual Confirm</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="text-end mt-4">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Appointment
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAppointmentModal;
