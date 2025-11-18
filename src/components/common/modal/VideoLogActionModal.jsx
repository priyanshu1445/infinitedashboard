import React from "react";
import { X } from "lucide-react";

const MediaModal = ({ file, onClose }) => {
  const isImage = file.match(/\.(jpg|jpeg|png|gif)$/i);
  const isVideo = file.match(/\.(mp4|webm|ogg)$/i);
  const isPDF = file.match(/\.pdf$/i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h3 className="text-lg font-semibold mb-4">Media Preview</h3>

        {/* Media Content */}
        <div className="flex justify-center items-center">
          {isImage && <img src={file} alt="Media" className="max-h-96 rounded" />}

          {isVideo && (
            <video controls className="max-h-96 rounded w-full">
              <source src={file} type="video/mp4" />
            </video>
          )}

          {isPDF && (
            <iframe
              src={file}
              title="PDF Viewer"
              className="w-full h-96 border rounded"
            />
          )}

          {!isImage && !isVideo && !isPDF && (
            <p className="text-gray-600">Unsupported file format</p>
          )}
        </div>

        {/* Download Button */}
        <div className="text-right mt-4">
          <a
            href={file}
            download
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
