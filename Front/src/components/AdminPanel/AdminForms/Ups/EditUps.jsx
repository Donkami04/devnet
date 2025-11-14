import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api"
import "../form.css";

export const EditUps = () => {
  const [ip, setIp] = useState("");

  const [id, setId] = useState(0)
  const [newIp, setNewIp] = useState("");
  const [ubication, setUbication] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showEditFields, setShowEditFields] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetUpsInfo = async () => {
    // Validar si el campo ip está vacío
    if (ip.trim() === "") {
      setMensaje("Por favor, ingrese una dirección IP válida.");
      setShowEditFields(false);
      return; // No realizar la solicitud si ip está vacío
    }
  
    try {
      const response = await axios.get(
        `${BASE_API_URL}/ups/${ip}`
      );
  
      const currentUbication = response?.data?.data?.ubication;
      const currentIp = response?.data?.data?.ip;
      const currentId = response?.data?.data?.id;
  
      setNewIp(currentIp);
      setUbication(currentUbication);
      setId(currentId);
      setMensaje("");
      setShowEditFields(true);
  
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
        setShowEditFields(false);
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error al obtener información: " + error.message);
        setShowEditFields(false);
      }
    }
  };
  

  const handleEditUps = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      const response = await axios.put(
        `${BASE_API_URL}/ups/edit/${id}`,
        {
          ip: newIp, 
          ubication,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
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
        setMensaje("Error desconocido: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Editar UPS</h2>
        <div>
          <label className="form-label" htmlFor="ip">Buscar por IP:</label>
          <input
            className="form-input"
            type="text"
            id="ip"
            value={ip}
            onChange={handleIpChange}
          />
          <button className="form-button search-button" onClick={handleGetUpsInfo}>
            Buscar
          </button>
          <hr className="form-divider" /> 
        </div>

        {showEditFields && (
          <form onSubmit={handleEditUps}>
            <div>
              <label className="form-label" htmlFor="newIp">IP:</label>
              <input
                className="form-input"
                type="text"
                id="newIp"
                value={newIp ?? ' '}
                onChange={(e) => setNewIp(e.target.value)} 
              />
            </div>
            <div>
              <label className="form-label" htmlFor="ubication">Ubicación:</label>
              <input
                className="form-input"
                type="text"
                id="ubication"
                value={ubication ?? ' '}
                onChange={(e) => setUbication(e.target.value)}
              />
            </div>
            <div>
              <button className="form-button" type="submit">
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
        <p className="form-message">{mensaje}</p>
      </div>
    </>
  );
};
