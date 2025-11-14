// const text = "-";

const getFormattedDateTime = () => {
  const now = new Date();

  // Formatear la fecha y hora en la zona horaria de Chile
  const options = {
    timeZone: "America/Santiago",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Formato 24 horas
  };

  const formatter = new Intl.DateTimeFormat("es-CL", options);
  const parts = formatter.formatToParts(now);

  // Extraer las partes de la fecha
  const day = parts.find((part) => part.type === "day").value;
  const month = parts.find((part) => part.type === "month").value;
  const year = parts.find((part) => part.type === "year").value;
  const hours = parts.find((part) => part.type === "hour").value;
  const minutes = parts.find((part) => part.type === "minute").value;
  const seconds = parts.find((part) => part.type === "second").value;

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

// Expresión regular para capturar la fecha y hora
export const formatDatePrtg = (prtgDateFormat) => {
  try {
    // console.log(prtgDateFormat);
    const match = prtgDateFormat.match(/(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})/);
    if (match) {
      const datetimeStr = match[0];
      return datetimeStr;
    } else {
      console.log(null);
      return null;
    }
  } catch (error) {
    console.error(error)
  }
};

// const currentDatetimeFormated = new Date(currentDatetime.split(" ")[0].split("-").reverse().join("-") + "T" + currentDatetime.split(" ")[1]);
// const currentDatePrtgFormated = new Date(dateFromPrtg.split(" ")[0].split("-").reverse().join("-") + "T" + dateFromPrtg.split(" ")[1]);

const parseDate = (dateString) => {
  const [day, month, year, hour, minute, second] = dateString.split(/[- :]/);
  return new Date(year, month - 1, day, hour, minute, second);
};

export const diffDates = (dateFromPrtg, prtg_status) => {
  try {
    if (!prtg_status.toLowerCase().includes("down")) {
      return false
    }
  
  const currentDatetime = getFormattedDateTime();

  // Convertir las fechas a objetos Date
  const currentDateObj = parseDate(currentDatetime);
  const prtgDateObj = parseDate(dateFromPrtg);

  // Calcular la diferencia en milisegundos
  const diff = Math.abs(currentDateObj - prtgDateObj);
  const hours24 = 24 * 60 * 60 * 1000; // milisegundos en 24 horas

  // Verificar si la diferencia es mayor a 24 horas
  if (diff > hours24) {
    return false; // La diferencia es mayor a 24 horas
  } else {
    return true; // La diferencia es menor o igual a 24 horas
  }
  } catch(error) {
    console.error(error);
  }
};

// const dateExample = "18-01-2025 15:45:31 [474 d ago]";
// const stringDate = formatDatePrtg(dateExample);
// const result = diffDates(stringDate);
// console.log(result);


