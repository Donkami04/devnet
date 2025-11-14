import { useState, useEffect } from "react";
import { getLicenciamientos } from "../../../utils/Api-candelaria/api";
import { Navbar } from "../../Navbar/Navbar";
import { Spinner } from "../../Spinner/Spinner";
import { Modal } from "../../Modal/Modal";
import { FormLicen } from "./FormLicen";
import { BASE_API_URL } from "../../../utils/Api-candelaria/api";
import { useHotkeys } from "react-hotkeys-hook";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "./Licenciamientos.css";

export const Licenciamientos = () => {
  const [dataLicen, setDataLicen] = useState(false);
  const [errorLicen, setErrorLicen] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [total, setTotal] = useState("");
  const [errorCreatingUpdating, setErrorCreatingUpdating] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    equipo: "",
    marca: "",
    serial: "",
    expiracion: "",
    expiracion_soporte: "",
  });

  useHotkeys("esc", () => setShowModalNew(false));

  const fetchData = async () => {
    try {
      const data = await getLicenciamientos();
      if (data && data.data && data.data.data.length > 0) {
        setDataLicen(data.data.data);
        setTotal(data.data.data.length);
      } else {
        setErrorLicen(data.data.message);
        setDataLicen([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkRoles = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/auth/check-tkn`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.status === 200) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkRoles();
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearFormData = () => {
    setFormData({
      equipo: "",
      marca: "",
      serial: "",
      expiracion: "",
      expiracion_soporte: "",
    });
  };

  const closeForm = () => {
    setShowModalNew(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
    setErrorCreatingUpdating(false);
    clearFormData();
  };

  const handleClickElemEdit = (data) => {
    // Funcion para cuando se da click al icono de editar
    // Setea los el formulario con los datos del elemento seleccionado

    if (data.expiracion !== "Perpetuas") {
      const [day, month, year] = data.expiracion.split("/");
      const [daySpt, monthSpt, yearSpt] = data.expiracion_soporte.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const formattedDateSupport = `${yearSpt}-${monthSpt.padStart(2, "0")}-${daySpt.padStart(2, "0")}`;

      setFormData({
        id: data.id,
        equipo: data.equipo,
        marca: data.marca,
        serial: data.serial,
        expiracion: formattedDate,
        expiracion_soporte: formattedDateSupport,
      });
    } else {
      const [daySpt, monthSpt, yearSpt] = data.expiracion_soporte.split("/");
      const formattedDateSupport = `${yearSpt}-${monthSpt.padStart(2, "0")}-${daySpt.padStart(2, "0")}`;

      setFormData({
        id: data.id,
        equipo: data.equipo,
        marca: data.marca,
        serial: data.serial,
        expiracion: data.expiracion,
        expiracion_soporte: formattedDateSupport,
      });
    }
    setShowModalEdit(true);
  };

  const formatDate = (date) => {
    const dateArray = date.split("-");
    const formattedDate = dateArray.reverse().join("/");
    return formattedDate;
  };

  const handleSave = async () => {
    try {
      formData.expiracion = formatDate(formData.expiracion);
      formData.expiracion_soporte = formatDate(formData.expiracion_soporte);

      const isEditing = !!formData.id;
      const url = isEditing ? `${BASE_API_URL}/licenciamientos/${formData.id}` : `${BASE_API_URL}/licenciamientos`;

      const method = isEditing ? axios.put : axios.post;

      const response = await method(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && (response.status === 200 || response.status === 201)) {
        setShowModalNew(false);
        fetchData();
        clearFormData();
        setShowModalNew(false);
        setShowModalEdit(false);
      }
    } catch (error) {
      setErrorCreatingUpdating(error.response?.data?.message || "Error en el servidor");
      console.error(error);
    }
  };

  const deleteReq = async () => {
    try {
      const response = await axios.delete(`${BASE_API_URL}/licenciamientos/${formData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.status === 200) {
        fetchData();
        closeForm();
      }
    } catch (error) {
      setErrorCreatingUpdating(error.response?.data?.message || "Error en el servidor");
      console.error(error);
    }
  };

  if (!dataLicen) {
    return (
      <>
        <Navbar title={"Licenciamientos"} />
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Navbar title={"Licenciamientos"} />
      <Modal
        isOpen={showModalNew}
        onClose={() => closeForm()}
        title={"Registrar Licenciamiento"}
        content={<FormLicen formData={formData} handleChange={handleChange} />}
        errorMess={errorCreatingUpdating}
        buttons={[
          { label: "Crear", onClick: () => handleSave(), type: "primary" },
          { label: "Cancelar", onClick: () => closeForm(), type: "secondary" },
        ]}
      />
      <Modal
        isOpen={showModalEdit}
        onClose={() => closeForm()}
        title={"Editar Licenciamiento"}
        content={<FormLicen formData={formData} handleChange={handleChange} />}
        errorMess={errorCreatingUpdating}
        buttons={[
          { label: "Editar", onClick: () => handleSave(), type: "primary" },
          { label: "Cancelar", onClick: () => closeForm(), type: "secondary" },
        ]}
      />
      <Modal
        isOpen={showModalDelete}
        onClose={() => closeForm()}
        title={"Eliminar Licenciamiento"}
        content={
          <p style={{ padding: "15px", textAlign: "center" }}>
            ¿Está seguro de eliminar el licenciamiento <br />{" "}
            <span style={{ fontWeight: "bold" }}>
              {formData.equipo} - {formData.marca}
            </span>
            ?
          </p>
        }
        errorMess={errorCreatingUpdating}
        buttons={[
          { label: "Eliminar", onClick: () => deleteReq(), type: "primary" },
          { label: "Cancelar", onClick: () => closeForm(), type: "secondary" },
        ]}
      />

      <div className="table-container-licenciamientos">
        <div className="licenciamientos-header">
          <span style={{ fontSize: "12px", color: "#4b5563" }}>Total licenciamientos: {total}</span>
          {isAdmin && (
            <button className="new-licenciamiento-bttn" onClick={() => setShowModalNew(true)}>
              Nuevo
            </button>
          )}
        </div>
        <div className="licenciamientos-main">
          <table className="licenciamientos-table">
            <thead>
              <tr>
                {isAdmin && <th style={{ width: "40px" }}></th>}
                <th>Equipo</th>
                <th>Marca</th>
                <th>Serial</th>
                <th>Expiración</th>
                <th>Expiración Soporte</th>
                <th>Días Restantes</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {errorLicen && (
                <tr>
                  <td style={{ color: "red" }} colSpan="7" className="error-message">
                    {errorLicen}
                  </td>
                </tr>
              )}
              {dataLicen &&
                dataLicen.map((e) => (
                  <tr key={e.id}>
                    {isAdmin && (
                      <td>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                          <MdEdit style={{ cursor: "pointer" }} onClick={() => handleClickElemEdit(e)} />
                          <MdDelete
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setFormData(e);
                              setShowModalDelete(true);
                            }}
                          />
                        </div>
                      </td>
                    )}
                    <td>{e.equipo}</td>
                    <td>{e.marca}</td>
                    <td>{e.serial}</td>
                    <td>{e.expiracion}</td>
                    <td>{e.expiracion_soporte}</td>
                    <td>{e.daysRemaining}</td>
                    <td
                      className={`${
                        e.status === "Down"
                          ? "status-soon"
                          : e.status === "Warning"
                          ? "status-warning"
                          : "status-active"
                      }`}
                    >
                      {e.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
