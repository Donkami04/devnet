import { useState, useEffect } from "react";
import { DatetimeModules } from "./DatetimeModules";
import { getDatetimeModules } from "../../utils/Api-candelaria/api";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCaretSquareUp } from "react-icons/fa";
import "./DatetimeModules.css";

export function InfGenDatetime() {
  const [showInfo, setShowInfo] = useState(false);
  const [data, setData] = useState([]);
  const [colorIcon, setColorIcon] = useState("green");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDatetimeModules();
        const errorSystems = response.filter(
          (item) =>
            (item.system_name.includes("inf_gen") && item.status === "ERROR") ||
            (item.system_name.includes("devnet") && item.status === "ERROR") ||
            (item.system_name.includes("groups_prtg") &&
              item.status === "ERROR")
        );

        const length = errorSystems.length;
        if (length > 0 && length < 2) {
          setColorIcon("orange");
        } else if (length >= 3) {
          setColorIcon("red");
        }

        const dataFiltered = response.filter(
          (item) =>
            item.system_name.includes("inf_gen") ||
            item.system_name.includes("devnet") ||
            item.system_name.includes("groups_prtg")
        );

        setData(dataFiltered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div>
      <div className="icon-datetime-infgen-container" onClick={toggleInfo}>
        {showInfo ? (
          <div
            style={{ justifyContent: "flex-start" }}
            className="info-infgen-module"
          >
            <FaCaretSquareUp size="1.7rem" color="purple" />{" "}
            <span style={{ color: "purple" }}>Ocultar</span>
          </div>
        ) : (
          <div className="info-infgen-module">
            <BsInfoCircleFill size="1.7rem" color={colorIcon} />
            <span style={{ color: colorIcon }}>
              Información de los procesos
            </span>
          </div>
        )}
      </div>
      {showInfo && (
        <div className="datetimes_inf_gen_container">
          <DatetimeModules module={"inf_gen_interfaces"} name={"interfaces"} />
          <DatetimeModules
            module={"inf_gen_sysHealth"}
            name={"system health"}
          />
          <DatetimeModules module={"inf_gen_neighbors"} name={"neighbors"} />
          <DatetimeModules
            module={"inf_gen_routeDefault"}
            name={"route default"}
          />
          <DatetimeModules module={"groups_prtg"} name={"grupos prtg"} />
          <DatetimeModules module={"devnet"} name={"devnet"} />
        </div>
      )}
    </div>
  );
}
