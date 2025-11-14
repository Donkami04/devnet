import { Navbar } from "../Navbar/Navbar";
import { TableClientsOjos } from "./TableClientsOjos/TableClientsOjos";

export function DcsOjos() {
  const clientsTable = "dcs";

  return (
    <>
      <Navbar title={"DCS OJOS - Clientes"} />
      <TableClientsOjos />
    </>
  );
}
