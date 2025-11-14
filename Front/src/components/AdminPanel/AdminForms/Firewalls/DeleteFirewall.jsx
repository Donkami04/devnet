import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const DeleteFirewall = () => {
  const [ip, setIp] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ubication, setUbication] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (ip.trim() === "" || ubication.trim() === "") {
        setMensaje(
          "Por favor, ingrese una IP y una Ubicación de firewall válida."
        );
        return; // No realizar la solicitud si ip está vacío
      }
      if (!token) {
        setMensaje("No autorizado, por favor inicie sesión.");
        return;
      }
      const response = await axios.delete(
        `${BASE_API_URL}/firewalls/remove/${ip}/${ubication}`,
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
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: ", error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Eliminar Firewall - Canal Internet</h2>
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
          <label className="form-label" htmlFor="ubication">
            Ubicación:
          </label>
          <select
            className="form-select"
            type="text"
            id="ubication"
            value={ubication}
            onChange={(e) => setUbication(e.target.value)}
            required
          >
            <option value=""></option>
            <option value="corporate">Corporativo</option>
            <option value="community">Comunitario</option>
          </select>
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
