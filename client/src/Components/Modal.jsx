import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>    
        <button className="modal-close" onClick={onRequestClose}>
          &times;           
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
