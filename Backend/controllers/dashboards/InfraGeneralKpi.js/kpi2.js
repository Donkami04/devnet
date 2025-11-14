// // const data = require("../../../infraestructura_resultado.json");
// const { extractInfraestructuraData } = require("./kpi")

// const read = async () => {

//     const data = await extractInfraestructuraData();
    
//     data.infraestructura_general.forEach((element) => {
//         const upElem = element.upElem.length
//         const downElem = element.downElem.length
//         const total = downElem + upElem
//         const percentUp = ((upElem/total).toFixed(2) * 100)
//         console.log(element.name_switch, percentUp);
//     });
//     data.grupos_prtg.data.forEach((element) => {
//         const upElem = element.up
//         const downElem = element.down
//         const total = downElem + upElem
//         const percentUp = ((upElem/total).toFixed(2) * 100)
//         console.log(element.device, percentUp);
//     });
// };

// read();
