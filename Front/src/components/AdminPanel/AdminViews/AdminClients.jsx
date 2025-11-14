import React, { useState } from "react";
import { CreateClient } from "../AdminForms/Clients/CreateClient";
import { DeleteClient } from "../AdminForms/Clients/DeleteClient";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditClient } from "../AdminForms/Clients/EditClient";
import axios from "axios";

export function AdminClients() {
  const [activeComponent, setActiveComponent] = useState("CreateClient");

  const buttons = [
    { id: "CreateClient", className: "green-button", label: "Registrar" },
    { id: "EditClient", className: "blue-button", label: "Editar" },
    { id: "DeleteClient", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"DCS Candelaria"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditClient" && <EditClient />}
      {activeComponent === "CreateClient" && <CreateClient />}
      {activeComponent === "DeleteClient" && <DeleteClient />}
    </>
  );
}
