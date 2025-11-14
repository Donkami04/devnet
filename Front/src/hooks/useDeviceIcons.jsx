import React from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdBatteryCharging } from "react-icons/io";
import { SiUps } from "react-icons/si";

// Definir las condiciones de los iconos en el hook
const iconConditions = [
  // Condiciones para el icono de la cámara
  {
    condition: (device) =>
      device.cctv_enabled !== "N/A" &&
      device.type === "Camara" &&
      device.cctv_enabled === "1" &&
      device.cctv_valid === "1",
    icon: (
      <BsFillCameraVideoFill
        title={"CCTV ENABLED: True & CCTV VALID: True"}
        fontSize="1.3rem"
        color="green"
      />
    ),
  },
  {
    condition: (device) =>
      device.cctv_enabled !== "N/A" &&
      device.type === "Camara" &&
      device.cctv_enabled === "1" &&
      device.cctv_valid === "0",
    icon: (
      <BsFillCameraVideoFill
        title={"CCTV ENABLED: True & CCTV VALID: False"}
        fontSize="1.3rem"
        color="orange"
      />
    ),
  },
  {
    condition: (device) =>
      device.cctv_enabled !== "N/A" &&
      device.type === "Camara" &&
      device.cctv_enabled === "Not Found",
    icon: (
      <BsFillCameraVideoFill
        title={"CCTV Not Found"}
        fontSize="1.3rem"
        color="gray"
      />
    ),
  },
  {
    condition: (device) =>
      device.cctv_enabled !== "N/A" &&
      device.type === "Camara" &&
      device.cctv_enabled === "0",
    icon: (
      <BsFillCameraVideoFill
        title={"CCTV ENABLED: False"}
        fontSize="1.3rem"
        color="red"
      />
    ),
  },
  // Condiciones para el icono de la batería
  {
    condition: (device) => device.ups_status === 2,
    icon: (
      <IoMdBatteryCharging
        title={"UPS Status: On Line"}
        fontSize="1.3rem"
        color="green"
      />
    ),
  },
  {
    condition: (device) => device.ups_status === 3,
    icon: (
      <IoMdBatteryCharging
        title={"UPS Status: On Battery"}
        fontSize="1.3rem"
        color="red"
      />
    ),
  },
  {
    condition: (device) =>
      device.ups_status === 0 || device.ups_status === null,
    icon: null,
  },
  {
    condition: (device) =>
      device.ups_status !== 2 &&
      device.ups_status !== 3 &&
      device.ups_status !== 7 &&
      device.ups_status !== 0 &&
      device.ups_status !== null,
    icon: (
      <IoMdBatteryCharging
        title={`UPS Status: Otro`}
        fontSize="1.3rem"
        color="gray"
      />
    ),
  },
  {
    condition: (device) => device.ups_status === 7,
    icon: (
      <IoMdBatteryCharging
        title={"UPS Status: Off"}
        fontSize="1.3rem"
        color="red"
      />
    ),
  },
];

export const useDeviceIcons = (device) => {
  const icons = iconConditions
    .filter((iconCondition) => iconCondition.condition(device))
    .map((iconCondition, index) => (
      <span key={index}>{iconCondition.icon}</span>
    ));

  return icons;
};
