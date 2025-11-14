import { useState } from "react";
import { CreateUser } from "../AdminForms/Users/CreateUser";
import { EditUser } from "../AdminForms/Users/EditUser";
// import { DeleteUser } from "../AdminForms/User/DeleteUser";
import { Navbar } from "../../Navbar/Navbar";
import { ActionButtons } from "../AdminButtons/AdminButtons";

export function AdminUsers() {
  const [activeComponent, setActiveComponent] = useState("EditUser");

  const buttons = [
    { id: "CreateUser", className: "green-button", label: "Registrar" },
    { id: "EditUser", className: "blue-button", label: "Ver usuarios" },
    // { id: "DeleteUser", className: "red-button", label: "Eliminar" },
  ];

  const renderComponent = (componentId) => {
    setActiveComponent(componentId);
  };

  return (
    <>
      <Navbar title={"Usuarios"} />
      <ActionButtons
        buttons={buttons}
        activeComponent={activeComponent}
        onButtonClick={renderComponent}
      />
      {activeComponent === "EditUser" && <EditUser />}
      {activeComponent === "CreateUser" && <CreateUser />}
      {/* {activeComponent === "DeleteUser" && <DeleteUser />} */}
    </>
  );
}
