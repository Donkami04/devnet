import React, { useState } from "react";
import { CreateSwitch } from "../AdminForms/Switches/CreateSwitch";
import { DeleteSwitch } from "../AdminForms/Switches/DeleteSwitch";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditSwitch } from "../AdminForms/Switches/EditSwitch";


export function AdminSwitches() {
  const [activeComponent, setActiveComponent] = useState("CreateSwitch");

  const buttons = [
    { id: "CreateSwitch", className: "green-button", label: "Registrar" },
    { id: "EditSwitch", className: "blue-button", label: "Editar" },
    { id: "DeleteSwitch", className: "red-button", label: "Eliminar" },
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
      {activeComponent === "EditSwitch" && <EditSwitch />}
      {activeComponent === "CreateSwitch" && <CreateSwitch />}
      {activeComponent === "DeleteSwitch" && <DeleteSwitch />}
    </>
  );
}
