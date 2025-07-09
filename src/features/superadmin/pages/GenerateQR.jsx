import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Tabs,
  Tab,
  Table,
} from 'react-bootstrap';
import { Download, Printer, Copy, FilePlus } from 'lucide-react';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockEngineers = ['Akash J.', 'Neha R.', 'Raj S.', 'Pooja M.', 'Rakesh N.', 'Anjali R.', 'Vikas T.'];
const mockDeviceTypes = ['Laptop', 'Mobile', 'Tablet', 'Smartwatch', 'Desktop'];

const GenerateQR = () => {
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('single');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [formData, setFormData] = useState({
    deviceId: '', // ✅ Added
    deviceName: '',
    brandModel: '',
    serial: '',
    type: '',
    rackSlot: '',
    engineer: '',
    category: 'Repair',
    initialStatus: 'Awaiting Diagnosis',
  });

  const [bulkFile, setBulkFile] = useState(null);
  const [bulkPreviewData, setBulkPreviewData] = useState([]);

  const handleGenerateQR = () => {
    if (
      !formData.deviceName ||
      !formData.brandModel ||
      !formData.serial ||
      !formData.type ||
      !formData.engineer
    ) {
      toast.error('Please fill in all required fields marked with (*).');
      setGeneratedQR(null);
      return;
    }

    const deviceId = formData.deviceId.trim() !== ''
      ? formData.deviceId.trim()
      : `DVC-${Math.floor(10000 + Math.random() * 90000)}`;

    const qrData = {
      ...formData,
      deviceId,
      timestamp: new Date().toISOString(),
    };

    setGeneratedQR({ deviceId, qrData });
    toast.success('QR Code generated successfully!');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCopyClick = (text) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast.success('Device ID copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy Device ID. Please try again.');
    }
  };

  const handlePrintQR = () => {
    toast.info('Initiating print for QR Code...');
  };

  const handleDownloadQR = () => {
    toast.info('Downloading QR Code...');
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${generatedQR.deviceId}_QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success('QR Code image downloaded!');
    } else {
      toast.error('QR Code canvas not found for download.');
    }
  };

  const handleBulkFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBulkFile(file);
      toast.info(`File selected: ${file.name}. (CSV parsing not implemented in this demo)`);
      setBulkPreviewData([
        { 'Device Name': 'Sample Device 1', 'Serial No.': 'SN123', 'Model': 'Model X', 'Type': 'Mobile', 'Assigned Engineer': 'Akash J.', Valid: true },
        { 'Device Name': 'Sample Device 2', 'Serial No.': '', 'Model': 'Model Y', 'Type': 'Laptop', 'Assigned Engineer': 'Neha R.', Valid: false, Error: 'Serial No. missing' },
      ]);
    } else {
      setBulkFile(null);
      setBulkPreviewData([]);
    }
  };

  const handleBulkGenerateAndDownload = () => {
    if (!bulkFile) {
      toast.error('Please upload a CSV file first.');
      return;
    }
    toast.success('Generating and downloading bulk QRs (PDF Zip)... (Functionality not fully implemented)');
  };

  return (
    <div className="p-4">
      <h4 className="fw-bold mb-4">📎 Generate New QR</h4>

      <Row className="mb-3 align-items-center">
        <Col md={3} className="d-flex align-items-center gap-2">
          <Form.Check
            type="switch"
            id="bulk-qr-switch"
            label="Bulk QR Generation"
            checked={bulkMode}
            onChange={() => {
              setBulkMode(!bulkMode);
              setSelectedTab(bulkMode ? 'single' : 'bulk');
              setGeneratedQR(null);
              setBulkFile(null);
              setBulkPreviewData([]);
            }}
          />
        </Col>
        <Col md={3}>
          <Form.Label className="mb-0">Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option>Repair</option>
            <option>Buyback</option>
            <option>Scrap</option>
            <option>Refurb</option>
          </Form.Select>
        </Col>
      </Row>

      <Tabs activeKey={selectedTab} onSelect={(k) => setSelectedTab(k)} className="mb-4">
        <Tab eventKey="single" title="Single QR Generation">
          <Card className="p-4 shadow-sm">
            <Form>
              <Row className="mb-3 g-3">
                <Col md={6}>
                  <Form.Label>Device Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="deviceName"
                    value={formData.deviceName}
                    onChange={handleInputChange}
                    placeholder="Enter device name"
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Brand / Model <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="brandModel"
                    value={formData.brandModel}
                    onChange={handleInputChange}
                    placeholder="Brand or Model"
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3 g-3">
                <Col md={6}>
                  <Form.Label>Serial No. / IMEI <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="serial"
                    value={formData.serial}
                    onChange={handleInputChange}
                    placeholder="Enter serial number"
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Type / Category <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    {mockDeviceTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mb-3 g-3">
                <Col md={6}>
                  <Form.Label>Rack / Slot (Optional)</Form.Label>
                  <Form.Control
                    name="rackSlot"
                    value={formData.rackSlot}
                    onChange={handleInputChange}
                    placeholder="A1 / B2"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Assigned Engineer <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="engineer"
                    value={formData.engineer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Engineer</option>
                    {mockEngineers.map((engineer, index) => (
                      <option key={index} value={engineer}>{engineer}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <Row className="mb-3 g-3">
                <Col md={6}>
                  <Form.Label>Initial Status</Form.Label>
                  <Form.Select
                    name="initialStatus"
                    value={formData.initialStatus}
                    onChange={handleInputChange}
                  >
                    <option>Awaiting Diagnosis</option>
                    <option>In Repair</option>
                    <option>Pending QC</option>
                    <option>Ready for Dispatch</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Upload Thumbnail (Optional)</Form.Label>
                  <Form.Control type="file" />
                </Col>
              </Row>

              <Row className="mb-3 g-3">
                <Col md={6}>
                  <Form.Label>Device ID (Optional)</Form.Label>
                  <Form.Control
                    name="deviceId"
                    value={formData.deviceId}
                    onChange={handleInputChange}
                    placeholder="Auto-generated if left blank"
                  />
                </Col>
              </Row>

              <Button variant="primary" onClick={handleGenerateQR}>
                Generate QR
              </Button>
            </Form>
          </Card>

          {generatedQR && (
            <Card className="p-4 mt-4 shadow-sm">
              <h5 className="fw-bold mb-3">🖨️ Generated QR Card</h5>
              <Row>
                <Col md={4} className="text-center">
                  <QRCode value={JSON.stringify(generatedQR.qrData)} style={{ height: 128, width: 128 }} />
                  <div className="mt-3 d-flex justify-content-center gap-2">
                    <Button size="sm" variant="outline-secondary" onClick={handlePrintQR}>
                      <Printer size={14} /> Print QR
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={handleDownloadQR}>
                      <Download size={14} /> Download QR
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleCopyClick(generatedQR.deviceId)}>
                      <Copy size={14} /> Copy ID
                    </Button>
                  </div>
                </Col>
                <Col md={8}>
                  <p><strong>Device ID:</strong> {generatedQR.deviceId}</p>
                  <p><strong>Category:</strong> {formData.category}</p>
                  <p><strong>Device Name:</strong> {formData.deviceName}</p>
                  <p><strong>Brand / Model:</strong> {formData.brandModel}</p>
                  <p><strong>Serial No. / IMEI:</strong> {formData.serial}</p>
                  <p><strong>Type / Category:</strong> {formData.type}</p>
                  <p><strong>Rack / Slot:</strong> {formData.rackSlot || 'N/A'}</p>
                  <p><strong>Assigned Engineer:</strong> {formData.engineer}</p>
                  <p><strong>Initial Status:</strong> {formData.initialStatus}</p>
                  <p><strong>Generated On:</strong> {new Date(generatedQR.qrData.timestamp).toLocaleString()}</p>
                </Col>
              </Row>
            </Card>
          )}
        </Tab>

        <Tab eventKey="bulk" title="Bulk QR Generation" disabled={!bulkMode}>
          <Card className="p-4 shadow-sm">
            <Form.Group controlId="bulkUploadFile" className="mb-3">
              <Form.Label>📂 Upload CSV Template</Form.Label>
              <Form.Control type="file" accept=".csv" onChange={handleBulkFileChange} />
              <Form.Text className="text-muted">
                Expected columns: Device Name, Brand/Model, Serial No./IMEI, Type, Assigned Engineer, Rack/Slot (optional), Initial Status (optional).
              </Form.Text>
            </Form.Group>

            {bulkPreviewData.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Preview Entries</h6>
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      {Object.keys(bulkPreviewData[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bulkPreviewData.map((entry, index) => (
                      <tr key={index} className={entry.Valid ? 'table-success' : 'table-danger'}>
                        <td>{index + 1}</td>
                        {Object.entries(entry).map(([key, value]) => (
                          <td key={key}>
                            {key === 'Valid' ? (value ? '✅ Valid' : '❌ Invalid') : value}
                            {key === 'Valid' && !value && entry.Error && (
                              <small className="d-block text-danger">{entry.Error}</small>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            <Button variant="success" onClick={handleBulkGenerateAndDownload}>
              <FilePlus size={16} className="me-2" /> Generate & Download QRs (PDF Zip)
            </Button>
          </Card>
        </Tab>
      </Tabs>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default GenerateQR;
