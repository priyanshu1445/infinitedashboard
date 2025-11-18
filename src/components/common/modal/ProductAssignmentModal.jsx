import React from "react";
import { Modal, Button } from "react-bootstrap";
import { X } from "lucide-react";

const ProductDetailsModal = ({ show, onHide, data }) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header>
        <Modal.Title>Order Details</Modal.Title>
        <button className="btn" onClick={onHide}>
          <X />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className="row gy-2">

          <div className="col-md-6">
            <strong>Order ID:</strong> {data.orderId}
          </div>

          <div className="col-md-6">
            <strong>Name:</strong> {data.name}
          </div>

          <div className="col-md-6">
            <strong>Phone:</strong> {data.phone}
          </div>

          <div className="col-md-6">
            <strong>Email:</strong> {data.email}
          </div>

          <div className="col-md-12">
            <strong>Address:</strong> {data.address}
          </div>

          <div className="col-md-6">
            <strong>Way of Reaching:</strong> {data.wayOfReaching}
          </div>

          <div className="col-md-6">
            <strong>Issue:</strong> {data.issue}
          </div>

          <div className="col-md-6">
            <strong>Date:</strong> {data.date}
          </div>

          <div className="col-md-6">
            <strong>Status:</strong> {data.status}
          </div>

          <div className="col-md-6">
            <strong>Repairing Engineer:</strong> {data.repairingEngineer}
          </div>

          <div className="col-md-6">
            <strong>Quality Engineer:</strong> {data.qualityEngineer || "N/A"}
          </div>

          <hr />

          <div className="col-md-12">
            <strong>Video:</strong>
            <br />
            {data.video ? (
              <video
                src={data.video}
                controls
                className="w-100 rounded"
                style={{ maxHeight: "260px" }}
              />
            ) : (
              <p>No video uploaded</p>
            )}
          </div>

        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
