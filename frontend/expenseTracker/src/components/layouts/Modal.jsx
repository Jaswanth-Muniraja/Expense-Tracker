import React from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, children, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 z-40 " 
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto py-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8">
          {/* Modal header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;