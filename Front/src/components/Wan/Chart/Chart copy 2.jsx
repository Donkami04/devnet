import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Registrar los componentes necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Chart = () => {
  // Datos proporcionados
  const uptimeData = [
    {
      id: 4,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "100.0",
      uptime: "11d 02h 27m 05s",
      downtime: "00s",
      datetime: "2023-10-31-23-59-59",
      monthAndYear: "October 2023",
    },
    {
      id: 14,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "100.0",
      uptime: "29d 06h 11m 32s",
      downtime: "00s",
      datetime: "2023-11-30-23-59-59",
      monthAndYear: "November 2023",
    },
    {
      id: 24,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "100.0",
      uptime: "29d 02h 16m 15s",
      downtime: "00s",
      datetime: "2023-12-31-23-59-59",
      monthAndYear: "December 2023",
    },
    {
      id: 34,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "76.0",
      uptime: "30d 22h 49m 22s",
      downtime: "00s",
      datetime: "2024-01-31-23-59-59",
      monthAndYear: "January 2024",
    },
    {
      id: 44,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "80.0",
      uptime: "28d 22h 27m 40s",
      downtime: "00s",
      datetime: "2024-02-29-23-59-59",
      monthAndYear: "February 2024",
    },
    {
      id: 54,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "99.0",
      uptime: "30d 22h 22m 02s",
      downtime: "00s",
      datetime: "2024-03-31-23-59-59",
      monthAndYear: "March 2024",
    },
    {
      id: 64,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "100.0",
      uptime: "29d 22h 35m 54s",
      downtime: "00s",
      datetime: "2024-04-30-23-59-59",
      monthAndYear: "April 2024",
    },
    {
      id: 74,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "99.9",
      uptime: "30d 22h 02m 32s",
      downtime: "00s",
      datetime: "2024-05-31-23-59-59",
      monthAndYear: "May 2024",
    },
    {
      id: 84,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "98.9",
      uptime: "29d 22h 25m 15s",
      downtime: "00s",
      datetime: "2024-06-30-23-59-59",
      monthAndYear: "June 2024",
    },
    {
      id: 94,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "100.0",
      uptime: "30d 22h 30m 19s",
      downtime: "00s",
      datetime: "2024-07-31-23-59-59",
      monthAndYear: "July 2024",
    },
    {
      id: 104,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "98.0",
      uptime: "30d 19h 35m 42s",
      downtime: "00s",
      datetime: "2024-08-31-23-59-59",
      monthAndYear: "August 2024",
    },
    {
      id: 104,
      ip: "10.220.15.1",
      sensor: "FW_SANTIAGO",
      uptime_percent: "98.0",
      uptime: "30d 19h 35m 42s",
      downtime: "00s",
      datetime: "2024-09-31-23-59-59",
      monthAndYear: "September 2024",
    },
  ];

  // Preparar datos para el gráfico
  const chartData = {
    labels: uptimeData.map((item) => item.monthAndYear), // Usar monthAndYear como etiquetas
    datasets: [
      {
        label: "Uptime (%)",
        data: uptimeData.map((item) => parseFloat(item.uptime_percent)), // Convertir uptime_percent a float
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color de fondo con transparencia
        borderColor: "rgba(75, 192, 192, 1)", // Color del borde
        borderWidth: 2,
        pointRadius: 5, // Radio de los puntos
        fill: true,
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
        position: "top",
      },
      title: {
        display: true,
        text: "Uptime Mensual (%)",
      },
    },
    elements: {
      point: {
        radius: 5, // Ajustar el tamaño de los puntos
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
