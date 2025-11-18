import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import QRCode from 'react-qr-code';
import { Download, Printer } from 'lucide-react';

const ViewQRModal = ({ show, onHide, qrData }) => {
  // Download QR as PNG
  const handleDownloadQR = () => {
    const canvas = document.querySelector('#qr-download canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${qrData.deviceId}_QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // Print QR
  const handlePrintQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print QR</title></head>
          <body style="text-align:center; padding-top:40px;">
            <div id="print-qr">
              <p><strong>Device ID:</strong> ${qrData.deviceId}</p>
              <div style="margin-top: 20px;">
                <img src="${document.querySelector('#qr-download canvas').toDataURL()}" />
              </div>
            </div>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>📸 QR Snapshot</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">
        {qrData ? (
          <>
            <div id="qr-download" className="d-flex justify-content-center">
              <QRCode
                value={JSON.stringify(qrData)}
                style={{ height: 180, width: 180 }}
              />
            </div>
            <p className="mt-3">
              <strong>Device ID:</strong> {qrData.deviceId}
            </p>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button variant="outline-secondary" size="sm" onClick={handlePrintQR}>
                <Printer size={16} className="me-1" /> Print
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={handleDownloadQR}>
                <Download size={16} className="me-1" /> Download
              </Button>
            </div>
          </>
        ) : (
          <p>No QR data available.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewQRModal;
