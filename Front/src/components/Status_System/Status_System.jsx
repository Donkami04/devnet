// import React, { useEffect, useState } from "react";
// import { Message } from "../Message/Message";
// import "./status_system.css";

// export function Status_System({ tableToShow }) {
//   const [statusSystem, setStatusSystem] = useState();
//   const [statusModule, setStatusModule] = useState("");
//   const [message, setMessage] = useState("");
//   const [color, setColor] = useState("");
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const system = await getStatusSystem();
//         setStatusSystem(system);
//       } catch (error) {
//         console.error("Error al obtener el Status System", error);
//         return error;
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Verifica si statusSystem y statusModule están definidos antes de hacer la comparación
//     if (
//       statusSystem &&
//       statusSystem[tableToShow] &&
//       statusSystem[tableToShow][0]
//     ) {
//       setStatusModule(statusSystem[tableToShow][0].estado);

//       if (statusSystem[tableToShow][0].estado === "ERROR") {
//         setMessage(
//           `Hay un error con el modulo ${table()}, la información puede verse afectada.`
//         );
//         setColor("red-message");
//         setShow(true);
//       }
//     }
//   }, [statusSystem, tableToShow]);

//   const table = () => {
//     if (tableToShow === "dcs") {
//       return "Clientes";
//     } else if (tableToShow === "sw") {
//       return "Switches";
//     } else if (tableToShow === "ups") {
//       return "UPS";
//     } else if (tableToShow === "vpn") {
//       return "VPN";
//     } else if (tableToShow === "mesh") {
//       return "Mesh";
//     } else if (tableToShow === "devices") {
//       return "Dispositivos";
//     } else if (tableToShow === "fw") {
//       return "Firewalls";
//     } else if (tableToShow === "wan") {
//       return "WAN";
//     } else if (tableToShow === "ig") {
//       return "Infra General";
//     } else if (tableToShow === "fim") {
//       return "Base Fim";
//     } else if (tableToShow === "mesh_process") {
//       return "Proceso Mesh";
//     } else if (tableToShow === "anillo") {
//       return "Anillo Candelaria";
//     }
//   };

//   return (
//     <>
//       <Message message={message} color={color} show={show} />
//       <div className="status-system-container">
//         {statusSystem ? (
//           <div>
//             <p>Info Sistema: {table()}</p>
//             <ul>
//               {statusSystem[tableToShow].map((item) => (
//                 <li key={item.id}>Última consulta: {item.ultima_consulta}</li>
//               ))}
//               {statusSystem[tableToShow].map((item) => (
//                 <li key={item.id}>
//                   Estado: {item.estado}{" "}
//                   <span className={item.estado === "OK" ? "green" : "red"}>
//                     `
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p>Cargando datos...</p>
//         )}
//       </div>
//     </>
//   );
// }
