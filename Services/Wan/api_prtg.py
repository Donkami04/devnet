import xml.etree.ElementTree as ET
import logger_config
import requests
import os
import traceback
import logging
from dotenv import load_dotenv
from calculate_dates import calculate_dates
from format_data import format_historic_data

load_dotenv()
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_prtg_data(ip_wan):
    """
    Obtiene información de un dispositivo de la API de PRTG utilizando su dirección IP.

    Esta función consulta dos endpoints de la API de PRTG. Primero, obtiene el ID del dispositivo usando su IP.
    Luego, con ese ID, recupera datos del sensor asociados al dispositivo, como el nombre del dispositivo,
    el estado del sensor, la última vez que estuvo en línea ('lastup') y la última vez que estuvo fuera de línea ('lastdown').
    Si ocurre algún error, devuelve valores predeterminados o un mensaje de error específico.

    Args:
        ip (str): Dirección IP del dispositivo del cual se obtendrán los datos de PRTG.

    Returns:
        dict: Diccionario con los datos obtenidos del dispositivo PRTG. Contiene las claves:
              - 'prtg_name_device' (str): Nombre del dispositivo en PRTG.
              - 'prtg_id' (str): ID del dispositivo en PRTG.
              - 'prtg_sensorname' (str): Nombre del sensor asociado al dispositivo.
              - 'prtg_status' (str): Estado actual del sensor.
              - 'prtg_lastup' (str): Fecha y hora de la última vez que el dispositivo estuvo activo.
              - 'prtg_lastdown' (str): Fecha y hora de la última vez que el dispositivo estuvo inactivo.

    Errores:
        Si ocurre un error en la consulta a la API de PRTG o en la manipulación de los datos,
        se devolverán mensajes de error en los campos correspondientes y se registrará el error.

    Raises:
        Registra los errores utilizando logging cuando no se pueden obtener los datos correctamente.
    """

    # Obtenemos la data de la API de PRTG
    try:
        device_id_url = os.getenv("URL_PRTG_GET_ID_WITH_IP").format(
            ip=ip_wan, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )
        response_1 = requests.get(device_id_url, verify=False).json()
        device_data = response_1.get("devices", "Not Found")

        # Inicializamos la data para guardar en caso de error
        data_wan = {
            "ip": ip_wan,
            "sensor": "Not Found",
            "last_uptime_days": "Not Found",
            "last_down_days": "Not Found",
            "last_uptime_percent": 0.0,
            "last_down_percent": 0.0,
            "current_uptime_percent": 0.0,
            "today_uptime_percent": 0.0,
            "status": "Not Found",
        }

        if device_data == "Not Found" or device_data == []:
            return data_wan
        else:
            device_id = device_data[0].get("objid")
            device_status = device_data[0].get("status", "Not Found")

            if ip_wan.startswith("10.224.126"):
                get_id_ping_url = os.getenv("URL_PRTG_GET_ID_PING_WITH_ID_SNMP").format(
                    id_device=device_id, username=PRTG_USERNAME, password=PRTG_PASSWORD
                )

            else:
                get_id_ping_url = os.getenv("URL_PRTG_GET_ID_PING_WITH_ID").format(
                    id_device=device_id, username=PRTG_USERNAME, password=PRTG_PASSWORD
                )

            response_2 = requests.get(get_id_ping_url, verify=False).json()
            sensor_ping_id = response_2.get("sensors", [{}])[0].get(
                "objid", "Not Found"
            )
            sensor_name = response_2.get("sensors", [{}])[0].get("device", "Not Found")
            if sensor_ping_id == "Not Found" or sensor_ping_id == []:
                logging.error(f"Sensor ping id not Found {ip_wan}")
                return data_wan
            else:
                (
                    sdate_anterior,
                    edate_anterior,
                    sdate_actual,
                    edate_actual,
                    sdate_hoy,
                    edate_hoy,
                ) = calculate_dates()
                last_month = get_wan_data(
                    sensor_ping_id, sdate_anterior, edate_anterior
                )
                current_month = get_wan_data(sensor_ping_id, sdate_actual, edate_actual)
                today = get_wan_data(sensor_ping_id, sdate_hoy, edate_hoy)

                data_wan = {
                    "ip": ip_wan,
                    "sensor": sensor_name,
                    "last_uptime_days": last_month["uptime_days"],
                    "last_down_days": last_month["downtime_days"],
                    "last_uptime_percent": last_month["uptime_percent"],
                    "last_down_percent": last_month["downtime_percent"],
                    "current_uptime_percent": current_month["uptime_percent"],
                    "today_uptime_percent": today["uptime_percent"],
                    "status": device_status,
                }

                return data_wan

    except Exception as e:
        data_wan = {
            "ip": ip_wan,
            "sensor": "Error DevNet",
            "last_uptime_days": "Error DevNet",
            "last_down_days": "Error DevNet",
            "last_uptime_percent": 0.0,
            "last_down_percent": 0.0,
            "current_uptime_percent": 0.0,
            "today_uptime_percent": 0.0,
            "status": "Error DevNet",
        }
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            f"Error en la funcion get_prtg_data en el archivo api_prtg {ip_wan}"
        )
        return data_wan


# Extrae la informacion de PRTG respecto a los datos historicos entre dos fechas y horas
def get_wan_data(sensor_ping_id, sdate, edate):
    get_historicdata = os.getenv("URL_HISTORICDATA").format(
        id_ping=sensor_ping_id, sdate=sdate, edate=edate, username=PRTG_USERNAME, password=PRTG_PASSWORD
    )
    response_3 = requests.get(get_historicdata, verify=False)
    xml_content = response_3.content
    root = ET.fromstring(xml_content)

    # Función recursiva para convertir un elemento XML en un diccionario
    def xml_to_dict(element):
        if len(element) == 0:
            return element.text
        result = {}
        for child in element:
            child_data = xml_to_dict(child)
            if child.tag in result:
                if isinstance(result[child.tag], list):
                    result[child.tag].append(child_data)
                else:
                    result[child.tag] = [result[child.tag], child_data]
            else:
                result[child.tag] = child_data
        # print(result['uptimepercent'])
        return result

    xml_dict = xml_to_dict(root)

    uptime_percent = xml_dict.get("uptimepercent", "Not Found")
    downtime_percent = xml_dict.get("downtimepercent", "Not Found")
    uptime_days = xml_dict.get("uptime", "Not Found")
    downtime_days = xml_dict.get("downtime", "Not Found")

    try:
        uptime_days = " ".join(uptime_days.split())
        downtime_days = " ".join(downtime_days.split())

        uptime_percent = format_historic_data(uptime_percent)
        downtime_percent = format_historic_data(downtime_percent)

        data = {
            "uptime_days": uptime_days,
            "downtime_days": downtime_days,
            "uptime_percent": uptime_percent,
            "downtime_percent": downtime_percent,
        }
        return data

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            f"Error en la funcion get_wan_data en el archivo api_prtg {sensor_ping_id}"
        )
        data = {
            "uptime_days": uptime_days,
            "downtime_days": downtime_days,
            "uptime_percent": uptime_percent,
            "downtime_percent": downtime_percent,
        }
        return data
