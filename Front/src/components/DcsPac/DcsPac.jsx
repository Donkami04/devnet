import { Navbar } from "../Navbar/Navbar";
import { TableClientsPac } from "./TableClientsPac/TableClientsPac";

export function DcsPac() {
  const clientsTable = "dcs";

  return (
    <>
      <Navbar title={"DCS PAC - Clientes"} />
      <TableClientsPac />
    </>
  );
}
