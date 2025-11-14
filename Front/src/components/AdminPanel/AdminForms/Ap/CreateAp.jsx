import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateAp = () => {
  const [dataAp, setDataAp] = useState({
    name: "",
    model: "",
    ip: "",
    state: "",
    location: "",
  });
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataAp({
      ...dataAp,
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
        `${BASE_API_URL}/infra_general/ap/new`,
        dataAp,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje(response.data.message);
      if (response.data.status === 201) {
        setDataAp({
          name: "",
          model: "",
          ip: "",
          state: "",
          location: "",
        });
      }
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
        setMensaje("Error desconocido: " + error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrar Ap</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={handleInputChange}
          />
        </div>
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
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="ip">
            Ip:
          </label>
          <input
            className="form-input"
            type="text"
            id="ip"
            name="ip"
            value={dataAp.ip}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="state"
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
