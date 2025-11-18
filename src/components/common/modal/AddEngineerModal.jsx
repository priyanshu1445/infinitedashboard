import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import {
  User,
  Phone,
  Mail,
  Settings,
  Clock,
  FileImage,
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const skillOptions = ['Mobile', 'Laptop', 'Tablet', 'QC'];

const AddEngineerModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'Engineer',
    workingHours: '',
    skills: [],
    photo: null,
    isActive: true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill all required fields.');
      return;
    }

    // Simulate save logic
    console.log('Engineer Saved:', formData);
    toast.success('Engineer saved successfully!');
    onHide(); // Close modal
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>➕ Add Engineer</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pt-3">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><User size={16} className="me-1" />Full Name</Form.Label>
              <Form.Control
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter full name"
              />
            </Col>
            <Col md={6}>
              <Form.Label><Phone size={16} className="me-1" />Phone</Form.Label>
              <Form.Control
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="9876543210"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><Mail size={16} className="me-1" />Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.com"
              />
            </Col>
            <Col md={6}>
              <Form.Label><Settings size={16} className="me-1" />Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
              >
                <option>Engineer</option>
                <option>QC Engineer</option>
                <option>Pickup Agent</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>🧰 Skill Tags</Form.Label>
              {skillOptions.map((skill, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={skill}
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
              ))}
            </Col>
            <Col md={6}>
              <Form.Label><Clock size={16} className="me-1" />Working Hours</Form.Label>
              <Form.Control
                placeholder="e.g. 10:00 AM - 6:00 PM"
                value={formData.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label><FileImage size={16} className="me-1" />Photo (Optional)</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleChange('photo', e.target.files[0])}
              />
            </Col>
            <Col md={6} className="d-flex align-items-end justify-content-start">
              <Form.Check
                type="switch"
                id="engineer-status"
                label="Active"
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Engineer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEngineerModal;
