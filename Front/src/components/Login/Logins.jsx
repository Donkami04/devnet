import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { BASE_API_URL } from "../../utils/Api-candelaria/api";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorParam = queryParams.get("error");
  const fromParam = queryParams.get("from");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.data.token;
        localStorage.setItem("jwtToken", token);
        setError("");
        if (fromParam) {
          navigate(fromParam);
        } else {
          navigate("/admin/home");
        }
      } else {
        setError(response.data.message);
        setApiResponse("");
      }
    } catch (error) {
      setError(error.response.data.message);
      setApiResponse("");
    }
  };

  return (
    <>
      <Navbar title={"Admin Devnet"} />
      <div className=" login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          {error && <div className="error-message">{error}</div>}
          {errorParam === "401" && (
            <div className="error-message">
              Debes iniciar sesión con una cuenta autorizada.
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="login-button" type="submit">
            Log in
          </button>
        </form>
        {apiResponse && <div className="api-response">{apiResponse}</div>}
      </div>
    </>
  );
}
