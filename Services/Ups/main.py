import logger_config
import requests
import os
import time
import traceback
import datetime
import sched
import logging
from uptime import get_uptime
from db_get_data import get_data
from db_connections import devnet_connection
from db_insert_historic import save_historic_data
from db_update_devnet import update_devnet_data, datetime_register


def main():
    """
    Función principal que procesa datos de dispositivos UPS obtenidos desde una base de datos.
    Realiza solicitudes a la API de PRTG para obtener información sobre el estado de cada UPS
    y actualiza los datos en las bases de datos de históricos y de producción.

    Proceso:
    - Obtiene la lista de UPS desde la base de datos.
    - Por cada UPS, realiza consultas a la API de PRTG para obtener datos relevantes.
    - Si la información no está disponible, asigna valores por defecto.
    - Almacena los datos procesados en la base de datos histórica y actualiza la base de datos de producción.
    - Registra la fecha y hora de la última consulta exitosa.

    Manejo de errores:
    - Si ocurre un error durante la ejecución, se captura, se registra en los logs y se actualiza 
      el estado del sistema a "ERROR".

    Raises:
        ValueError: Si la conexión con la base de datos falla.
    """
    try:
        # Obtenemos los datos de las UPS de la BD
        upsList = get_data(table_name="ups")
        if upsList is None:
            raise ValueError(
                "No se pudo establecer la conexión con la base de datos: el conector es None."
            )

        PRTG_USERNAME = os.getenv("PRTG_USERNAME")
        PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")

        data_for_update = []

        counter = 1
        for ups in upsList:
            ip = ups["ip"]
            logging.info(f"Procesando UPS # {counter} de {len(upsList)}: {ip}")
            counter += 1
            url_prtg_ip = os.getenv("URL_PRTG_IP_UPS").format(
                ip=ip, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            prtg_response_ip = requests.get(url_prtg_ip, verify=False).json()

            # Si la API no retorna dispositivos con el IP proporcionado
            # definimos los valores de interes como Not Found
            if len(prtg_response_ip["devices"]) == 0:
                ups["name"] = "Not Found"
                ups["status_prtg"] = "Not Found"
                ups["status_ups"] = 0
                ups["batery"] = 0
                ups["id_ups"] = "Not Found"
                ups["uptime"] = 0
                data_for_update.append(ups)

            else:
                prtg_response_ip = prtg_response_ip["devices"][0]
                name = prtg_response_ip["device"]
                id_ups = prtg_response_ip["objid"]

                url_prtg_id = os.getenv("URL_PRTG_ID_UPS").format(
                    id=id_ups, username=PRTG_USERNAME, password=PRTG_PASSWORD
                )
                prtg_response_id = requests.get(url_prtg_id, verify=False).json()
                sensors = prtg_response_id["sensors"]

                # Si la API no retorna dispositivos con el OBJID proporcionado
                # definimos los valores de interes como Not Found
                if len(sensors) == 0:
                    ups["name"] = "Not Found"
                    ups["status_prtg"] = "Not Found"
                    ups["status_ups"] = 0
                    ups["batery"] = 0
                    ups["id_ups"] = "Not Found"
                    ups["uptime"] = 0
                    data_for_update.append(ups)

                else:
                    status_prtg = os.getenv("URL_PRTG_GET_DATA_PING_WITH_ID").format(
                        id_ups_ping=id_ups,
                        username=PRTG_USERNAME,
                        password=PRTG_PASSWORD,
                    )
                    status_prtg = requests.get(status_prtg, verify=False).json()
                    try:
                        status_prtg = status_prtg["sensors"][0]["status"]
                    except KeyError:
                        status_prtg = "Not Found"

                    get_id_ping = os.getenv("URL_PRTG_UPS_PING").format(
                        id_snmp=id_ups, username=PRTG_USERNAME, password=PRTG_PASSWORD
                    )
                    ping_response = requests.get(get_id_ping, verify=False).json()
                    id_ping = ping_response["sensors"][0]["objid"]

                    # Función para obtener el Uptime de la UPS
                    uptime = get_uptime(id_ping)

                    # El listado incluye diferentes tipos de sensores
                    # Solo obtenemos aquel que incluya
                    for sensor in sensors:
                        if "Output Status" in sensor["sensor"]:
                            status_sensor = sensor["lastvalue_raw"]
                            if status_sensor == "":
                                status_sensor = 0
                            else:
                                status_sensor = int(status_sensor)

                    for sensor in sensors:
                        if "Cambio Bateria" in sensor["sensor"]:
                            batery = sensor["lastvalue_raw"]
                            if batery == "":
                                batery = 0
                            else:
                                batery = int(batery)

                    now = datetime.datetime.now()
                    ups_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
                    ups_datetime = str(ups_datetime)

                    # Una vez obtenida toda la data asignamos las propiedades de interes
                    ups["name"] = name
                    ups["status_prtg"] = status_prtg
                    ups["status_ups"] = status_sensor
                    ups["batery"] = batery
                    ups["id_ups"] = id_ups
                    ups["uptime"] = uptime
                    ups["datetime"] = ups_datetime
                    data_for_update.append(ups)
                    
        devnet_bd_response = update_devnet_data(data_for_update)
        historic_bd_response = save_historic_data(data_for_update)

        if devnet_bd_response is True and historic_bd_response is True:
            datetime_register(system_name="ups", status="OK")
        else:
            datetime_register(system_name="ups", status="ERROR")

        logging.info("Ciclo finalizado con exito!")

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            f"Error en la funcion `ups` en el archivo `main` con la ups con IP {ip}"
        )
        logging.error(e)
        datetime_register(system_name="ups", status="ERROR")


def bucle(scheduler):
    main()
    scheduler.enter(900, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
