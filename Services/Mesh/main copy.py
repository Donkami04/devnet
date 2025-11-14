import warnings, requests, os, time, traceback, datetime, sched, re, logging, xmltodict
import mysql.connector
from dotenv import load_dotenv
from config import database
from datetime import timedelta
from controladora import get_data_controladora
from dispatch import get_data_dispatch
from actility_position import get_actility_data
from cande_position import get_cande_data
from calculate_distance import get_distance
from counter import counter_function

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings("ignore", message="Unverified HTTPS request")

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s: %(message)s"
)
file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s: %(message)s"))
logging.getLogger().addHandler(file_handler)


def prtg_data():

    load_dotenv()
    env = os.getenv("ENVIRONMENT")
    now = datetime.datetime.now()
    fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
    fecha_y_hora = str(fecha_y_hora)

    if env == "local":
        mydb = mysql.connector.connect(
            host=database["local"]["DB_HOST"],
            user=database["local"]["DB_USER"],
            password=database["local"]["DB_PASSWORD"],
            database=database["local"]["DB_DATABASE"],
        )

    else:
        mydb = mysql.connector.connect(
            host=database["production"]["DB_HOST"],
            user=database["production"]["DB_USER"],
            password=database["production"]["DB_PASSWORD"],
            database=database["production"]["DB_DATABASE"],
        )

    try:
        cursor = mydb.cursor()
        query = "SELECT * FROM data_mesh"
        cursor.execute(query)

        column_names = [column[0] for column in cursor.description]

        # Convertir los resultados a una lista de diccionarios
        devices = []
        for row in cursor:
            row_dict = {}
            for i in range(len(column_names)):
                row_dict[column_names[i]] = row[i]
            devices.append(row_dict)

        cursor = mydb.cursor()
        query = "SELECT * FROM mesh"
        cursor.execute(query)

        column_names_datamesh = [column[0] for column in cursor.description]

        current_data_mesh = []
        for row in cursor:
            row_dict = {}
            for i in range(len(column_names_datamesh)):
                row_dict[column_names_datamesh[i]] = row[i]
            current_data_mesh.append(row_dict)

        # devices = [{'ip':'10.117.115.181', 'device': 'Pala 19', 'eqmt': 'P19'}]

        now = datetime.datetime.now()
        current_hour = now.time()
        bot_limit = datetime.time(0, 0)
        top_limit = datetime.time(0, 30)

        if bot_limit <= current_hour <= top_limit:
            cursor.execute("UPDATE devnet.mesh SET fail_senal = 0, fail_time_senal = 0, fail_snr = 0, fail_time_snr = 0")
            mydb.commit()

        for device in devices:
            ip_device = device["ip"]
            name_device = device["device"]
            eqmt_device = device["eqmt"]
            logging.info(f"Consultando informacion: {name_device}")
            
            now = datetime.datetime.now()
            fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
            fecha_y_hora = str(fecha_y_hora)

            URL_GET_ID_PING = os.getenv("URL_GET_ID_PING").format(ip_host=ip_device)
            try:
                get_id_ping = requests.get(URL_GET_ID_PING, verify=False).json()
                id_ping = get_id_ping["devices"][0]["objid"]
            except Exception:
                id_ping = "Not Found"

            URL_GET_LAST_DATA_PING = os.getenv("URL_GET_LAST_DATA_PING").format(
                id_ping=id_ping
            )
            last_data_ping = requests.get(URL_GET_LAST_DATA_PING, verify=False).json()
            last_data_ping = last_data_ping["sensors"][0]

            objid = last_data_ping["objid"]
            last_value_ping = last_data_ping["lastvalue"]
            last_up_ping = last_data_ping["lastup"]
            last_down_ping = last_data_ping["lastdown"]

            patron = re.compile(
                r"<.*?>"
            )  # Se usa para formatear el last_up y last_down
            last_up_ping = re.sub(patron, "", last_up_ping)
            last_down_ping = re.sub(patron, "", last_down_ping)

            edate = datetime.datetime.today()
            sdate = datetime.datetime.today() - timedelta(minutes=30)
            edate = edate.strftime("%Y-%m-%d-%H-%M-%S")
            sdate = sdate.strftime("%Y-%m-%d-%H-%M-%S")

            URL_GET_DATA_PING = os.getenv("URL_GET_DATA_PING").format(
                objid=objid, sdate=sdate, edate=edate
            )
            try:
                data_ping = requests.get(URL_GET_DATA_PING, verify=False)
                data_ping = xmltodict.parse(data_ping.text)
                data_ping = data_ping["histdata"]["item"][
                    "value"
                ]  #! Se agrega la posicion [0]

                avg_ping = data_ping[0]["#text"]
                min_ping = data_ping[1]["#text"]
                max_ping = data_ping[2]["#text"]
                packet_loss = data_ping[3]["#text"]

            except KeyError:
                avg_ping = "Not Found"
                min_ping = "Not Found"
                max_ping = "Not Found"
                packet_loss = "Not Found"

            netmiko_data = get_data_controladora(ip_device)

            signal_strength = netmiko_data["signal_strength"]
            signal_noise = netmiko_data["signal_noise"]
            connected_for = netmiko_data["connected_for"]
            ap_name = netmiko_data["ap_name"]
            snr_level = netmiko_data["snr_level"]

            ap_longitude, ap_latitude = get_actility_data(ap_name) #! Descomentar
            elem_longitude, elem_latitud = get_cande_data(eqmt_device) #! Descomentar
            distance = get_distance(ap_longitude, ap_latitude, elem_longitude, elem_latitud) #! Descomentar
            # distance = 0.0  #! Borrar
            status_dispatch, operador = get_data_dispatch(eqmt_device)
            fail_senal, fail_time_senal, fail_snr, fail_time_snr = counter_function(ip_device, signal_strength, snr_level, current_data_mesh)
            
            now = datetime.datetime.now()
            fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
            fecha_y_hora = str(fecha_y_hora)
            # Este query se usa para actualizar la tabla mesh a la cual la API consulta.
            # fail_senal, fail_time_senal, fail_snr, fail_time_snr = counter_function(ip_device, signal_strength, snr_level, current_data_mesh)
        
            query = f"""
                INSERT INTO devnet.mesh (
                    `ip`, `device`, `ping_avg`, `minimo`, `maximo`, `packet_loss`,
                    `lastvalue`, `lastup`, `lastdown`, `nivel_senal`, `ruido_senal`,
                    `tiempo_conexion`, `conectado_a`, `status_dispatch`, `operador`,
                    `snr`, `id_prtg`, `distance`, `fail_senal`, `fail_time_senal`,
                    `fail_snr`, `fail_time_snr`, `date`
                )
                VALUES (
                    '{ip_device}', '{name_device}', '{avg_ping}', '{min_ping}',
                    '{max_ping}', '{packet_loss}', '{last_value_ping}', '{last_up_ping}',
                    '{last_down_ping}', '{signal_strength}', '{signal_noise}',
                    '{connected_for}', '{ap_name}', '{status_dispatch}', '{operador}',
                    '{snr_level}', '{id_ping}', '{distance}', '{fail_senal}', '{fail_time_senal}',
                    '{fail_snr}', '{fail_time_snr}', '{fecha_y_hora}'
                )
                ON DUPLICATE KEY UPDATE
                    `ip` = VALUES(`ip`), 
                    `device` = VALUES(`device`), 
                    `ping_avg` = VALUES(`ping_avg`), 
                    `minimo` = VALUES(`minimo`), 
                    `maximo` = VALUES(`maximo`), 
                    `packet_loss` = VALUES(`packet_loss`), 
                    `lastvalue` = VALUES(`lastvalue`), 
                    `lastup` = VALUES(`lastup`), 
                    `lastdown` = VALUES(`lastdown`), 
                    `nivel_senal` = VALUES(`nivel_senal`), 
                    `ruido_senal` = VALUES(`ruido_senal`), 
                    `tiempo_conexion` = VALUES(`tiempo_conexion`), 
                    `conectado_a` = VALUES(`conectado_a`), 
                    `status_dispatch` = VALUES(`status_dispatch`), 
                    `operador` = VALUES(`operador`), 
                    `snr` = VALUES(`snr`), 
                    `id_prtg` = VALUES(`id_prtg`), 
                    `distance` = VALUES(`distance`), 
                    `fail_senal` = VALUES(`fail_senal`), 
                    `fail_time_senal` = VALUES(`fail_time_senal`), 
                    `fail_snr` = VALUES(`fail_snr`), 
                    `fail_time_snr` = VALUES(`fail_time_snr`), 
                    `date` = VALUES(`date`)
            """

            cursor.execute(query)
            mydb.commit()
            
            # Este query se usa para insertar los datos en la tabla historic_mesh.
            query_historic = f"""
                INSERT INTO devnet.historic_mesh (
                    `ip`, `device`, `ping_avg`, `minimo`, `maximo`, `packet_loss`,
                    `lastvalue`, `lastup`, `lastdown`, `nivel_senal`, `ruido_senal`,
                    `tiempo_conexion`, `conectado_a`, `status_dispatch`, `operador`,
                    `snr`, `id_prtg`, `distance`, `fail_senal`, `fail_time_senal`,
                    `fail_snr`, `fail_time_snr`, `date`
                )"""

            cursor.execute(query)
            mydb.commit()
            
            # Este query se usa para insertar los datos en la tabla historic_mesh.
            query_historic = f"""
                INSERT INTO devnet.historic_mesh (
                    `ip`, `device`, `ping_avg`, `minimo`, `maximo`, `packet_loss`,
                    `lastvalue`, `lastup`, `lastdown`, `nivel_senal`, `ruido_senal`,
                    `tiempo_conexion`, `conectado_a`, `status_dispatch`, `operador`,
                    `snr`, `id_prtg`, `distance`, `fail_senal`, `fail_time_senal`,
                    `fail_snr`, `fail_time_snr`, `date`
                )
                VALUES (
                    '{ip_device}', '{name_device}', '{avg_ping}', '{min_ping}',
                    '{max_ping}', '{packet_loss}', '{last_value_ping}', '{last_up_ping}',
                    '{last_down_ping}', '{signal_strength}', '{signal_noise}',
                    '{connected_for}', '{ap_name}', '{status_dispatch}', '{operador}',
                    '{snr_level}', '{id_ping}', '{distance}', '{fail_senal}', '{fail_time_senal}',
                    '{fail_snr}', '{fail_time_snr}', '{fecha_y_hora}'
                )
            """
            cursor.execute(query_historic)
            mydb.commit()

        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        cursor.execute(
            f"INSERT INTO devnet.fechas_consultas_mesh (`ultima_consulta`, `estado`) VALUES ('{fecha_y_hora}', 'OK')"
        )
        mydb.commit()
        cursor.close()
        logging.info("Terminado Ciclo")

    except Exception as e:
        logging.error(f"Error en la consulta {name_device}")
        cursor.execute(
            f"INSERT INTO devnet.fechas_consultas_mesh (`ultima_consulta`, `estado`) VALUES ('{fecha_y_hora}', 'ERROR')"
        )
        mydb.commit()
        cursor.close()
        logging.error(traceback.format_exc())


def get_number(nivel):
    if isinstance(nivel, int):
        nivel = str(nivel)
        
    if  nivel == "N/A":
        return "N/A"
    
    match = re.search(r'(-?\d+(\.\d+)?)', nivel)
    if match:
        return float(match.group(0))  # Convertimos el resultado a un número decimal
    else:
        return "Not Found"

def bucle(scheduler):

    prtg_data()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
