import React, { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateFirewall = () => {
  const [dataFirewall, setDataFirewall] = useState({
    name: "",
    channel: "",
    ip: "",
    link: "",
    vdom: "",
    gateway: "",
    ubication: "",
  });
  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataFirewall({
      ...dataFirewall,
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
        `${BASE_API_URL}/firewalls/new`,
        dataFirewall,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensaje(response.data.message);
      setDataFirewall({
        name: "",
        channel: "",
        ip: "",
        link: "",
        vdom: "",
        gateway: "",
        ubication: "",
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
      <h2 className="form-title">Registrar Firewall - Canal Internet</h2>
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
            value={dataFirewall.ip}
            onChange={handleInputChange}
          />
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
            value={dataFirewall.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="channel">
            Canal:
          </label>
          <input
            className="form-input"
            type="text"
            id="channel"
            name="channel"
            value={dataFirewall.channel}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="link">
            Enlace:
          </label>
          <input
            className="form-input"
            type="text"
            id="link"
            name="link"
            value={dataFirewall.link}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="vdom">
            VDOM:
          </label>
          <select
            className="form-select"
            id="vdom"
            name="vdom"
            value={dataFirewall.vdom}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="N/A">N/A</option>
            <option value="Villa">Villa</option>
            <option value="Comunitario">Comunitario</option>
            <option value="root">root</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="gateway">
            Gateway:
          </label>
          <input
            className="form-input"
            type="text"
            id="gateway"
            name="gateway"
            value={dataFirewall.gateway}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="ubication">
            Ubicación:
          </label>
          <select
            className="form-select"
            id="ubication"
            name="ubication"
            value={dataFirewall.ubication}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="corporate">Corporativo</option>
            <option value="community">Comunitario</option>
          </select>
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
