// EngineersPage.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaEllipsisV } from "react-icons/fa";

/**
 * Engineers management page (Tailwind + react-data-table-component)
 *
 * Features:
 * - Add / Edit engineer via Tailwind modal
 * - Search (live + Search button)
 * - Filters: Skill, Type, Status, Availability
 * - Responsive table
 * - Action dropdown (Edit / Delete)
 *
 * Drop-in component. Ensure Tailwind is included globally.
 */

// ---------- mock initial data ----------
const initialEngineers = [
  {
    id: "ENG-101",
    name: "Akash Jain",
    email: "akash@example.com",
    phone: "9876543210",
    address: "Udaipur, Rajasthan",
    skills: ["Mobile", "QC"],
    type: "Quality",
    status: "Active",
    availability: "Online",
  },
  {
    id: "ENG-102",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "8765432109",
    address: "Jaipur, Rajasthan",
    skills: ["Laptop", "Tablet"],
    type: "Repair",
    status: "Inactive",
    availability: "On Leave",
  },
  {
    id: "ENG-103",
    name: "Rakesh Kumar",
    email: "rakesh@example.com",
    phone: "7654321098",
    address: "Delhi, India",
    skills: ["Mobile", "Laptop"],
    type: "Repair",
    status: "Active",
    availability: "On Field",
  },
];

// ---------- small util to generate id ----------
const genId = (existing = []) => {
  const prefix = "ENG-";
  let max = 100;
  existing.forEach((e) => {
    const n = parseInt(e.id.replace(/\D/g, ""), 10);
    if (!isNaN(n) && n > max) max = n;
  });
  return `${prefix}${max + 1}`;
};

// ---------- New Delete Confirmation Modal Component ----------
const DeleteConfirmationModal = ({ show, onClose, onConfirm, engineerName }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* backdrop blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 z-[1001]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-red-600">Confirm Deletion</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 rounded p-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to permanently delete **{engineerName}**? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded text-sm text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


// ---------- Add/Edit Modal Component ----------
const AddEditEngineerModal = ({ show, onClose, onSave, initial }) => {
  const [form, setForm] = useState(
    initial || {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      skills: [],
      type: "Repair",
      status: "Active",
      availability: "Online",
    }
  );

  useEffect(() => {
    setForm(
      initial || {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        skills: [],
        type: "Repair",
        status: "Active",
        availability: "Online",
      }
    );
  }, [initial]);

  if (!show) return null;

  const toggleSkill = (s) => {
    setForm((f) => {
      const has = f.skills.includes(s);
      return { ...f, skills: has ? f.skills.filter((x) => x !== s) : [...f.skills, s] };
    });
  };

  const handleSave = () => {
    // basic validation
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter name and email.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* backdrop blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 z-[1001]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{initial ? "Edit Engineer" : "Add Engineer"}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 rounded p-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700">Name</label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Email</label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Phone</label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Address</label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              value={form.address}
              onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700">Engineer Type</label>
            <div className="mt-1 flex gap-2">
              {["Repair", "Quality"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((s) => ({ ...s, type: t }))}
                  className={`px-3 py-1 rounded text-sm border ${
                    form.type === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Status</label>
            <select
              className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              value={form.status}
              onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Availability</label>
            <select
              className="mt-1 block w-full border rounded px-3 py-2 text-sm"
              value={form.availability}
              onChange={(e) => setForm((s) => ({ ...s, availability: e.target.value }))}
            >
              <option>Online</option>
              <option>On Field</option>
              <option>On Leave</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700">Skills (toggle)</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {["Mobile", "Laptop", "Tablet", "QC"].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={`px-3 py-1 rounded text-sm border ${
                    form.skills.includes(s) ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded text-sm text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 rounded text-sm text-white hover:bg-blue-700"
          >
            {initial ? "Save Changes" : "Add Engineer"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- main page ----------
export default function EngineersPage() {
  const [engineers, setEngineers] = useState(initialEngineers);
  const [search, setSearch] = useState("");
  const [searchPressed, setSearchPressed] = useState(false); // visual toggle for Search button
  const [filterSkill, setFilterSkill] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // New state for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [engineerToDelete, setEngineerToDelete] = useState(null);

  // action dropdown control
  const [openActionId, setOpenActionId] = useState(null);

  // toast-like small inline notification
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // ---------- Data filtering ----------
  const filtered = useMemo(() => {
    return engineers.filter((eng) => {
      // source filters
      if (filterSkill && !eng.skills.includes(filterSkill)) return false;
      if (filterType && eng.type !== filterType) return false;
      if (filterStatus && eng.status !== filterStatus) return false;
      if (filterAvailability && eng.availability !== filterAvailability) return false;

      // search: check name/email/phone/address/id/skills
      if (!search) return true;
      const q = search.toLowerCase();
      const hay = `${eng.id} ${eng.name} ${eng.email} ${eng.phone} ${eng.address} ${eng.skills.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [engineers, search, filterSkill, filterType, filterStatus, filterAvailability]);

  // ---------- action helpers ----------
  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
    setOpenActionId(null);
  };

  const handleSave = (payload) => {
    // if editing, update
    if (payload.id) {
      setEngineers((prev) => prev.map((p) => (p.id === payload.id ? { ...p, ...payload } : p)));
      setToast("Engineer updated");
    } else {
      // new -> generate id and push
      const id = genId(engineers);
      setEngineers((prev) => [{ ...payload, id }, ...prev]);
      setToast("Engineer added");
    }
    setModalOpen(false);
  };

  // 1. Modified function to open delete modal
  const handleDeleteClick = (row) => {
    setEngineerToDelete(row);
    setDeleteModalOpen(true);
    setOpenActionId(null);
  };

  // 2. New function to perform deletion
  const handleDeleteConfirm = () => {
    if (engineerToDelete) {
      setEngineers((prev) => prev.filter((p) => p.id !== engineerToDelete.id));
      setToast(`Engineer ${engineerToDelete.id} deleted`);
    }
    setDeleteModalOpen(false);
    setEngineerToDelete(null);
  };

  // ---------- action dropdown component ----------
  function ActionDropdown({ row, setOpenActionId, openActionId, onEdit, onDeleteClick, setToast }) {
    const isOpen = openActionId === row.id;
    const ref = useRef(null);

    useEffect(() => {
      const handler = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setOpenActionId(null);
      };
      if (isOpen) document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, setOpenActionId]);

    return (
      <div 
        ref={ref} 
        className="relative" 
        // INCREASED Z-INDEX FOR BETTER VISIBILITY
        style={{ zIndex: isOpen ? 1000 : "auto" }} 
      >
        <button
          onClick={() => setOpenActionId(isOpen ? null : row.id)}
          className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1 rounded text-sm"
        >
          Actions <FaEllipsisV />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow-lg overflow-visible z-[1001]">
            <button
              onClick={() => onEdit(row)}
              className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteClick(row)} // Calls the modal trigger function
              className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm text-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // quick toggle active/inactive — example extra action
                setEngineers((prev) => prev.map((e) => (e.id === row.id ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" } : e)));
                setToast("Status toggled");
                setOpenActionId(null);
              }}
              className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm"
            >
              Toggle Status
            </button>
          </div>
        )}
      </div>
    );
  }


  // ---------- columns for DataTable ----------
  const columns = [
    { name: "ID", selector: (r) => r.id, width: "110px", sortable: true },
    { name: "Name", selector: (r) => r.name, sortable: true, grow: 1 },
    { name: "Email", selector: (r) => r.email, width: "220px" },
    { name: "Phone", selector: (r) => r.phone, width: "130px" },
    { name: "Address", selector: (r) => r.address, grow: 2 },
    {
      name: "Skills",
      selector: (r) => r.skills.join(", "),
      width: "200px",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.skills.slice(0, 3).map((s) => (
            <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 rounded">{s}</span>
          ))}
          {row.skills.length > 3 && <span className="text-xs px-2 py-0.5 bg-slate-100 rounded">+{row.skills.length - 3}</span>}
        </div>
      ),
    },
    { name: "Type", selector: (r) => r.type, width: "120px" },
    {
      name: "Status",
      selector: (r) => r.status,
      width: "120px",
      cell: (r) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            r.status === "Active" ? "bg-green-100 text-green-800" : r.status === "Inactive" ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {r.status}
        </span>
      ),
    },
    { name: "Availability", selector: (r) => r.availability, width: "130px" },
    {
      name: "Actions",
      button: true,
      allowOverflow: true,
      ignoreRowClick: true,
      width: "130px",
      cell: (row) => <ActionDropdown row={row} setOpenActionId={setOpenActionId} openActionId={openActionId} onEdit={openEdit} onDeleteClick={handleDeleteClick} setToast={setToast} />,
    },
  ];

  // ---------- table custom styles ----------
  const customStyles = {
    headCells: { style: { backgroundColor: "#F8FAFC", fontWeight: 600 } },
    rows: { style: { minHeight: "56px" } },
    cells: { style: { paddingTop: "12px", paddingBottom: "12px" } },
  };

  return (
    <div className="p-6">
      {/* heading + add */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">👨‍🔧 Engineers</h1>
          <p className="text-sm text-gray-600 mt-1">Manage engineers — add, edit, delete and assign.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Add Engineer</button>
        </div>
      </div>

      {/* filters & search */}
      <div className="bg-white border rounded p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-end">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              placeholder="Search name, email, phone, id..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 border rounded w-64 text-sm"
            />
          </div>
          <button
            onClick={() => setSearchPressed((s) => !s)}
            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-2 ml-auto">
          <select value={filterSkill} onChange={(e) => setFilterSkill(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Skills</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
            <option value="QC">QC</option>
          </select>

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Types</option>
            <option value="Repair">Repair</option>
            <option value="Quality">Quality</option>
          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>

          <select value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Availability</option>
            <option value="Online">Online</option>
            <option value="On Field">On Field</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* table */}
      <div className="bg-white rounded shadow">
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          highlightOnHover
          responsive
          dense
          customStyles={customStyles}
          noHeader
        />
      </div>

      {/* inline toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow z-[1002]">
          {toast}
        </div>
      )}

      {/* Add/Edit modal */}
      <AddEditEngineerModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(payload) => {
          // ensure id present for update (if editing initial has id)
          if (editing && editing.id) payload.id = editing.id;
          // if no id, new payload is created inside handleSave
          handleSave(payload);
        }}
        initial={editing}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        engineerName={engineerToDelete ? engineerToDelete.name : ''}
      />
    </div>
  );
}