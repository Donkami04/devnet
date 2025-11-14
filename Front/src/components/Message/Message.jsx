import { useState, useEffect } from "react";
import "./Message.css";

export function Message({ message, color, show }) {
  let showOrNot = "hidden-message";
  if (show === true) {
    showOrNot = "show-message";
  }

  return (
    <div className={`important-message-container ${color} ${showOrNot}`}>
      <p>{message}</p>
    </div>
  );
}
