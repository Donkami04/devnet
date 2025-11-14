import React from "react";
import "./adminbuttons.css";

export const ActionButtons = ({ buttons, activeComponent, onButtonClick }) => {
  return (
    <div className="buttons-container">
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => onButtonClick(button.id)}
          className={`admin-button ${button.className} ${
            activeComponent === button.id ? "active" : ""
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};
