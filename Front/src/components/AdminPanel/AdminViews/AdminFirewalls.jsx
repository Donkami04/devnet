import React, { useState } from "react";
import { CreateFirewall } from "../AdminForms/Firewalls/CreateFirewall";
import { DeleteFirewall } from "../AdminForms/Firewalls/DeleteFirewall";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditFirewall } from "../AdminForms/Firewalls/EditFirewall";


export function AdminFirewalls() {
  const [activeComponent, setActiveComponent] = useState("CreateFirewall");

  const buttons = [
    { id: "CreateFirewall", className: "green-button", label: "Registrar" },
    { id: "EditFirewall", className: "blue-button", label: "Editar" },
    { id: "DeleteFirewall", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"FW - Canales Internet"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditFirewall" && <EditFirewall />}
      {activeComponent === "CreateFirewall" && <CreateFirewall />}
      {activeComponent === "DeleteFirewall" && <DeleteFirewall />}
    </>
  );
}
