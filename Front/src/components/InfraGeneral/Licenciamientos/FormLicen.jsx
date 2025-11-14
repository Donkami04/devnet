import { useState, useEffect } from "react";
import "./FormLicen.css";

export const FormLicen = ({ formData, handleChange }) => {
  const [isPerpetual, setIsPerpetual] = useState(formData.expiracion === "Perpetuas");
  console.log("CAMILO", formData);

  useEffect(() => {
    setIsPerpetual(formData.expiracion === "Perpetuas");
  }, [formData.expiracion]);

  const handleCheckboxChange = () => {
    const newValue = !isPerpetual ? "Perpetuas" : "";
    setIsPerpetual(!isPerpetual);
    handleChange({ target: { name: "expiracion", value: newValue } });
  };

  return (
    <div className="form-container-licen">
      <form>
        {Object.keys(formData)
          .filter((key) => key !== "id") // Excluye el campo 'id'
          .map((key) => (
            <div className="form-group-licen" key={key}>
              <label htmlFor={key}>{key.replace("_", " ").toUpperCase()}</label>

              {key === "expiracion" ? (
                <>
                  <label style={{ fontWeight: "lighter", justifyItems: "center" }}>
                    <input type="checkbox" checked={isPerpetual} onChange={handleCheckboxChange} />
                    <span style={{ marginLeft: "5px" }}>No expira</span>
                  </label>
                  <input
                    type={isPerpetual ? "text" : "date"}
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={!isPerpetual ? handleChange : undefined}
                    required
                    readOnly={isPerpetual}
                  />
                </>
              ) : key === "expiracion_soporte" ? (
                <input
                  type="date"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
      </form>
    </div>
  );
};
