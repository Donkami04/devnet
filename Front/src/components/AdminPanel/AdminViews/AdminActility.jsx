import React, { useState } from "react";
import { CreateDevice } from "../AdminForms/Devices/CreateDevice";
import { DeleteDevice } from "../AdminForms/Devices/DeleteDevice";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditDevice } from "../AdminForms/Devices/EditDevice";


export function AdminDevices() {
  const [activeComponent, setActiveComponent] = useState("CreateDevices");

  const buttons = [
    { id: "CreateDevices", className: "green-button", label: "Registrar" },
    { id: "EditDevices", className: "blue-button", label: "Editar" },
    { id: "DeleteDevices", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"Dispositivos"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditDevices" && <EditDevice />}
      {activeComponent === "CreateDevices" && <CreateDevice />}
      {activeComponent === "DeleteDevices" && <DeleteDevice />}
    </>
  );
}
