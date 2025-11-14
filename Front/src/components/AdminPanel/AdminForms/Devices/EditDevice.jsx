import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const EditDevice = () => {
  const [host, setIp] = useState("");
  const [id, setId] = useState(0);
  const [dataDevice, setDataDevice] = useState({
    host: "",
    type: "",
    site: "",
    dpto: "",
    red: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [showEditFields, setShowEditFields] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handleIpChange = (event) => {
    setIp(event.target.value);
  };

  const handleGetDeviceInfo = async () => {
    if (host.trim() === "") {
      setMensaje("Por favor, ingrese un IP de dispositivo válido.");
      setShowEditFields(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_API_URL}/devices/${host}`);

      let deviceData = response?.data?.data;
      const message = response?.data?.message;
      const currentId = response?.data?.data.id;

      deviceData = {
        host: deviceData.host,
        type: deviceData.type,
        site: deviceData.site,
        dpto: deviceData.dpto,
        red: deviceData.red,
      };

      if (deviceData) {
        setDataDevice(deviceData);
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

  const handleEditDevice = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      // Crear una copia de los datos del dispositivo sin el campo "id"
      const deviceDataWithoutId = { ...dataDevice };
      delete deviceDataWithoutId.id;
      const response = await axios.put(
        `${BASE_API_URL}/devices/edit/${id}`,
        deviceDataWithoutId,
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
        <h2 className="form-title">Editar Dispositivo</h2>
        <div>
          <label className="form-label" htmlFor="host">
            Buscar por IP:
          </label>
          <input
            className="form-input"
            type="text"
            id="host"
            value={host}
            onChange={handleIpChange}
          />
          <button
            className="form-button search-button"
            onClick={handleGetDeviceInfo}
          >
            Buscar
          </button>
          <hr className="form-divider" />
        </div>
        {showEditFields && (
          <form onSubmit={handleEditDevice}>
            <div>
              <label className="form-label" htmlFor="host">
                IP:
              </label>
              <input
                className="form-input"
                type="text"
                id="host"
                name="host"
                value={dataDevice.host}
                onChange={(e) =>
                  setDataDevice({ ...dataDevice, host: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="type">
                Tipo de dispositivo:
              </label>
              <input
                className="form-input"
                type="text"
                id="type"
                name="type"
                value={dataDevice.type}
                onChange={(e) =>
                  setDataDevice({ ...dataDevice, type: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="site">
                Sitio:
              </label>
              <input
                className="form-input"
                type="text"
                id="site"
                name="site"
                value={dataDevice.site}
                onChange={(e) =>
                  setDataDevice({ ...dataDevice, site: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="dpto">
                Departamento:
              </label>
              <input
                className="form-input"
                type="text"
                id="dpto"
                name="dpto"
                value={dataDevice.dpto}
                onChange={(e) =>
                  setDataDevice({ ...dataDevice, dpto: e.target.value })
                }
              />
            </div>
            <div>
              <label className="form-label" htmlFor="red">
                Red:
              </label>
              <select
                className="form-select"
                id="red"
                name="red"
                value={dataDevice.red}
                onChange={(e) =>
                  setDataDevice({ ...dataDevice, red: e.target.value })
                }
              >
                <option value=""></option>
                <option value="IT">IT</option>
                <option value="OT">OT</option>
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
