import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const EditClient = () => {
  const [ip, setIp] = useState("");
  const [id, setId] = useState(0);
  const [dataClient, setDataClient] = useState({
    group: "",
    name: "",
    importancia: "",
    clave: 0,
    description: "",
    ip: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [showEditFields, setShowEditFields] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetClientInfo = async () => {
    if (ip.trim() === "") {
      setMensaje("Por favor, ingrese un IP de cliente válido.");
      setShowEditFields(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_API_URL}/clients/${ip}`);

      const clientData = response?.data?.data;
      const message = response?.data?.message;
      const currentId = response?.data?.data.id;

      if (clientData) {
        setDataClient(clientData);
        setMensaje("");
        setShowEditFields(true);
        setId(currentId);
      } else {
        setMensaje(message);
        setShowEditFields(false);
      }
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

  const handleEditClient = async (event) => {
    event.preventDefault();

    try {
      // Crear una copia de los datos del cliente sin el campo "id"
      const clientDataWithoutId = { ...dataClient };
      delete clientDataWithoutId.id;
      if (!token) {
        setMensaje("No autorizado, por favor inicie sesión.");
        return;
      }
      const response = await axios.put(
        `${BASE_API_URL}/clients/edit/${id}`,
        clientDataWithoutId,
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
        <h2 className="form-title">Editar Cliente - DCS Candelaria</h2>
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
            onClick={handleGetClientInfo}
          >
            Buscar
          </button>
          <hr className="form-divider" />
        </div>
        {showEditFields && (
          <form onSubmit={handleEditClient}>
            <div>
              <label className="form-label" htmlFor="ip">
                IP:
              </label>
              <input
                className="form-input"
                type="text"
                id="ip"
                name="ip"
                value={dataClient.ip}
                onChange={(e) =>
                  setDataClient({ ...dataClient, ip: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="group">
                Grupo:
              </label>
              <select
                className="form-select"
                // placeholder="CSP, CSS, CNP, CNS, HSE, CNPB, CNSB"
                // type="text"
                id="group"
                name="group"
                value={dataClient.group}
                onChange={(e) =>
                  setDataClient({ ...dataClient, group: e.target.value })
                }
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
              <label className="form-label" htmlFor="name">
                Nombre:
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={dataClient.name}
                onChange={(e) =>
                  setDataClient({ ...dataClient, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="importancia">
                Importancia:
              </label>
              <select
                className="form-select"
                placeholder="ALTA, MEDIA, BAJA"
                type="text"
                id="importancia"
                name="importancia"
                value={dataClient.importancia}
                onChange={(e) =>
                  setDataClient({ ...dataClient, importancia: e.target.value })
                }
              >
                <option value=""></option>
                <option value="ALTA">ALTA</option>
                <option value="MEDIA">MEDIA</option>
                <option value="BAJA">BAJA</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="clave">
                Clave:
              </label>
              <input
                className="form-input"
                type="number"
                id="clave"
                name="clave"
                value={dataClient.clave}
                onChange={(e) =>
                  setDataClient({ ...dataClient, clave: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="description">
                Descripción:
              </label>
              <input
                className="form-input"
                type="text"
                id="description"
                name="description"
                value={dataClient.description}
                onChange={(e) =>
                  setDataClient({ ...dataClient, description: e.target.value })
                }
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
