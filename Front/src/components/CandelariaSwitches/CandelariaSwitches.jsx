import { Navbar } from "../Navbar/Navbar";
import { Dashboard } from "../CandelariaClients/Dashboard/Dashboard";
import { TableSwitches } from "../CandelariaSwitches/TableSwitches/TableSwitches";
import { Button } from "../Button/Button";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";

export function Switches() {
  const switchesTable = "sw";

  return (
    <>
      <Navbar title={"DCS Candelaria - Switches"} />
      <DatetimeModules module={"candelaria_switches"} name={"dcs switches"} />
      <Button interfaz={"clients"} buttonTag={"Clientes"} />
      <Dashboard />
      <TableSwitches />
    </>
  );
}
