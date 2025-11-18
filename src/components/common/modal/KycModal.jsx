import React from 'react';
import { Modal, Button, Row, Col, Image, Card } from 'react-bootstrap';
import { Download, CreditCard, IdCard } from 'lucide-react';

const KycModal = ({ show, onClose, kycDocs }) => {
  if (!kycDocs) return null;

  const { aadharFront, aadharBack, panCard, aadharPdf, panPdf } = kycDocs;

  const openInNewTab = (url) => window.open(url, '_blank');

  const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <IdCard size={20} className="me-2 text-primary" />
          KYC Documents Viewer
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Aadhar Section */}
        <h6 className="mb-3 text-uppercase text-muted fw-semibold">
          <CreditCard size={16} className="me-2" /> Aadhar Card
        </h6>
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Card className="p-2 shadow-sm border-0 text-center">
              <Card.Title className="small fw-bold mb-2">Front</Card.Title>
              <Image
                src={aadharFront}
                thumbnail
                className="rounded shadow-sm"
                style={{ maxHeight: '180px', objectFit: 'contain', cursor: 'zoom-in' }}
                onClick={() => openInNewTab(aadharFront)}
                title="Click to Zoom"
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-2 shadow-sm border-0 text-center">
              <Card.Title className="small fw-bold mb-2">Back</Card.Title>
              <Image
                src={aadharBack}
                thumbnail
                className="rounded shadow-sm"
                style={{ maxHeight: '180px', objectFit: 'contain', cursor: 'zoom-in' }}
                onClick={() => openInNewTab(aadharBack)}
                title="Click to Zoom"
              />
            </Card>
          </Col>
        </Row>

        {/* PAN Card Section */}
        <h6 className="mb-3 text-uppercase text-muted fw-semibold">
          <IdCard size={16} className="me-2" /> PAN Card
        </h6>
        <Card className="p-3 shadow-sm border-0 text-center mb-4">
          <Image
            src={panCard}
            thumbnail
            className="rounded shadow-sm"
            style={{ maxHeight: '180px', objectFit: 'contain', cursor: 'zoom-in' }}
            onClick={() => openInNewTab(panCard)}
            title="Click to Zoom"
          />
        </Card>

        {/* Download PDFs */}
        <h6 className="mb-3 text-uppercase text-muted fw-semibold">
          <Download size={16} className="me-2" /> Download Documents
        </h6>
        <Row className="g-3 text-center">
          <Col md={6}>
            <Button
              variant="outline-primary"
              onClick={() => downloadFile(aadharPdf)}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <Download size={16} className="me-2" /> Download Aadhar PDF
            </Button>
          </Col>
          <Col md={6}>
            <Button
              variant="outline-primary"
              onClick={() => downloadFile(panPdf)}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <Download size={16} className="me-2" /> Download PAN PDF
            </Button>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KycModal;
