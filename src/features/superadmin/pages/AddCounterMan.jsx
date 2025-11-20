// AddCounterMan.jsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaSearch, FaEllipsisV } from "react-icons/fa";

/**
 * Counter Man management page (Tailwind + react-data-table-component)
 * - Add / Edit counter man via Tailwind modal
 * - Search (live + Search button)
 * - Filters: Shift, Status, Counter Number
 * - Responsive table
 * - Action dropdown (Edit / Delete / Toggle Status)
 *
 * Drop-in component. Ensure Tailwind is included globally.
 */

// ---------- mock initial data ----------
const initialCounterMen = [
  {
    id: "CM-101",
    name: "Ravi Mehta",
    phone: "9812345678",
    address: "Udaipur, Rajasthan",
    counterNumber: "C-1",
    shift: "Morning",
    status: "Active",
    salary: "12000",
  },
  {
    id: "CM-102",
    name: "Sunita Verma",
    phone: "9876501234",
    address: "Jaipur, Rajasthan",
    counterNumber: "C-2",
    shift: "Evening",
    status: "Inactive",
    salary: "11000",
  },
  {
    id: "CM-103",
    name: "Amit Singh",
    phone: "9765432109",
    address: "Delhi, India",
    counterNumber: "C-3",
    shift: "Night",
    status: "Active",
    salary: "12500",
  },
];

// ---------- small util to generate id ----------
const genId = (existing = []) => {
  const prefix = "CM-";
  let max = 100;
  existing.forEach((e) => {
    const n = parseInt(e.id.replace(/\D/g, ""), 10);
    if (!isNaN(n) && n > max) max = n;
  });
  return `${prefix}${max + 1}`;
};

// ---------- Delete Confirmation Modal ----------
const DeleteConfirmationModal = ({ show, onClose, onConfirm, name }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 z-[1001]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-red-600">Confirm Deletion</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 rounded p-1" aria-label="Close modal">✕</button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to permanently delete <strong>{name}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded text-sm text-gray-700 hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded text-sm text-white hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
};

// ---------- Add / Edit Modal ----------
const AddEditCounterManModal = ({ show, onClose, onSave, initial }) => {
  const init = initial || {
    id: "",
    name: "",
    phone: "",
    address: "",
    counterNumber: "",
    shift: "Morning",
    status: "Active",
    salary: "",
  };

  const [form, setForm] = useState(init);

  useEffect(() => setForm(initial || init), [initial]);

  if (!show) return null;

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Please enter name and phone.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 z-[1001]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{initial ? "Edit Counter Man" : "Add Counter Man"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 rounded p-1" aria-label="Close modal">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700">Name</label>
            <input className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Phone</label>
            <input className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Counter Number</label>
            <input className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.counterNumber} onChange={(e) => setForm((s) => ({ ...s, counterNumber: e.target.value }))} placeholder="e.g. C-1" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Salary</label>
            <input className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.salary} onChange={(e) => setForm((s) => ({ ...s, salary: e.target.value }))} />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Shift</label>
            <select className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.shift} onChange={(e) => setForm((s) => ({ ...s, shift: e.target.value }))}>
              <option>Morning</option>
              <option>Evening</option>
              <option>Night</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700">Status</label>
            <select className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700">Address</label>
            <input className="mt-1 block w-full border rounded px-3 py-2 text-sm" value={form.address} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded text-sm text-gray-700 hover:bg-gray-200">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded text-sm text-white hover:bg-blue-700">{initial ? "Save Changes" : "Add Counter Man"}</button>
        </div>
      </div>
    </div>
  );
};

// ---------- main page ----------
export default function AddCounterMan() {
  const [items, setItems] = useState(initialCounterMen);
  const [search, setSearch] = useState("");
  const [searchPressed, setSearchPressed] = useState(false);

  const [filterShift, setFilterShift] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCounter, setFilterCounter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const [openActionId, setOpenActionId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (filterShift && it.shift !== filterShift) return false;
      if (filterStatus && it.status !== filterStatus) return false;
      if (filterCounter && it.counterNumber !== filterCounter) return false;

      if (!search) return true;
      const q = search.toLowerCase();
      const hay = `${it.id} ${it.name} ${it.phone} ${it.address} ${it.counterNumber} ${it.shift}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, search, filterShift, filterStatus, filterCounter]);

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
    if (payload.id) {
      setItems((prev) => prev.map((p) => (p.id === payload.id ? { ...p, ...payload } : p)));
      setToast("Counter Man updated");
    } else {
      const id = genId(items);
      setItems((prev) => [{ ...payload, id }, ...prev]);
      setToast("Counter Man added");
    }
    setModalOpen(false);
  };

  const handleDeleteClick = (row) => {
    setToDelete(row);
    setDeleteModalOpen(true);
    setOpenActionId(null);
  };

  const handleDeleteConfirm = () => {
    if (toDelete) {
      setItems((prev) => prev.filter((p) => p.id !== toDelete.id));
      setToast(`Counter Man ${toDelete.id} deleted`);
    }
    setDeleteModalOpen(false);
    setToDelete(null);
  };

  // Action dropdown component (same pattern as EngineersPage)
  function ActionDropdown({ row, setOpenActionId, openActionId }) {
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
      <div ref={ref} className="relative" style={{ zIndex: isOpen ? 1000 : "auto" }}>
        <button onClick={() => setOpenActionId(isOpen ? null : row.id)} className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1 rounded text-sm">
          Actions <FaEllipsisV />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-white border rounded shadow-lg overflow-visible z-[1001]">
            <button onClick={() => openEdit(row)} className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">Edit</button>
            <button onClick={() => handleDeleteClick(row)} className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm text-red-600">Delete</button>
            <button onClick={() => {
              setItems((prev) => prev.map((e) => (e.id === row.id ? { ...e, status: e.status === "Active" ? "Inactive" : "Active" } : e)));
              setToast("Status toggled");
              setOpenActionId(null);
            }} className="w-full text-left px-3 py-2 hover:bg-slate-50 text-sm">Toggle Status</button>
          </div>
        )}
      </div>
    );
  }

  const columns = [
    { name: "ID", selector: (r) => r.id, width: "110px", sortable: true },
    { name: "Name", selector: (r) => r.name, sortable: true, grow: 1 },
    { name: "Phone", selector: (r) => r.phone, width: "140px" },
    { name: "Counter", selector: (r) => r.counterNumber, width: "120px" },
    { name: "Shift", selector: (r) => r.shift, width: "120px" },
    {
      name: "Status", selector: (r) => r.status, width: "120px",
      cell: (r) => (
        <span className={`text-xs px-2 py-1 rounded-full ${r.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
          {r.status}
        </span>
      )
    },
    { name: "Salary", selector: (r) => r.salary, width: "120px" },
    { name: "Address", selector: (r) => r.address, grow: 2 },
    {
      name: "Actions",
      button: true,
      allowOverflow: true,
      ignoreRowClick: true,
      width: "140px",
      cell: (row) => <ActionDropdown row={row} setOpenActionId={setOpenActionId} openActionId={openActionId} />
    }
  ];

  const customStyles = {
    headCells: { style: { backgroundColor: "#F8FAFC", fontWeight: 600 } },
    rows: { style: { minHeight: "56px" } },
    cells: { style: { paddingTop: "12px", paddingBottom: "12px" } },
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">🧾 Counter Men</h1>
          <p className="text-sm text-gray-600 mt-1">Manage counter staff — add, edit, delete and assign shifts.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded">Add Counter Man</button>
        </div>
      </div>

      <div className="bg-white border rounded p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-end">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2 text-gray-400" />
            <input placeholder="Search name, phone, id, counter..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-3 py-2 border rounded w-64 text-sm" />
          </div>
          <button onClick={() => setSearchPressed((s) => !s)} className="px-4 py-2 bg-indigo-600 text-white rounded text-sm">Search</button>
        </div>

        <div className="flex flex-wrap gap-2 ml-auto">
          <select value={filterCounter} onChange={(e) => setFilterCounter(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Counters</option>
            {/* generate options heuristically from items */}
            {Array.from(new Set(items.map(i => i.counterNumber))).map(c => c).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={filterShift} onChange={(e) => setFilterShift(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded text-sm">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <DataTable columns={columns} data={filtered} pagination highlightOnHover responsive dense customStyles={customStyles} noHeader />
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow z-[1002]">
          {toast}
        </div>
      )}

      <AddEditCounterManModal show={modalOpen} onClose={() => setModalOpen(false)} onSave={(payload) => {
        if (editing && editing.id) payload.id = editing.id;
        handleSave(payload);
      }} initial={editing} />

      <DeleteConfirmationModal show={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} name={toDelete ? toDelete.name : ""} />
    </div>
  );
}
