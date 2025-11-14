import { useDataInfGen } from "./useDataInfGen";

export const useCoreStatus = async () => {
  try {
    const data = await useDataInfGen();

    const filters = [
      { name: "coreAdmin", switch: "SW CORE ADMIN" },
      { name: "coreConce", switch: "SW CORE CONCE" },
      { name: "coreOjos", switch: "SW CORE OJOS" },
      { name: "wlcMesh", device: "WLC 9800 MESH" },
      { name: "wlcNegocio", device: "WLC 9800 NEGOCIO" },
      { name: "fwOt", role: "FW OT" },
      { name: "telefonia", role: "TELEFONIA IP" },
      { name: "swDistAdm", switch: "SW DIST ADM", device: "SW DIST ADM" },
      { name: "swDistConce", switch: "SW DIST CONC", device: "SW DIST CONC" },
      { name: "swCoreOtAdmin", switch: "SW-CORE-OT-ADMIN", device: "SW-CORE-OT-ADMIN" },
      { name: "swCoreOtConce", switch: "SW-CORE-OT-CONCE", device: "SW-CORE-OT-CONCE" },
      { name: "ccumSub", switch: "CCUM-SUB", device: "CCUM-SUB" },
      { name: "uccx", switch: "UCCX01", device: "UCCX01" },
      { name: "cctvAdmin", device: "CLCANASM", role: "CCTV" },
      { name: "cctvOjos", device: "CLOJOSASM", role: "CCTV" },
      { name: "adminDna", switch: "CORE ADMIN DNA"},
      { name: "conceDna", switch: "CORE CONCE DNA"},
      { name: "clcanasmsot01", device: "CLCANASMSOT01 - 10.225.11.250"},
      { name: "clcanasmsit01", device: "CLCANASMSIT01 - 10.225.0.250"},
      { name: "clcanasmsit02", device: "CLCANASMSIT02 - 10.225.0.251"},
      { name: "clcanasmccit01", device: "CLCANASMCCIT01 - 10.225.30.6"},
      { name: "cloiosasmccit01", device: "CLOIOSASMCCIT01 - 10.225.30.7"},
      { name: "clcanasmccot01", device: "CLCANASMCCOT01 -  10.225.30.22"},
      { name: "clojosasmccot01", device: "CLOJOSASMCCOT01 - 10.225.30.23"},
      { name: "clcanasmsot02", device: "CLCANASMSOT02 - 10.225.11.251"},
      { name: "clojosasmsit01", device: "CLOJOSASMSIT01 - 10.231.0.250"},
      { name: "clojosasmsit02", device: "CLOJOSASMSIT02 - 10.231.0.251"},
      { name: "clojosasmsot01", device: "CLOJOSASMSOT01 - 10.231.10.250"},
      { name: "clojosasmsot02", device: "CLOJOSASMSOT02 - 10.231.10.251"},
      { name: "coreUgConce", switch: "CORE UG CONCE"},
      { name: "coreUgAdmin", switch: "CORE UG ADMIN"},
      { name: "coreUgAlcaparosa", switch: "CORE UG ALCAPAROSA"},
      { name: "coreUgSantos", switch: "CORE UG SANTOS"},
      { name: "coreUgOjos", switch: "CORE UG OJOS"},
      { name: "coreOpitConce", switch: "CORE OPIT CONCE"},
      { name: "coreOpitAdmin", switch: "CORE OPIT ADMIN"},
      { name: "coreOtNxConce", switch: "CORE-OT-NX-CONC"},
      { name: "coreOtNxAdmin", switch: "CORE-OT-NX-ADM"},

    ];

    const results = filters.reduce((acc, filter) => {
      const { name, switch: switchName, device, role } = filter;

      const upElements = data.upElements.filter(e => 
        (switchName && e.name_switch === switchName) ||
        (device && e.device?.includes(device)) ||
        (role && e.rol?.toUpperCase() === role.toUpperCase())
      );

      const downElements = data.downElements.filter(e =>
        (switchName && e.name_switch === switchName && e.status.includes("Down")) ||
        (device && e.device?.includes(device) && e.status.includes("Down")) ||
        (role && e.rol?.toUpperCase() === role.toUpperCase() && e.status.includes("Down"))
      );

      const upPercent = Math.floor((upElements.length / (upElements.length + downElements.length)) * 100);
      acc[`${name}UpPercent`] = upPercent;
      acc[`color${capitalizeFirstLetter(name)}`] = getColorStatus(upPercent);

      return acc;
    }, {});
    
    return results;
  } catch (error) {
    console.error(error);
  }
};

function getColorStatus(percent) {
  if (percent === 100) return "green";
  if (percent >= 70) return "yellow";
  return "red";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
