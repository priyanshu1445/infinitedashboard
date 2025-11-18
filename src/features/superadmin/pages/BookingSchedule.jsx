import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

// Reusable ellipsis cell (title shows full text on hover)
const EllipsisCell = ({ text, width = "160px" }) => (
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

// Sample booking data (you can replace / load dynamically)
const sampleBookings = [
  {
    id: "BKG001",
    name: "Sneha R.",
    phone: "9876543210",
    email: "sneha@example.com",
    address: "Udaipur, Rajasthan",
    issue: "Screen not responding after update; touch is intermittent",
    wayOfReaching: "App", // App | Website | Call
    start: "2025-11-20T10:00:00",
    end: "2025-11-20T10:30:00",
    mediaFile: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "BKG002",
    name: "Amit P.",
    phone: "9123456780",
    email: "amit.p@example.com",
    address: "Jaipur, Rajasthan",
    issue: "Battery drains fast after latest patch",
    wayOfReaching: "Website",
    start: "2025-11-20T11:00:00",
    end: "2025-11-20T11:30:00",
    mediaFile: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "BKG003",
    name: "Riya K.",
    phone: "9012345678",
    email: "riya.k@example.com",
    address: "Jodhpur, Rajasthan",
    issue: "Overheating while charging; device slow",
    wayOfReaching: "Call",
    start: "2025-11-20T12:00:00",
    end: "2025-11-20T12:30:00",
    mediaFile: "",
  },
  {
    id: "BKG004",
    name: "Neha M.",
    phone: "9988776655",
    email: "neha@example.com",
    address: "Kota, Rajasthan",
    issue: "Camera blinking and focusing issues under low light",
    wayOfReaching: "App",
    start: "2025-11-20T14:00:00",
    end: "2025-11-20T14:30:00",
    mediaFile: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const BookingTable = ({ data = sampleBookings }) => {
  // States
  const [bookings, setBookings] = useState(data);
  const [search, setSearch] = useState("");
  const [filterWay, setFilterWay] = useState("All"); // All | App | Website | Call
  const [showSearch, setShowSearch] = useState(false); // toggled when Search button pressed (keeps UI same)
  const [mediaPreview, setMediaPreview] = useState({ show: false, url: "", id: null });

  // Filtering & search (useMemo for perf)
  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      // filter by way
      if (filterWay !== "All" && b.wayOfReaching !== filterWay) return false;

      // search - check id, name, email, phone, address, issue
      if (!search) return true;
      const q = search.toLowerCase();
      const hay = `${b.id} ${b.name} ${b.email} ${b.phone} ${b.address} ${b.issue}`.toLowerCase();
      return hay.includes(q);
    });
  }, [bookings, search, filterWay]);

  // Columns for react-data-table-component
  const columns = [
    {
      name: "S.No.",
      width: "80px",
      cell: (row, idx) => <div>{filtered.indexOf(row) + 1}</div>,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => <EllipsisCell text={`${row.name}`} width="150px" />,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      cell: (row) => <EllipsisCell text={row.phone} width="120px" />,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => <EllipsisCell text={row.email} width="180px" />,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      cell: (row) => <EllipsisCell text={row.address} width="200px" />,
    },
    {
      name: "Issue",
      selector: (row) => row.issue,
      cell: (row) => <EllipsisCell text={row.issue} width="220px" />,
    },
    {
      name: "Way to Reach",
      selector: (row) => row.wayOfReaching,
      width: "120px",
      cell: (row) => (
        <div>
          <span className={`badge ${row.wayOfReaching === "App" ? "bg-primary" : row.wayOfReaching === "Website" ? "bg-info text-dark" : "bg-secondary"}`}>
            {row.wayOfReaching}
          </span>
        </div>
      ),
    },
    {
      name: "Start",
      selector: (row) => row.start,
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div>{new Date(row.start).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}</div>
      ),
    },
    {
      name: "End",
      selector: (row) => row.end,
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div>{new Date(row.end).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}</div>
      ),
    },
    {
      name: "Media",
      width: "120px",
      cell: (row) =>
        row.mediaFile ? (
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => setMediaPreview({ show: true, url: row.mediaFile, id: row.id })}
          >
            View
          </Button>
        ) : (
          <small className="text-muted">No file</small>
        ),
    },
  ];

  // styles for table cells to avoid merge
  const customStyles = {
    headCells: {
      style: { fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" },
    },
    cells: {
      style: {
        fontSize: 13,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
  };

  return (
    <div className="p-3">
      <h5 className="fw-bold mb-3">📋 Booking Management</h5>

      {/* Filters + Search */}
      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
        {/* Filter buttons */}
        <ButtonGroup className="me-2">
          {["All", "App", "Website", "Call"].map((w) => (
            <Button
              key={w}
              variant={filterWay === w ? "primary" : "outline-primary"}
              onClick={() => setFilterWay(w)}
              size="sm"
            >
              {w}
            </Button>
          ))}
        </ButtonGroup>

        {/* Search input */}
        <div className="position-relative" style={{ width: 320 }}>
          <FaSearch style={{ position: "absolute", left: 10, top: 10, color: "#6b7280" }} />
          <input
            className="form-control ps-5"
            placeholder="Search by name, order id, email, phone, address, issue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowSearch((s) => !s); // small UX: toggles to reflect search pressed
            }}
          />
        </div>

        {/* Blue Search button */}
        <Button
          className="btn-primary"
          style={{ marginLeft: 8 }}
          onClick={() => setShowSearch((s) => !s)}
        >
          Search
        </Button>
      </div>

      {/* Table container (horizontal scroll if many columns) */}
      <div className="bg-white rounded shadow p-2 overflow-auto">
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          highlightOnHover
          dense
          customStyles={customStyles}
          responsive
          defaultSortFieldId={8}
        />
      </div>

      {/* Media Preview Modal */}
      <Modal
        show={mediaPreview.show}
        onHide={() => setMediaPreview({ show: false, url: "", id: null })}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Media Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mediaPreview.url ? (
            // try to render video, if not video the browser will handle it as download/link
            <video controls style={{ width: "100%" }}>
              <source src={mediaPreview.url} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="text-center text-muted">No media available</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMediaPreview({ show: false, url: "", id: null })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookingTable;
