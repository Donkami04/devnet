import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { SectionVpn } from "./SectionVpn/SectionVpn";
import { useVpnCounter } from "../../hooks/useVpnCounter";
import { Spinner } from "../Spinner/Spinner";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getVpn } from "../../utils/Api-candelaria/api";
import "./vpn.css";

export function Vpn() {
  const [vpnData, setVpnData] = useState({});
  const [showSpinner, setShowSpinner] = useState(true);

  const fetchData = async () => {
    try {
      const response = await getVpn();
      setVpnData(response.data);
      setShowSpinner(false);
    } catch (error) {
      console.error("Error fetching VPN data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (showSpinner) {
    return (
      <div>
        <Navbar title={"Monitoreo VPN"} />
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Navbar title={"Monitoreo VPN"} />
      <DatetimeModules module={"vpn_candelaria"} name={"VPN CANDELARIA"} />
      <main className="sections-container">
        <SectionVpn
          vpnNum={1}
          usersNumber={vpnData.numUsersFw1}
          users={vpnData.fw1}
        />
        <SectionVpn
          vpnNum={2}
          usersNumber={vpnData.numUsersFw2}
          users={vpnData.fw2}
        />
        <SectionVpn
          vpnNum={3}
          usersNumber={vpnData.numUsersFw3}
          users={vpnData.fw3}
        />
      </main>
    </div>
  );
}
