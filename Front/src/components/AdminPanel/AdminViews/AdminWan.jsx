import React, { useState } from "react";
import { CreateWan } from "../AdminForms/Wan/CreateWan";
import { DeleteWan } from "../AdminForms/Wan/DeleteWan";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditWan } from "../AdminForms/Wan/EditWan";

export function AdminWan() {
  const [activeComponent, setActiveComponent] = useState("CreateWan");

  const buttons = [
    { id: "CreateWan", className: "green-button", label: "Registrar" },
    { id: "EditWan", className: "blue-button", label: "Editar" },
    { id: "DeleteWan", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"WAN"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditWan" && <EditWan />}
      {activeComponent === "CreateWan" && <CreateWan />}
      {activeComponent === "DeleteWan" && <DeleteWan />}
    </>
  );
}
