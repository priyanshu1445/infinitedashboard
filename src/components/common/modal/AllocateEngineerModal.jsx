import React, { useState } from "react";
import { X } from "lucide-react";

// Dummy engineers
const engineers = [
  { id: 1, name: "Ankit Rathore", expertise: "Laptop, Tablet", rating: 4, slots: 2 },
  { id: 2, name: "Sneha K", expertise: "Mobile", rating: 5, slots: 1 },
  { id: 3, name: "Rohit Mehta", expertise: "Laptop, Mobile", rating: 3, slots: 3 },
];

const AllocateEngineerModal = ({ show, onClose, appointment }) => {
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFinalConfirm = () => {
    setShowConfirm(false);
    onClose();

    // You can send API request here (allocate engineer)
    console.log("Engineer Allocated ===>", selectedEngineer);
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Allocate Engineer
            </h2>
            <button onClick={onClose}>
              <X className="text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* Appointment Info */}
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <p><b>Customer:</b> {appointment.name}</p>
            <p><b>Issue:</b> {appointment.issue}</p>
            <p><b>Date:</b> {appointment.date} - {appointment.time}</p>
          </div>

          {/* Engineer Dropdown */}
          <label className="block text-sm font-medium mb-2">Select Engineer</label>
          <select
            className="w-full p-2 border rounded-md mb-4"
            value={selectedEngineer}
            onChange={(e) => setSelectedEngineer(e.target.value)}
          >
            <option value="">-- Select Engineer --</option>
            {engineers.map((eng) => (
              <option key={eng.id} value={eng.name}>
                {eng.name} ({eng.expertise}) - ⭐{eng.rating}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                if (!selectedEngineer) return alert("Please select an engineer!");
                setShowConfirm(true);
              }}
            >
              Allocate
            </button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION POPUP */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">

            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Confirm Allocation
            </h3>

            <p className="text-gray-600 mb-3">
              Are you sure you want to allocate  
              <b> {selectedEngineer} </b>  
              to customer <b>{appointment.name}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleFinalConfirm}
              >
                Yes, Allocate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllocateEngineerModal;
