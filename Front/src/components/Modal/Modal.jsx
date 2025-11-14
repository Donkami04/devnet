import React from "react";
import "./Modal.css"; // Asegúrate de crear este archivo CSS

export const Modal = ({ isOpen, onClose, title, content, buttons, errorMess, width, height }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ width, height }}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{content}</div>
          {errorMess && <div className="error-message-lice">{errorMess}</div>}
        <div className="modal-footer">
          {buttons.map((btn, index) => (
            <button key={index} className={`modal-button modal-button-${btn.type || ""}`} onClick={btn.onClick}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
