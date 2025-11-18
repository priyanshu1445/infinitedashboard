import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import { Button, Badge, Modal } from "react-bootstrap";

// Ellipsis for long text
const EllipsisCell = ({ text, width = "140px" }) => (
  <div
    style={{
      maxWidth: width,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    title={text}
  >
    {text}
  </div>
);

const Qc = () => {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [qcData, setQcData] = useState([
    {
      orderId: "ORD501",
      device: "Dell Vostro",
      name: "Rahul Jain",
      phone: "9876543210",
      email: "rahul@example.com",
      address: "Udaipur, Rajasthan",
      issue: "Screen flickering occasionally",
      repairedBy: "Eng. Nikhil",
      qcEngineer: "QC Ramesh",
      qcScore: "5/5",
      video: "https://example.com/qcvideo1.mp4",
      date: "2025-11-18",
      wayOfReaching: "Call",
      rackNo: "QC-01",
    },
    {
      orderId: "ORD502",
      device: "HP Pavilion",
      name: "Tina Sharma",
      phone: "9090909090",
      email: "tina@example.com",
      address: "Kota, Rajasthan",
      issue: "Battery backup issue",
      repairedBy: "Eng. Neha",
      qcEngineer: "QC Ravi",
      qcScore: "4/5",
      video: "https://example.com/qcvideo2.mp4",
      date: "2025-11-16",
      wayOfReaching: "Email",
      rackNo: "QC-02",
    },
  ]);

  // 🔍 Search filter
  const filtered = qcData.filter((item) =>
    `${item.orderId} ${item.name} ${item.email} ${item.device}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // -------------------------------
  // PASS BUTTON
  // -------------------------------
  const handlePass = (row) => {
    setQcData(qcData.filter((item) => item.orderId !== row.orderId));

    setPopupMessage(`✔ ${row.orderId} moved to Parcel successfully!`);
    setShowPopup(true);
  };

  // -------------------------------
  // FAIL BUTTON
  // -------------------------------
  const handleFail = (row) => {
    setQcData(qcData.filter((item) => item.orderId !== row.orderId));

    setPopupMessage(`❌ ${row.orderId} moved to Repairing!`);
    setShowPopup(true);
  };

  // -------------------------------
  // TABLE COLUMNS
  // -------------------------------
  const columns = [
    { name: "Order ID", cell: (row) => <EllipsisCell text={row.orderId} width="100px" /> },
    { name: "Name", cell: (row) => <EllipsisCell text={row.name} width="150px" /> },
    { name: "Phone", cell: (row) => <EllipsisCell text={row.phone} width="130px" /> },
    { name: "Email", cell: (row) => <EllipsisCell text={row.email} width="170px" /> },
    { name: "Address", cell: (row) => <EllipsisCell text={row.address} width="180px" /> },
    { name: "Issue", cell: (row) => <EllipsisCell text={row.issue} width="200px" /> },
    { name: "Device", cell: (row) => <EllipsisCell text={row.device} width="160px" /> },
    { name: "Repaired By", cell: (row) => <EllipsisCell text={row.repairedBy} width="130px" /> },
    { name: "QC Engineer", cell: (row) => <EllipsisCell text={row.qcEngineer} width="130px" /> },

    {
      name: "QC Score",
      width: "110px",
      cell: (row) => (
        <Badge bg={row.qcScore === "5/5" ? "success" : "warning"}>
          {row.qcScore}
        </Badge>
      ),
    },

    {
      name: "Video",
      width: "100px",
      cell: (row) => (
        <a href={row.video} target="_blank" className="text-indigo-600">
          View
        </a>
      ),
    },

    { name: "Date", cell: (row) => <EllipsisCell text={row.date} width="120px" /> },
    { name: "Way", cell: (row) => <EllipsisCell text={row.wayOfReaching} width="120px" /> },
    { name: "Rack No", cell: (row) => <EllipsisCell text={row.rackNo} width="80px" /> },

    // -------------------------------
    // ACTION COLUMN → PASS / FAIL
    // -------------------------------
    {
      name: "Action",
      width: "200px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button size="sm" variant="success" onClick={() => handlePass(row)}>
            Pass
          </Button>
          <Button size="sm" variant="danger" onClick={() => handleFail(row)}>
            Fail
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const customStyles = {
    headCells: { style: { fontWeight: "600", whiteSpace: "nowrap" } },
    cells: { style: { whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" } },
  };

  return (
    <div className="p-3">
      <h5 className="fw-bold mb-3">📦 Products in QC</h5>

      {/* Search Bar */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="position-relative" style={{ width: "260px" }}>
          <FaSearch className="position-absolute" style={{ top: "10px", left: "10px" }} />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search by name, order, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="btn btn-primary px-4">Search</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow p-2">
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          highlightOnHover
          dense
          customStyles={customStyles}
          fixedHeader
          fixedHeaderScrollHeight="500px"
        />
      </div>

      {/* Success / Fail Popup Modal */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Action Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fw-semibold">{popupMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPopup(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Qc;
