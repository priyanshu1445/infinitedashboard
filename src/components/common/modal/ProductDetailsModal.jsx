// src/components/ProductDetailsModal.jsx
import React from "react";

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">

        <h2 className="text-lg font-bold mb-3">Product Details</h2>

        <div className="space-y-2 text-sm">
          <p><b>Order ID:</b> {product.id}</p>
          <p><b>Name:</b> {product.name}</p>
          <p><b>Phone:</b> {product.phone}</p>
          <p><b>Email:</b> {product.email}</p>
          <p><b>Address:</b> {product.address}</p>
          <p><b>Issue:</b> {product.issue}</p>
          <p><b>Way of Reaching:</b> {product.wayOfReaching}</p>
          <p><b>Status:</b> {product.status}</p>
        </div>

        <button
          className="absolute top-2 right-2 text-gray-800 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsModal;
