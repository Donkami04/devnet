export const useColorTitle = (status, ip_cisco) => {
    if (status.includes("Up")) {
      return "Color Verde: Up";
    }
    if (status.includes("Down")) {
      return "Color Rojo: Down";
    }
    if (status.includes("Paused")) {
      return "Color Azul: Pausado";
    }
    if (status.includes("Not Found") && ip_cisco !== "Not Found") {
      return "Color Gris: No se ha encontrado información en PRTG del CISCO IP";
    }
  };