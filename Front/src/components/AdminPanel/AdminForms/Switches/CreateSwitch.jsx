import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css"

export const CreateSwitch = () => {
  const [ip, setIp] = useState("");
  const [dispositivo, setDispositivo] = useState("");
  const [group, setGroup] = useState("");
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleDispositivoChange = (event) => {
    setDispositivo(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_API_URL}/switches/new`,
        {
          ip,
          dispositivo,
          group,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
      setIp("");
      setDispositivo("");
      setGroup("");

    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
        // Ahora puedes trabajar con el mensaje de error, por ejemplo, mostrarlo en la interfaz de usuario o tomar decisiones basadas en él.
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: ", error);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Registrar Switch - DCS Candelaria</h2>
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
            <label className="form-label" htmlFor="dispositivo">Nombre:</label>
            <input
              className="form-input"
              type="text"
              id="dispositivo"
              value={dispositivo}
              onChange={handleDispositivoChange}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="group">Grupo:</label>
            <select
              className="form-select"
              id="group"
              value={group}
              onChange={handleGroupChange}
            >
            <option value=""></option>
            <option value="CSP">CSP</option>
            <option value="CSS">CSS</option>
            <option value="CNP">CNP</option>
            <option value="CNS">CNS</option>
            <option value="HSE">HSE</option>
            <option value="CNPB">CNPB</option>
            <option value="CNSB">CNSB</option>
            </select>
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

