import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateDevice = () => {
  const [dataDevice, setDataDevice] = useState({
    host: "",
    type: "",
    site: "",
    dpto: "",
    red: "",
  });
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataDevice({
      ...dataDevice,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setMensaje("No autorizado, por favor inicie sesión.");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_API_URL}/devices/new`,
        dataDevice,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataDevice({
        host: "",
        type: "",
        site: "",
        dpto: "",
        red: "",
      });
      setMensaje(response.data.message);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: " + error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrar Dispositivo</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="type">
            Tipo de Dispositivo:
          </label>
          <input
            className="form-input"
            type="text"
            id="type"
            name="type"
            value={dataDevice.type}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="IT">IT</option>
            <option value="OT">OT</option>
          </select>
        </div>
        {/* {dataDevice.type.toLowerCase() === "camara" ||
        dataDevice.type.toLowerCase() === "cámara" ? (
          <div>
            <label className="form-label" htmlFor="id_cctv">
              ID CCTV:
            </label>
            <input
              className="form-input"
              type="text"
              id="id_cctv"
              name="id_cctv"
              value={dataDevice.id_cctv}
              onChange={handleInputChange}
            />
          </div>
        ) : (
          ""
        )} */}
        <div>
          <button type="submit" className="form-button">
            Enviar
          </button>
        </div>
      </form>
      <p className="form-message">{mensaje}</p>
    </div>
  );
};
