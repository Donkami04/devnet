import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css";

export const DeleteUps = () => {
  const [ip, setIp] = useState("");
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (ip.trim() === "") {
        setMensaje("Por favor, ingrese una dirección IP válida.");
        return; // No realizar la solicitud si ip está vacío
      }
      if (!token) {
        setMensaje("No autorizado, por favor inicie sesión.");
        return;
      }
      const response = await axios.delete(
        `${BASE_API_URL}/ups/remove/${ip}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
      setIp("");
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

      <div className="form-container">
        <h2 className="form-title">Eliminar UPS</h2>
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
            <button className="form-button" type="submit">
              Eliminar
            </button>
          </div>
        </form>
        <p className="form-message">{mensaje}</p>
      </div>

  );
};