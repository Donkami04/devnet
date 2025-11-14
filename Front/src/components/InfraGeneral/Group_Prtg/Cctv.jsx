import { useEffect, useState } from "react";
import { getDataPrtgGroups } from "../../../utils/Api-candelaria/api";
import { Group_Prtg } from "./Gruoup_Prtg";
import { Navbar } from "../../Navbar/Navbar";

export function Cctv() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataPrtgGroups();

        const dataCertificates = data.filter(
          (e) => e.group.toUpperCase() === "CCTV"
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
      <Navbar title={"Sistema CCTV"} />
      <Group_Prtg data={certificates} />
    </div>
  );
}
