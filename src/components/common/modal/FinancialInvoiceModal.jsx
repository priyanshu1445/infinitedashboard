import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FinancialInvoiceModal = ({ show, onHide, invoice }) => {
  if (!invoice) return null;

  const handleDownload = () => {
    toast.success('📥 Invoice download started!');
    // Placeholder for actual logic (e.g. PDF generation or file link)
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>🧾 Invoice Details - {invoice.invoiceId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Customer:</strong> {invoice.customer}</p>
          <p><strong>Date:</strong> {invoice.date}</p>
          <p><strong>Status:</strong> {invoice.status}</p>
          <p><strong>Payment Mode:</strong> {invoice.paymentMode}</p>

          <Table bordered>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Service ({invoice.type})</td>
                <td>₹{invoice.amount}</td>
              </tr>
              <tr>
                <td>Tax (18%)</td>
                <td>₹{(invoice.amount * 0.18).toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>₹{(invoice.amount * 1.18).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Close</Button>
          <Button variant="primary" onClick={handleDownload}>
            Download Invoice
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default FinancialInvoiceModal;
