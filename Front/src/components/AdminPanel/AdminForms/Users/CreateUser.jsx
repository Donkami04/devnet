import { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../utils/Api-candelaria/api";
import "../form.css";

export const CreateUser = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    rol: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");
  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
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
      const response = await axios.post(`${BASE_API_URL}/users/new`, dataUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMensaje(response.data.message);
      setDataUser({
        name: "",
        email: "",
        rol: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensaje("Debes iniciar sesión con una cuenta autorizada.");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setMensaje(errorMessage);
      } else {
        console.error("Error desconocido:", error);
        setMensaje("Error desconocido: " + error.toString());
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrar Usuario</h2>
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
            value={dataUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="text"
            id="email"
            name="email"
            value={dataUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="rol">
            Rol:
          </label>
          <select
            className="form-select"
            type="text"
            id="rol"
            name="rol"
            value={dataUser.rol}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={dataUser.password}
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
