import { useState } from "react";
import axios from "axios";

export function NewActility({
  setShowPopUp,
  fetchData,
  BASE_API_URL,
  setShowMessageForm,
  setMessageForm,
  setShowNewForm,
}) {
  const [newElement, setNewElement] = useState({
    name: "",
    eui: "",
    device: "",
    latitude: "",
    longitude: "",
  });
  const token = localStorage.getItem("jwtToken");

  const handleChange = (e) => {
    setNewElement({
      ...newElement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que ninguno de los campos esté vacío
    if (!newElement.name || !newElement.eui || !newElement.device) {
      setShowMessageForm(true);
      setMessageForm("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/actility/new`,
        newElement,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Verifica si la respuesta fue exitosa antes de actualizar el estado
      if (response.status === 201) {
        fetchData();
        setShowPopUp(false);
        setShowMessageForm(false);
        setMessageForm("");
        setShowNewForm(false);
        setNewElement({
          name: "",
          eui: "",
          device: "",
        });
      } else {
        console.error("Error al guardar el nuevo elemento");
      }
    } catch (error) {
      console.error("Error al enviar el nuevo elemento:", error);
    }
  };

  return (
    <div className="new-actility-container">
      <h2>Registrar Elemento</h2>
      <form className="edit-actility-form" onSubmit={handleSubmit}>
        <label htmlFor="name">NOMBRE</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newElement.name}
          onChange={handleChange}
        />
        <label htmlFor="eui">EUI</label>
        <input
          type="text"
          name="eui"
          id="eui"
          value={newElement.eui}
          onChange={handleChange}
        />
        <label htmlFor="device">DISPOSITIVO</label>
        <input
          type="text"
          name="device"
          id="device"
          value={newElement.device}
          onChange={handleChange}
        />
        <label htmlFor="device">LATITUD</label>
        <input
          type="number"
          name="latitude"
          id="latitude"
          value={newElement.latitude}
          onChange={handleChange}
        />
        <label htmlFor="device">LONGITUD</label>
        <input
          type="number"
          name="longitude"
          id="longitude"
          value={newElement.longitude}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
