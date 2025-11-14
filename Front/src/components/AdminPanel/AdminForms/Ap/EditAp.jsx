import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const EditAp = () => {
  const [ip, setIp] = useState("");
  const [id, setId] = useState(0);
  const [dataAp, setDataAp] = useState({
    name: "",
    model: "",
    ip: "",
    state: "",
    location: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [showEditFields, setShowEditFields] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetApInfo = async () => {
    if (ip.trim() === "") {
      setMensaje("Por favor, ingrese un IP de dispositivo válido.");
      setShowEditFields(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_API_URL}/infra_general/ap/${ip}`);

      const apData = response?.data?.data;
      const message = response?.data?.message;
      const currentId = response?.data?.data.id;

      if (apData) {
        setDataAp(apData);
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

  const handleEditAp = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      // Crear una copia de los datos del dispositivo sin el campo "id"
      const apDataWithoutId = { ...dataAp };
      delete apDataWithoutId.id;

      const response = await axios.put(
        `${BASE_API_URL}/infra_general/ap/edit/${id}`,
        apDataWithoutId,
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
        <h2 className="form-title">Editar AP</h2>
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
            onClick={handleGetApInfo}
          >
            Buscar
          </button>
          <hr className="form-divider" />
        </div>
        {showEditFields && (
          <form onSubmit={handleEditAp}>
            <div>
              <label className="form-label" htmlFor="name">
                Nombre:
              </label>
              <input
                className="form-input"
                type="text"
                id="name"
                name="name"
                value={dataAp.name}
                onChange={(e) => setDataAp({ ...dataAp, name: e.target.value })}
              />
            </div>
            <div>
              <div>
                <label className="form-label" htmlFor="model">
                  Modelo:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="model"
                  name="model"
                  value={dataAp.model}
                  onChange={(e) =>
                    setDataAp({ ...dataAp, model: e.target.value })
                  }
                />
              </div>
              <label className="form-label" htmlFor="ip">
                IP:
              </label>
              <input
                className="form-input"
                type="text"
                id="ip"
                name="ip"
                value={dataAp.ip}
                onChange={(e) => setDataAp({ ...dataAp, ip: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="state">
                Estado:
              </label>
              <input
                className="form-input"
                type="text"
                id="state"
                name="state"
                value={dataAp.state}
                onChange={(e) =>
                  setDataAp({ ...dataAp, state: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="location">
                Ubicación:
              </label>
              <input
                className="form-input"
                type="text"
                id="location"
                name="location"
                value={dataAp.location}
                onChange={(e) =>
                  setDataAp({ ...dataAp, location: e.target.value })
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
