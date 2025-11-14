import React, { useState } from "react";
import { CreateMesh } from "../AdminForms/Mesh/CreateMesh";
import { DeleteMesh } from "../AdminForms/Mesh/DeleteMesh";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";
import { EditMesh } from "../AdminForms/Mesh/EditMesh";

export function AdminMesh() {
  const [activeComponent, setActiveComponent] = useState("CreateMesh");

  const buttons = [
    { id: "CreateMesh", className: "green-button", label: "Registrar" },
    { id: "EditMesh", className: "blue-button", label: "Editar" },
    { id: "DeleteMesh", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"MESH"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditMesh" && <EditMesh />}
      {activeComponent === "CreateMesh" && <CreateMesh />}
      {activeComponent === "DeleteMesh" && <DeleteMesh />}
    </>
  );
}
