import "./StatusColor.css";
import { useEffect, useState } from "react";

export function StatusColor() {
  return (
    <div className="status-color-container">
      <p>Color Verde: Ok</p>
      <p>Color Azul: Pausado</p>
      <p>Color Rojo: Down</p>
    </div>
  );
}
