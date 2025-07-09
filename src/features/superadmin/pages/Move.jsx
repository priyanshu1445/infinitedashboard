
// File: Move.jsx
import React, { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoveDeviceModal from '../../../components/common/modal/MoveDeviceModal';

const Move = () => {
  const [showModal, setShowModal] = useState(false);

  const mockDevice = {
    deviceId: 'DVC-11203',
    currentRack: 'A',
    currentSlot: 'A1',
  };

  return (
    <Container className="p-4">
      <h5 className="fw-bold mb-4">🔁 Move/Update Items</h5>

      <Card className="p-4 shadow-sm">
        <p>
          Move individual devices from one rack/slot to another, or initiate bulk move via CSV upload.
        </p>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Move Device Now
        </Button>
      </Card>

      <MoveDeviceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        deviceData={mockDevice}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </Container>
  );
};

export default Move;
