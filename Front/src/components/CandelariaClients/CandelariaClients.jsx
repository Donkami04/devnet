import { Navbar } from "../Navbar/Navbar";
import { Dashboard } from "./Dashboard/Dashboard";
import { TableClients } from "./TableClients/TableClients";
import { Button } from "../Button/Button";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";

export function CandelariaClients() {
  const clientsTable = "dcs";

  return (
    <>
      <Navbar title={"DCS Candelaria - Clientes"} />
      <DatetimeModules module={"candelaria_clients"} name={"DCS CLIENTES"} />
      <Button interfaz={"switches"} buttonTag={"Switches"} />
      <Dashboard />
      <TableClients />
    </>
  );
}
