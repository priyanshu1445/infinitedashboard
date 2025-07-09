import React, { useState, useMemo } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component'; // Import DataTable
import ExportDataModal from '../../../components/common/modal/ExportDataModal';
import { Download, Clock, FileText, PlusCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Initial mock history data (will be managed by state)
const initialMockHistory = [
  {
    id: 1,
    date: '2025-06-28',
    type: 'Repair Logs',
    filters: 'Last 30 days, Completed',
    format: 'CSV',
    status: 'Ready',
    fileUrl: '#mock-repair-logs.csv',
  },
  {
    id: 2,
    date: '2025-06-25',
    type: 'Financial Transactions',
    filters: 'Monthly Summary, Paid',
    format: 'PDF',
    status: 'Ready',
    fileUrl: '#mock-financial-summary.pdf',
  },
  {
    id: 3,
    date: '2025-07-01',
    type: 'Customer Data',
    filters: 'All Customers, Active',
    format: 'XLSX',
    status: 'Processing', // Example of an ongoing process
    fileUrl: null,
  },
];

const ExportData = () => {
  const [showModal, setShowModal] = useState(false);
  const [exportHistory, setExportHistory] = useState(initialMockHistory);

  /**
   * Handles the submission of a new export request from the modal.
   * @param {object} exportDetails - Object containing type, filters, format.
   */
  const handleNewExportRequest = ({ type, filters: filtersDesc, format }) => {
    setShowModal(false); // Close the modal
    const newId = exportHistory.length > 0 ? Math.max(...exportHistory.map(h => h.id)) + 1 : 1;
    const newExport = {
      id: newId,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
      type: type,
      filters: filtersDesc,
      format: format,
      status: 'Processing',
      fileUrl: null,
    };

    setExportHistory((prev) => [...prev, newExport]);
    toast.info(`Export request for ${type} submitted. It is being processed.`);

    // Simulate processing time and then update status
    setTimeout(() => {
      setExportHistory((prev) =>
        prev.map((item) =>
          item.id === newId
            ? { ...item, status: 'Ready', fileUrl: `/api/export/${newId}-${type.toLowerCase().replace(/\s/g, '-')}.${format.toLowerCase()}` } // Mock URL
            : item
        )
      );
      toast.success(`Download for ${type} in ${format} is Ready!`);
    }, 4000); // Simulate 4 seconds processing
  };

  /**
   * Handles the download button click.
   * @param {string} fileUrl - The URL of the file to download.
   * @param {string} fileName - The name of the file type.
   */
  const handleDownload = (fileUrl, fileName) => {
    if (fileUrl) {
      // In a real application, you'd trigger a file download here,
      // e.g., by creating an invisible link and programmatically clicking it.
      window.open(fileUrl, '_blank'); // Open in new tab for mock download
      toast.success(`Downloading ${fileName} file...`);
    } else {
      toast.error('File not available for download yet.');
    }
  };

  // Define columns for react-data-table-component
  const columns = useMemo(() => [
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Type',
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: 'Filters Applied',
      selector: (row) => row.filters,
      sortable: false, // Filters might be complex strings, not ideal for sorting directly
    },
    {
      name: 'Format',
      selector: (row) => row.format,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <Badge
          bg={
            row.status === 'Ready'
              ? 'success'
              : row.status === 'Processing'
              ? 'primary'
              : row.status === 'Failed'
              ? 'danger'
              : 'secondary'
          }
          className="py-2 px-3 " // Added padding and rounded corners
        >
          {row.status}
        </Badge>
      ),
      width: '150px',
    },
    {
      name: 'Download',
      cell: (row) => (
        <Button
          size="sm"
          variant={row.status === 'Ready' ? 'success' : 'outline-secondary'}
          onClick={() => handleDownload(row.fileUrl, row.type)}
          disabled={row.status !== 'Ready'}
          className="d-flex align-items-center "
        >
          <Download size={16} className="me-1" /> Download
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '150px',
    },
  ], []); // Empty dependency array means columns are created once

  return (
    <div className="p-4 bg-light min-vh-100">
      <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
        <FileText size={22} /> Export Data
      </h4>

      <div className="text-end mb-4">
        <Button variant="primary" onClick={() => setShowModal(true)} className=" px-4 py-2">
          <PlusCircle className="me-2" size={18} />
          New Export Request
        </Button>
      </div>

      <Card className="shadow-sm border-0 rounded-lg">
        <Card.Header className="bg-white py-3 border-bottom-0">
          <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
            <Clock size={18} />
            Export Request History
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <DataTable
            columns={columns}
            data={exportHistory}
            pagination
            striped
            highlightOnHover
            responsive
            noDataComponent="No export requests found."
            className="rounded-lg"
          />
        </Card.Body>
      </Card>

      <ExportDataModal show={showModal} onHide={() => setShowModal(false)} onSubmitExport={handleNewExportRequest} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ExportData;
