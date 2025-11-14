import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css"

export const CreateUps = () => {
  const [ip, setIp] = useState("");
  const [ubication, setUbication] = useState("");
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleUbicationChange = (event) => {
    setUbication(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_API_URL}/ups/new`,
        {
          ip,
          ubication,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
      setIp("");
      setUbication("");
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
        <h2 className="form-title">Registrar UPS</h2>
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
            <label className="form-label" htmlFor="ubication">Ubicación:</label>
            <input
              className="form-input"
              type="text"
              id="ubication"
              value={ubication}
              onChange={handleUbicationChange}
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
