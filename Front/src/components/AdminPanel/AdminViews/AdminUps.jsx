import React, { useState } from "react";
import { CreateUps } from "../AdminForms/Ups/CreateUps";
import { DeleteUps } from "../AdminForms/Ups/DeleteUps";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditUps } from "../AdminForms/Ups/EditUps";
import axios from "axios";

export function AdminUps() {
  const [activeComponent, setActiveComponent] = useState("CreateUps");

  const buttons = [
    { id: "CreateUps", className: "green-button", label: "Registrar" },
    { id: "EditUps", className: "blue-button", label: "Editar" },
    { id: "DeleteUps", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"UPS"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditUps" && <EditUps />}
      {activeComponent === "CreateUps" && <CreateUps />}
      {activeComponent === "DeleteUps" && <DeleteUps />}
    </>
  );
}
