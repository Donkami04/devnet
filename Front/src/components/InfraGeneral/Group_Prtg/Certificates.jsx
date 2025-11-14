import { useEffect, useState } from "react";
import { getDataPrtgGroups } from "../../../utils/Api-candelaria/api";
import { Group_Prtg } from "./Gruoup_Prtg";
import { InfGenDatetime } from "../../DatetimeModules/InfGenDatetime";
import { Navbar } from "../../Navbar/Navbar";

export function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataPrtgGroups();

        const dataCertificates = data.data.filter(
          (e) => e.group.toLowerCase() === "certificados candelaria"
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
      <Navbar title={"Certificados Candelaria"} />
      <InfGenDatetime />
      <Group_Prtg data={certificates} />
    </div>
  );
}
