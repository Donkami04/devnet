import { useEffect, useState } from "react";
import { Navbar } from "../../Navbar/Navbar";
import {
  getFirewalls,
  getWan,
  getStatusCores,
} from "../../../utils/Api-candelaria/api";
import { Link } from "react-router-dom";
import { useDataInfGen } from "../../../hooks/useDataInfGen";
import { Spinner } from "../../Spinner/Spinner";
import { useCoreStatus } from "../../../hooks/useCoreStatus";
import "./Map.css";

export const Map = () => {
  const [firewalls, setFirewalls] = useState([]);
  const [wan, setWan] = useState([]);
  const [cores, setCores] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [infraGeneral, setInfraGeneral] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [coreStatus, setCoreStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataFirewalls = await getFirewalls();
        const dataWan = await getWan();
        const dataCores = await getStatusCores();
        const dataInfGen = await useDataInfGen();
        const dataCoreStatus = await useCoreStatus();

        setFirewalls(dataFirewalls.data);
        setWan(dataWan.data);
        setCores(dataCores.data);
        setInfraGeneral(dataInfGen);
        setShowSpinner(false);
        setCoreStatus(dataCoreStatus);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getDeadElements = (list, name) => {
    const filteredData = list.filter(
      (e) => e.fw === name && e.state === "dead"
    );
    return filteredData;
  };

  const handleZoomIn = () => {
    // Ajusta el nivel de zoom según sea necesario
    if (zoomLevel < 4) {
      setZoomLevel(zoomLevel + 1);
    }
  };

  const handleZoomOut = () => {
    // Ajusta el nivel de zoom según sea necesario
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 1);
    }
  };

  const getColorLightWan = (sensorName, wanlist) => {
    const filteredWan = wanlist.filter(
      (wanElement) => wanElement.sensor === sensorName
    );
    if (filteredWan.length > 0) {
      return filteredWan[0].status === "Up"
        ? "inf-gen-green"
        : filteredWan[0].status.toLowerCase().includes("paused")
        ? "inf-gen-green"
        : filteredWan[0].status.toLowerCase().includes("unusual")
        ? "inf-gen-green"
        : filteredWan[0].status.toLowerCase().includes("unknown")
        ? "inf-gen-green"
        : "inf-gen-red";
    }
    return "";
  };

  const getColorLight = (list, number) => {
    let finalColor = "";
    if (list.length === number) {
      finalColor = "inf-gen-red";
      return finalColor;
    }
    if (list.length < number && list.length !== 0) {
      finalColor = "inf-gen-yellow";
      return finalColor;
    }
    finalColor = "inf-gen-green";
    return finalColor;
  };

  const getColorLightCores = (ipCore, red, cores) => {
    const filteredCores = cores.filter(
      (core) => core.ip === ipCore && core.red === red
    );
    if (filteredCores.length > 0) {
      return filteredCores[0].status === "Up" ? "inf-gen-green" : "inf-gen-red";
    }
    return "";
  };

  // Filtro de elementos Dead
  const fwsSantiagoDead = getDeadElements(firewalls, "FW-Santiago");
  const fwsChamonateDead = getDeadElements(firewalls, "FW-Chamonate");
  const fwsRalunDead = getDeadElements(firewalls, "FW-Ralun");
  const fwsDptLegalDead = getDeadElements(firewalls, "FW-Dpto-Legal");
  const fwsCopiapoDead = getDeadElements(firewalls, "FW-Copiapo");
  const canalAdminDead = getDeadElements(firewalls, "FW-Admin");
  const canalConceDead = getDeadElements(firewalls, "FW-Conce");
  const canalOjosDead = getDeadElements(firewalls, "FW-Ojos");

  // Colores Firewalls
  const colorLightFwSantiago = getColorLight(fwsSantiagoDead, 2);
  const colorLightFwChamonate = getColorLight(fwsChamonateDead, 3);
  const colorLightFwRalun = getColorLight(fwsRalunDead, 1);
  const colorLightFwDptLegal = getColorLight(fwsDptLegalDead, 1);
  const colorLightFwCopiapo = getColorLight(fwsCopiapoDead, 1);
  let colorLightStarlink = canalAdminDead.some((fw) => fw.link === "STARLINK");
  !colorLightStarlink
    ? (colorLightStarlink = "inf-gen-green")
    : (colorLightStarlink = "inf-gen-red");

  // Colores Canales
  const colorLightCanalAdmin = getColorLight(canalAdminDead, 4);
  const colorLightCanalConce = getColorLight(canalConceDead, 3);
  const colorLightCanalOjos = getColorLight(canalOjosDead, 3);

  // Colores WAN
  const colorLightWanAzure = getColorLightWan("LAN_Azure", wan);
  const colorLightWanAdmin = getColorLightWan("FG-Admin", wan);
  const colorLightWanConce = getColorLightWan("FG-Conce", wan);
  const colorLightWanOjos = getColorLightWan("FG-Ojos", wan);

  // Colores Cores
  const colorLightCoreAdmIt = getColorLightCores("10.224.127.1", "it", cores);
  const colorLightCoreConceIt = getColorLightCores("10.224.127.2", "it", cores);
  const colorLightCoreOjosIt = getColorLightCores("10.230.127.1", "it", cores);

  if (showSpinner) {
    return (
      <div>
        <Navbar title={"Mapa Infra General"} />
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Navbar title={"Mapa Infra General"} />
      <div className="button-zoom-container">
        <button className="button-zoom zoom-in" onClick={handleZoomIn}>
          +
        </button>
        <button
          title={"Disminuir Zoom"}
          className="button-zoom zoom-out"
          onClick={handleZoomOut}
        >
          -
        </button>
      </div>
      <main className={`background-infra-general zoom-${zoomLevel}`}>
        <div className="main-map-container">
          <img src="/mapa-horizontal.png" alt="mapa-infra-general" />

          <div className="main-lights-container">
            <div className="status-light-map-container fw-santiago">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightFwSantiago}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container fw-chamonate">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightFwChamonate}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container fw-ralun">
              <Link to="/monitoreo/firewalls">
                <p className={`status-light-inf-gen ${colorLightFwRalun}`}></p>
              </Link>
            </div>

            <div className="status-light-map-container fw-dpto-legal">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightFwDptLegal}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container fw-copiapo">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightFwCopiapo}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container fw-azure">
              <Link to="/monitoreo/firewalls">
                <p className={`status-light-inf-gen ${colorLightWanAzure}`}></p>
              </Link>
            </div>

            <div className="status-light-map-container internet">
              <Link to="/monitoreo/firewalls">
                <p className="status-light-inf-gen inf-gen-green"></p>
              </Link>
            </div>

            <div className="status-light-map-container canal-starlink">
              <Link to="/monitoreo/firewalls">
                <p className={`status-light-inf-gen ${colorLightStarlink}`}></p>
              </Link>
            </div>

            <div className="status-light-map-container canal-admin">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightCanalAdmin}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container canal-conce">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightCanalConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container canal-ojos">
              <Link to="/monitoreo/firewalls">
                <p
                  className={`status-light-inf-gen ${colorLightCanalOjos}`}
                ></p>
              </Link>
            </div>

            <div
              title={
                colorLightWanAdmin === "inf-gen-red"
                  ? "El sensor tipo Ping está Down en PRTG"
                  : ""
              }
              className="status-light-map-container fw-admin"
            >
              <Link to="/monitoreo/wan">
                <p className={`status-light-inf-gen ${colorLightWanAdmin}`}></p>
              </Link>
            </div>

            <div
              title={
                colorLightWanConce === "inf-gen-red"
                  ? "El sensor tipo Ping está Down en PRTG"
                  : ""
              }
              className="status-light-map-container fw-conce"
            >
              <Link to="/monitoreo/wan">
                <p className={`status-light-inf-gen ${colorLightWanConce}`}></p>
              </Link>
            </div>

            <div
              title={
                colorLightWanOjos === "inf-gen-red"
                  ? "El sensor tipo Ping está Down en PRTG"
                  : ""
              }
              className="status-light-map-container fw-ojos"
            >
              <Link to="/monitoreo/wan">
                <p className={`status-light-inf-gen ${colorLightWanOjos}`}></p>
              </Link>
            </div>

            <div className="status-light-map-container core-admin-it">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=SW%20CORE%20ADMIN">
                <p
                  title={`El ${coreStatus.coreAdminUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreAdmin}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container core-conce-it">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=SW%20CORE%20CONCE">
                <p
                  title={`El ${coreStatus.coreConceUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container core-ojos-it">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=SW%20CORE%20OJOS">
                <p
                  title={`El ${coreStatus.coreOjosUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreOjos}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container status-wlc-negocio">
              <Link to="/monitoreo/infraestrucura-general?categoria=WLC%209800%20NEGOCIO">
                <p
                  title={`El ${coreStatus.wlcNegocioUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorWlcNegocio}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container status-wlc-mesh">
              <Link to="/monitoreo/infraestrucura-general?categoria=WLC%209800%20MESH">
                <p
                  title={`El ${coreStatus.wlcMeshUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorWlcMesh}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container fw-ot">
              <Link to="/monitoreo/infraestrucura-general?categoria=FW%20OT">
                <p
                  title={`El ${coreStatus.fwOtUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorFwOt}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreOpitConce">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20OPIT%20CONCE">
                <p
                  title={`El ${coreStatus.coreOpitConceUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreOpitConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreOpitAdmin">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20OPIT%20ADMIN">
                <p
                  title={`El ${coreStatus.coreOpitAdminUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreOpitAdmin}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container cucm-pub">
              <Link to="/monitoreo/infraestrucura-general?categoria=cuc-pub">
                <p
                  title={`El ${coreStatus.telefoniaUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorTelefonia}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreOtNxConce">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE-OT-NX-CONC">
                <p
                  title={`El ${coreStatus.coreOtNxConceUpPercent}% de los elementos (CORE-OT-NX-CONCE) está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreOtNxConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreOtNxAdmin">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE-OT-NX-ADM">
                <p
                  title={`El ${coreStatus.coreOtNxAdminUpPercent}% de los elementos (CORE-OT-NX-ADMIN) está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreOtNxAdmin}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container dist-adm">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=SW%20DIST%20ADM">
                <p
                  title={`El ${coreStatus.swDistAdmUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorSwDistAdm}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container dist-conce">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=SW%20DIST%20CONC">
                <p
                  title={`El ${coreStatus.swDistConceUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorSwDistConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container swCoreOtAdmin">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=SW-CORE-OT-ADMIN">
                <p
                  title={`El ${coreStatus.swCoreOtAdminUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorSwCoreOtAdmin}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container swCoreOtConce">
              <Link to="/monitoreo/infraestrucura-general?categoria=SW-CORE-OT-CONCE">
                <p
                  title={`El ${coreStatus.swCoreOtConceUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorSwCoreOtConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreUgAdmin">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20UG%20ADMIN">
                <p
                  title={`El ${coreStatus.coreUgAdminUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreUgAdmin}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreUgAlcaparosa">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20UG%20ALCAPAROSA">
                <p
                  title={`El ${coreStatus.coreUgAlcaparosaUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreUgAlcaparosa}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreUgSantos">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20UG%20SANTOS">
                <p
                  title={`El ${coreStatus.coreUgSantosUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreUgSantos}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreUgOjos">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20UG%20OJOS">
                <p
                  title={`El ${coreStatus.coreUgOjosUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreUgOjos}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container coreUgConce">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20UG%20CONCE">
                <p
                  title={`El ${coreStatus.coreUgConceUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCoreUgConce}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container ccucm-sub">
              <Link to="/monitoreo/infraestrucura-general?categoria=ccum-sub">
                <p
                  title={`El ${coreStatus.ccumSubUpUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCcumSub}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container uccx">
              <Link to="/monitoreo/infraestrucura-general?categoria=uccx">
                <p
                  title={`El ${coreStatus.uccxUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorUccx}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container admin-dna">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20ADMIN%20DNA">
                <p
                  title={`El ${coreStatus.adminDnaUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorAdminDna}`}
                ></p>
              </Link>
            </div>

            <div className="status-light-map-container conce-dna">
              <Link to="/monitoreo/infraestrucura-general/detalles?nombre=CORE%20CONCE%20DNA">
                <p
                  title={`El ${coreStatus.conceDnaUpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorConceDna}`}
                ></p>
              </Link>
            </div>

            {/* CCTV ADMIN */}
            <div className="status-light-map-container clcanasmsot01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLCANASMSOT01%20-%2010.225.11.250">
                <p
                  title={`El ${coreStatus.clcanasmsot01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClcanasmsot01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clcanasmsit01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLCANASMSIT01%20-%2010.225.0.250">
                <p
                  title={`El ${coreStatus.clcanasmsit01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClcanasmsit01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clcanasmsit02">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLCANASMSIT02%20-%2010.225.0.251">
                <p
                  title={`El ${coreStatus.clcanasmsit02UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClcanasmsit02}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clcanasmccit01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLCANASMCCIT01%20-%2010.225.30.6">
                <p
                  title={`El ${coreStatus.clcanasmccit01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClcanasmccit01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container cloiosasmccit01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLOIOSASMCCIT01%20-%2010.225.30.7">
                <p
                  title={`El ${coreStatus.cloiosasmccit01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorCloiosasmccit01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clcanasmccot01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLCANASMCCOT01%20-%20%2010.225.30.22">
                <p
                  title={`El ${coreStatus.clcanasmccot01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClcanasmccot01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clojosasmccot01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLOJOSASMCCOT01%20-%2010.225.30.23">
                <p
                  title={`El ${coreStatus.clojosasmccot01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClojosasmccot01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clcanasmsot02">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLCANASMSOT02%20-%2010.225.11.251">
                <p
                  title={`El ${coreStatus.clcanasmsot02UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClcanasmsot02}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clojosasmsit01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLOJOSASMSIT01%20-%2010.231.0.250">
                <p
                  title={`El ${coreStatus.clojosasmsit01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClojosasmsit01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clojosasmsit02">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLOJOSASMSIT02%20-%2010.231.0.251">
                <p
                  title={`El ${coreStatus.clojosasmsit02UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClojosasmsit02}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clojosasmsot01">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLOJOSASMSOT01%20-%2010.231.10.250">
                <p
                  title={`El ${coreStatus.clojosasmsot01UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClojosasmsot01}`}
                ></p>
              </Link>
            </div>
            <div className="status-light-map-container clojosasmsot02">
              <Link to="/monitoreo/infraestrucura-general?categoria=CLOJOSASMSOT02%20-%2010.231.10.251">
                <p
                  title={`El ${coreStatus.clojosasmsot02UpPercent}% de los elementos está Up`}
                  className={`status-light-inf-gen inf-gen-${coreStatus.colorClojosasmsot02}`}
                ></p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
