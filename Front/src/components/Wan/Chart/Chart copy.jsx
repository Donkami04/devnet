import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IoClose } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import "./Chart.css";

// Registrar los componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = ({ uptimeData, closeChart, loadingChart }) => {
  // Preparar datos para el gráfico de barras
  const chartData = {
    labels: uptimeData.map((item) => item.monthAndYear), // Usar monthAndYear como etiquetas
    datasets: [
      {
        label: "Uptime Mensual (%)",
        data: uptimeData.map((item) => parseFloat(item.uptime_percent)), // Convertir uptime_percent a float
        backgroundColor: uptimeData.map((item) =>
          parseFloat(item.uptime_percent) < 99.85
            ? "rgb(255, 134, 134)"
            : "rgb(189, 255, 192)"
        ),
        borderColor: uptimeData.map((item) =>
          parseFloat(item.uptime_percent) < 99.85 ? "red" : "green"
        ),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0, // Valor mínimo en el eje Y
        max: 100, // Valor máximo en el eje Y
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Uptime Mensual (%)",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            let value = context.raw !== null ? context.raw.toFixed(2) : "";
            let month = context.label;

            // Obtener el índice de la barra sobre la que está el hover
            let index = context.dataIndex;
            let uptime = context.chart.data.datasets[0].data[index]; // Obtiene el valor de uptime_percent
            let uptimeRaw = uptimeData[index].uptime; // Obtiene la propiedad uptime adicional

            // Personalizar el contenido del tooltip
            return `Uptime: ${value}% - Tiempo de uptime total: ${uptimeRaw}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-wan-container">
      <main>
        {loadingChart ? (
          <>
            <ClipLoader color={"red"} size={"5rem"} />
          </>
        ) : (
          <>
            {uptimeData.length === 0 ? (
              <div>
                <span className="close-wan-chart">
                  <IoClose
                    onClick={() => closeChart(false)}
                    title={"Cerrar gráfica"}
                    size={"2rem"}
                    color="red"
                  />
                </span>
                <h1 style={{ color: "red" }}>
                  Error al obtener el historial solicitado
                </h1>
              </div>
            ) : (
              <>
                <span className="close-wan-chart">
                  <IoClose
                    onClick={() => closeChart(false)}
                    title={"Cerrar gráfica"}
                    size={"2rem"}
                    color="red"
                  />
                </span>
                <h2 className="title-wan-chart">{uptimeData[0].sensor}</h2>
                <Bar data={chartData} options={options} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};
