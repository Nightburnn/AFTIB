import React from 'react';
import './Modal.css'; // Ensure you have some basic styling for the modal

const Modal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button className='blue' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
