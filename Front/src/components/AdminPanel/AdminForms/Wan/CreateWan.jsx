import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateWan = () => {
  const [ip, setIp] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken"); // Obtener el token JWT del LocalStorage

    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return; 
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/wan/new`,
        {
          ip,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
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
        setMensaje("Error desconocido: " + error.message); // Cambia esta línea para mostrar el mensaje de error correctamente
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Registrar WAN</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label" htmlFor="ip">
              IP:
            </label>
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
              Enviar
            </button>
          </div>
        </form>
        <p className="form-message">{mensaje}</p>
      </div>
    </>
  );
};
