import React from "react";
import { IoCloseSharp } from "react-icons/io5";

function Modal({ title, description, onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-start pt-28">
      <div className="bg-white w-full max-w-md md:max-w-2xl mx-4 rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold uppercase">{title}</h2>
            <button onClick={onClose}>
              <IoCloseSharp className="text-gray-600 w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto max-h-80">
            <p className="text-sm md:text-base break-words whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal;
