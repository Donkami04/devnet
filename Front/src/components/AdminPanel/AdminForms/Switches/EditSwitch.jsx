import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const EditSwitch = () => {
  const [ip, setIp] = useState("");
  const [id, setId] = useState(0);
  const [newIp, setNewIp] = useState("");
  const [dispositivo, setDispositivo] = useState("");
  const [group, setGroup] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showEditFields, setShowEditFields] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetSwitchInfo = async () => {
    // Validar si el campo ip está vacío
    if (ip.trim() === "") {
      setMensaje("Por favor, ingrese una dirección IP válida.");
      setShowEditFields(false);
      return; // No realizar la solicitud si ip está vacío
    }

    try {
      const response = await axios.get(`${BASE_API_URL}/switches/${ip}`);

      const currentDispositivo = response?.data?.data?.dispositivo;
      const currentGroup = response?.data?.data?.group;
      const currentIp = response?.data?.data?.ip;
      const currentId = response?.data?.data?.id;

      setNewIp(currentIp);
      setDispositivo(currentDispositivo);
      setGroup(currentGroup);
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

  const handleEditSwitch = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      const response = await axios.put(`${BASE_API_URL}/switches/edit/${id}`, {
        ip: newIp,
        dispositivo,
        group,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        <h2 className="form-title">Editar Switch - DCS Candelaria</h2>
        <div>
          <label className="form-label" htmlFor="ip">
            Buscar por IP:
          </label>
          <input
            className="form-input"
            type="text"
            id="ip"
            value={ip}
            onChange={handleIpChange}
          />
          <button
            className="form-button search-button"
            onClick={handleGetSwitchInfo}
          >
            Buscar
          </button>
          <hr className="form-divider" />
        </div>

        {showEditFields && (
          <form onSubmit={handleEditSwitch}>
            <div>
              <label className="form-label" htmlFor="newIp">
                IP:
              </label>
              <input
                className="form-input"
                type="text"
                id="newIp"
                value={newIp ?? " "}
                onChange={(e) => setNewIp(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="dispositivo">
                Nombre:
              </label>
              <input
                className="form-input"
                type="text"
                id="dispositivo"
                value={dispositivo ?? " "}
                onChange={(e) => setDispositivo(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="group">
                Grupo:
              </label>
              <select
                className="form-select"
                id="group"
                value={group ?? " "}
                onChange={(e) => setGroup(e.target.value)}
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
