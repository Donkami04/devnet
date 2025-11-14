import { Navbar } from "../Navbar/Navbar";
import { TableClientsDesaladora } from "./TableClientsDesaladora/TableClientsDesaladora";
import { DashboardDesaladora } from "../DcsDesaladora/DashboardDesaladora/DashboardDesaladora";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";

export function DcsDesaladora() {
  const clientsTable = "dcs";

  return (
    <>
      <Navbar title={"DCS Desaladora"} />
      <DatetimeModules module={"desaladora_clients"} name={"DCS DESALADORA"} />
      <DashboardDesaladora />
      <TableClientsDesaladora />
    </>
  );
}
