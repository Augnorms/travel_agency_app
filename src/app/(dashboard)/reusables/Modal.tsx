"use client";

import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    // trigger fade-out animation
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // match duration of transition
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen && visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      {/* Glass-like Modal Container */}
      <div
        className={`bg-white/20 rounded-xl shadow-lg w-full max-w-lg mx-4 relative transform transition-all duration-300 ${
          isOpen && visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center border-b bg-white px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              className="text-gray-800 hover:text-gray-900 cursor-pointer"
              onClick={handleClose}
            >
              <img src="/svg/close.svg" alt="close" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="bg-white p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
