import { useEffect, useState } from "react";
import { getDataPrtgGroups } from "../../../utils/Api-candelaria/api";
import { Group_Prtg } from "./Gruoup_Prtg";
import { Navbar } from "../../Navbar/Navbar";

export function Ise() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataPrtgGroups();
        const dataCertificates = data.filter((e) =>
          e.group.toLowerCase().includes("ise")
        );
        setCertificates(dataCertificates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar title={"Servidores ISE y PRIME"} />
      <Group_Prtg data={certificates} />
    </div>
  );
}
