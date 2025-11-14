import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { DatetimeModules } from "../DatetimeModules/DatetimeModules";
import { getDataAnilloUg } from "../../utils/Api-candelaria/api";
import "./AnilloUg.css";

export function AnilloUg() {
  const [anilloData, setAnilloData] = useState([]);
  const PRTG_URL = "https://10.224.241.25/sensor.htm?id=";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAnilloUg();

        setAnilloData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const statusLight = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find(
      (data) => data.id_prtg === idInterface
    );

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      if (interfaceData.status.toLowerCase().includes("up")) {
        return "anillo-green";
      }
      if (interfaceData.status.toLowerCase().includes("down")) {
        return "anillo-red";
      }
      if (interfaceData.status.toLowerCase().includes("unusual")) {
        return "anillo-orange";
      }
      if (interfaceData.status.toLowerCase().includes("paused")) {
        return "anillo-blue";
      }
    }

    return "anillo-white";
  };

  const statusTitle = (idInterface) => {
    // Verifica si hay datos en anilloData
    if (anilloData.length === 0) {
      return ""; // O cualquier otro valor que desees para indicar que no hay datos disponibles
    }

    // Busca la interfaz en anilloData
    const interfaceData = anilloData.find((e) => e.id_prtg === idInterface);

    // Verifica si se encontró la interfaz y si su estado incluye "Up" o "Down"
    if (interfaceData && interfaceData.status) {
      return interfaceData.status;
    }

    // En caso de no encontrar datos o que el estado no incluya "Up" o "Down"
    return "Not Found"; // O cualquier otro valor que desees para indicar un estado no válido
  };

  return (
    <main className="main-container-anilloug">
      <Navbar title={"Anillo UG"} />
      <DatetimeModules module={"anillo_ug"} name={"Anillo UG"} />
      <div className="anilloug-image-container">
        <img className="anilloug-image" src="/mapa-ug.webp" alt="" />
        <div className="main-lights-anilloug-container">
          <div className="status-light-anillo-container">
            <p // 10.224.127.180
              title={statusTitle(18903)}
              className={`status-light-anilloug id18903 ${statusLight(18903)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18903&tabid=1`}
                target="_blank"
              >
                Eth1/47
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 10.224.127.180
              title={statusTitle(18904)}
              className={`status-light-anilloug id18904 ${statusLight(18904)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18904&tabid=1`}
                target="_blank"
              >
                Eth1/48
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 10.224.127.180
              title={statusTitle(18902)}
              className={`status-light-anilloug id18902 ${statusLight(18902)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18902&tabid=1`}
                target="_blank"
              >
                Eth1/45
              </a>
            </p>
          </div>

          <div className="status-light-anillo-container">
            <p // 172.31.250.26
              title={statusTitle(15565)}
              className={`status-light-anilloug id15565 ${statusLight(15565)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}15565&tabid=1`}
                target="_blank"
              >
                Gi1/0/3
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.250.26
              title={statusTitle(15566)}
              className={`status-light-anilloug id15566 ${statusLight(15566)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}15566&tabid=1`}
                target="_blank"
              >
                Gi1/0/5
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.250.26
              title={statusTitle(15564)}
              className={`status-light-anilloug id15564 ${statusLight(15564)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}15564&tabid=1`}
                target="_blank"
              >
                Gi1/0/10
              </a>
            </p>
          </div>

          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18883)}
              className={`status-light-anilloug id18883 ${statusLight(18883)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18883&tabid=1`}
                target="_blank"
              >
                Gi1/0/5
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18881)}
              className={`status-light-anilloug id18881 ${statusLight(18881)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18881&tabid=1`}
                target="_blank"
              >
                Gi1/0/3
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18889)}
              className={`status-light-anilloug id18889 ${statusLight(18889)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18889&tabid=1`}
                target="_blank"
              >
                Gi1/0/1
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18884)}
              className={`status-light-anilloug id18884 ${statusLight(18884)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18884&tabid=1`}
                target="_blank"
              >
                Gi1/0/6
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18885)}
              className={`status-light-anilloug id18885 ${statusLight(18885)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18885&tabid=1`}
                target="_blank"
              >
                Gi1/0/7
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18887)}
              className={`status-light-anilloug id18887 ${statusLight(18887)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18887&tabid=1`}
                target="_blank"
              >
                Gi1/0/10
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18886)}
              className={`status-light-anilloug id18886 ${statusLight(18886)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18886&tabid=1`}
                target="_blank"
              >
                Gi1/0/9
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18737)}
              className={`status-light-anilloug id18737 ${statusLight(18737)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18737&tabid=1`}
                target="_blank"
              >
                Gi1/0/4
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18890)}
              className={`status-light-anilloug id18890 ${statusLight(18890)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18890&tabid=1`}
                target="_blank"
              >
                Gi1/0/2
              </a>
            </p>
          </div>
          <div className="status-light-anillo-container">
            <p // 172.31.1.246
              title={statusTitle(18888)}
              className={`status-light-anilloug id18888 ${statusLight(18888)}`}
            >
              <a
                style={{ color: "black" }}
                href={`${PRTG_URL}18888&tabid=1`}
                target="_blank"
              >
                Gi1/0/11
              </a>
            </p>
          </div>
        </div>

        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(15462)}
            className={`status-light-anilloug id15462 ${statusLight(15462)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15462&tabid=1`}
              target="_blank"
            >
              Gi1/0/11
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(15463)}
            className={`status-light-anilloug id15463 ${statusLight(15463)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15463&tabid=1`}
              target="_blank"
            >
              Gi1/0/12
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(18895)}
            className={`status-light-anilloug id18895 ${statusLight(18895)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18895&tabid=1`}
              target="_blank"
            >
              Gi1/0/6
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(18896)}
            className={`status-light-anilloug id18896 ${statusLight(18896)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18896&tabid=1`}
              target="_blank"
            >
              Gi1/0/7
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(18897)}
            className={`status-light-anilloug id18897 ${statusLight(18897)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18897&tabid=1`}
              target="_blank"
            >
              Gi1/0/8
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(18899)}
            className={`status-light-anilloug id18899 ${statusLight(18899)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18899&tabid=1`}
              target="_blank"
            >
              Gi1/0/10
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.244
            title={statusTitle(18898)}
            className={`status-light-anilloug id18898 ${statusLight(18898)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18898&tabid=1`}
              target="_blank"
            >
              Gi1/0/9
            </a>
          </p>
        </div>

        <div className="status-light-anillo-container">
          <p // 172.31.250.30
            title={statusTitle(15488)}
            className={`status-light-anilloug id15488 ${statusLight(15488)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15488&tabid=1`}
              target="_blank"
            >
              Gi1/0/10
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.250.30
            title={statusTitle(15572)}
            className={`status-light-anilloug id15572 ${statusLight(15572)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15572&tabid=1`}
              target="_blank"
            >
              Gi1/0/2
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.250.30
            title={statusTitle(15582)}
            className={`status-light-anilloug id15582 ${statusLight(15582)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15582&tabid=1`}
              target="_blank"
            >
              Gi1/0/9
            </a>
          </p>
        </div>

        <div className="status-light-anillo-container">
          <p // 110.224.127.147
            title={statusTitle(17481)}
            className={`status-light-anilloug id17481 ${statusLight(17481)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17481&tabid=1`}
              target="_blank"
            >
              Te1/6
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 110.224.127.147
            title={statusTitle(17478)}
            className={`status-light-anilloug id17478 ${statusLight(17478)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17478&tabid=1`}
              target="_blank"
            >
              Te1/3
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 110.224.127.147
            title={statusTitle(17480)}
            className={`status-light-anilloug id17480 ${statusLight(17480)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17480&tabid=1`}
              target="_blank"
            >
              Te1/5
            </a>
          </p>
        </div>

        <div className="status-light-anillo-container">
          <p // 110.224.127.148
            title={statusTitle(17508)}
            className={`status-light-anilloug id17508 ${statusLight(17508)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17508&tabid=1`}
              target="_blank"
            >
              Te1/3
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 110.224.127.148
            title={statusTitle(17493)}
            className={`status-light-anilloug id17493 ${statusLight(17493)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17493&tabid=1`}
              target="_blank"
            >
              Te1/11
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 110.224.127.148
            title={statusTitle(17510)}
            className={`status-light-anilloug id17510 ${statusLight(17510)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}17510&tabid=1`}
              target="_blank"
            >
              Te1/5
            </a>
          </p>
        </div>

        <div className="status-light-anillo-container">
          <p // 172.31.1.245
            title={statusTitle(15570)}
            className={`status-light-anilloug id15570 ${statusLight(15570)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15570&tabid=1`}
              target="_blank"
            >
              Gi/0/12
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.245
            title={statusTitle(15569)}
            className={`status-light-anilloug id15569 ${statusLight(15569)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}15569&tabid=1`}
              target="_blank"
            >
              Gi/0/11
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.245
            title={statusTitle(18891)}
            className={`status-light-anilloug id18891 ${statusLight(18891)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18891&tabid=1`}
              target="_blank"
            >
              Gi/0/6
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.245
            title={statusTitle(18893)}
            className={`status-light-anilloug id18893 ${statusLight(18893)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18893&tabid=1`}
              target="_blank"
            >
              Gi/0/9
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.245
            title={statusTitle(18892)}
            className={`status-light-anilloug id18892 ${statusLight(18892)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18892&tabid=1`}
              target="_blank"
            >
              Gi/0/8
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 172.31.1.245
            title={statusTitle(18894)}
            className={`status-light-anilloug id18894 ${statusLight(18894)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18894&tabid=1`}
              target="_blank"
            >
              Gi/0/10
            </a>
          </p>
        </div>

        <div className="status-light-anillo-container">
          <p // 10.224.127.181
            title={statusTitle(18907)}
            className={`status-light-anilloug id18907 ${statusLight(18907)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18907&tabid=1`}
              target="_blank"
            >
              Eth1/45
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 10.224.127.181
            title={statusTitle(18908)}
            className={`status-light-anilloug id18908 ${statusLight(18908)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18908&tabid=1`}
              target="_blank"
            >
              Eth1/47
            </a>
          </p>
        </div>
        <div className="status-light-anillo-container">
          <p // 10.224.127.181
            title={statusTitle(18909)}
            className={`status-light-anilloug id18909 ${statusLight(18909)}`}
          >
            <a
              style={{ color: "black" }}
              href={`${PRTG_URL}18909&tabid=1`}
              target="_blank"
            >
              Eth1/48
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
