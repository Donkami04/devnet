import React, { useState } from "react";
import { CreateAp } from "../AdminForms/Ap/CreateAp";
import { DeleteAp } from "../AdminForms/Ap/DeleteAp";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditAp } from "../AdminForms/Ap/EditAp";

export function AdminAp() {
  const [activeComponent, setActiveComponent] = useState("CreateAp");

  const buttons = [
    { id: "CreateAp", className: "green-button", label: "Registrar" },
    { id: "EditAp", className: "blue-button", label: "Editar" },
    { id: "DeleteAp", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"AP"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditAp" && <EditAp />}
      {activeComponent === "CreateAp" && <CreateAp />}
      {activeComponent === "DeleteAp" && <DeleteAp />}
    </>
  );
}
