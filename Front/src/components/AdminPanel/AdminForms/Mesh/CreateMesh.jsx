import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css"

export const CreateMesh = () => {
  const [ip, setIp] = useState("");
  const [device, setDevice] = useState("");
  const [eqmt, setEqmt] = useState("");
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleDeviceChange = (event) => {
    setDevice(event.target.value);
  };

  const handleEqmtChange = (event) => {
    setEqmt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_API_URL}/mesh/new`,
        {
          ip,
          device,
          eqmt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
      setIp("");
      setDevice("");
      setEqmt("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: ", error);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Registrar mesh</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="ip">IP:</label>
            <input
              className="form-input"
              type="text"
              id="ip"
              value={ip}
              onChange={handleIpChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="device">Dispositivo:</label>
            <input
              className="form-input"
              placeholder="Ej: Pala 99, Caex 99"
              type="text"
              id="device"
              value={device}
              onChange={handleDeviceChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="eqmt">EQMT:</label>
            <input
              className="form-input"
              type="text"
              id="eqmt"
              value={eqmt}
              onChange={handleEqmtChange}
            />
          </div>
          <div>
            <button className="form-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
        <p className="form-message">{mensaje}</p>
      </div>
    </>
  );
};
