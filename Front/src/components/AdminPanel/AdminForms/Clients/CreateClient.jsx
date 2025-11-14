import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateClient = () => {
  const [dataClient, setDataClient] = useState({
    group: "",
    name: "",
    importancia: "",
    clave: 0,
    description: "",
    ip: "",
  });

  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataClient({
      ...dataClient,
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
        `${BASE_API_URL}/clients/new`,
        dataClient,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
      setDataClient({
        group: "",
        name: "",
        importancia: "",
        clave: 0,
        description: "",
        ip: "",
      });
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
      <h2 className="form-title">Registrar Cliente - DCS Candelaria</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="group">
            Grupo:
          </label>
          <select
            className="form-select"
            id="group"
            name="group"
            value={dataClient.group}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="importancia">
            Importancia:
          </label>
          <select
            className="form-select"
            id="importancia"
            name="importancia"
            value={dataClient.importancia}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
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
