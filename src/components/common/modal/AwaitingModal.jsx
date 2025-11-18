import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { UploadCloud, Send } from 'lucide-react';

const AwaitingModal = ({ show, onClose, order }) => {
  const [formData, setFormData] = useState({
    issueSummary: '',
    partRecommendations: '',
    images: [],
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = () => {
    // Simulate API call
    toast.success(`Diagnosis submitted for ${order?.device || 'the device'} and admin notified.`);
    setFormData({ issueSummary: '', partRecommendations: '', images: [] });
    onClose();
  };

  if (!order) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>🔧 Submit Diagnosis for {order.device}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Issue Summary */}
          <Form.Group className="mb-3">
            <Form.Label>📝 Issue Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe the device issue..."
              value={formData.issueSummary}
              onChange={(e) => setFormData({ ...formData, issueSummary: e.target.value })}
            />
          </Form.Group>

          {/* Image Upload */}
          <Form.Group className="mb-3">
            <Form.Label>
              📸 Upload Images <small className="text-muted">(Before Repair)</small>
            </Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
            {formData.images.length > 0 && (
              <Alert variant="info" className="mt-2 py-1">
                {formData.images.length} image(s) selected
              </Alert>
            )}
          </Form.Group>

          {/* Part Recommendations */}
          <Form.Group className="mb-3">
            <Form.Label>🔧 Part Recommendations</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Battery, Display Flex..."
              value={formData.partRecommendations}
              onChange={(e) => setFormData({ ...formData, partRecommendations: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          <Send size={16} className="me-2" />
          Submit & Notify Admin
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AwaitingModal;
