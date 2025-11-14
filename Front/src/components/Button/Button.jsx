import React from "react";
import { Link } from "react-router-dom";
import "./button.css";

export function Button({interfaz, buttonTag}) {

  return (
    <Link to={`/monitoreo/candelaria/${interfaz}`} className="button-interfaz">
      {buttonTag}
    </Link>
  );

}
