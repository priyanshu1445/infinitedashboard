import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AutoAssignmentSettingsModal = ({ show, onHide, onSave }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Auto-Assignment Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Prioritize by</Form.Label>
            <Form.Select>
              <option>Least busy</option>
              <option>Best rating</option>
              <option>Fastest responder</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Engineer Availability Rule</Form.Label>
            <Form.Select>
              <option>Only Online</option>
              <option>Online & On Call</option>
              <option>Include Idle</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Appointments per Day</Form.Label>
            <Form.Control type="number" defaultValue={5} min={1} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Settings
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AutoAssignmentSettingsModal;
