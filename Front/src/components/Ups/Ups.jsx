import { useState, useEffect } from "react";
import { getUps } from "../../utils/Api-candelaria/api";
import { Navbar } from "../Navbar/Navbar";
import { UpsCard } from "./UpsCard/UpsCard";
import { UpsDashboard } from "./UpsDashboard/UpsDashboard";
import { Spinner } from "../Spinner/Spinner";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import "./ups.css";

export function Ups() {
  const [allUps, setUps] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upsList = await getUps();
        setUps(upsList.data);
        setShowSpinner(false);
      } catch (error) {
        console.error("Error al obtener el listado de Ups:", error);
        return error;
      }
    };
    fetchData();
  }, []);

  if (showSpinner) {
    return (
      <div>
        <Navbar title={"Dashboard UPS"} />
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Navbar title={"Dashboard UPS"} />
      <DatetimeModules module={"ups"} name={"ups"} />
      <UpsDashboard allUps={allUps} />
      <div className="ups-cards-container">
        {allUps.map((ups) => (
          <UpsCard key={ups.id} ups={ups} />
        ))}
      </div>
    </>
  );
}
