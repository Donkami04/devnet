import logger_config
import requests
import os
import traceback
import logging
import re
from dotenv import load_dotenv

load_dotenv()
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_prtg_data(ip, prtg_id):
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
    prtg_data = {
        "prtg_name_device": "Not Found",
        "prtg_id": "Not Found",
        "prtg_sensorname": "Not Found",
        "prtg_status": "Not Found",
        "prtg_lastup": "Not Found",
        "prtg_lastdown": "Not Found",
    }
    sensor_id = prtg_id
    try:
        if prtg_id == "Not Found" or prtg_id == None or prtg_id == "Error DevNet":
            URL_PRTG_GET_ID = os.getenv("URL_PRTG_IP").format(
                ip=ip, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            response_prtg_get_id = requests.get(URL_PRTG_GET_ID, verify=False).json()
            if len(response_prtg_get_id["devices"]) == 0:
                return prtg_data
            else:
                sensor_id = response_prtg_get_id["devices"][0]["objid"]

        # prtg_id = response_prtg_get_id["devices"][0]["objid"]
        URL_PRTG_GET_DATA = os.getenv("URL_PRTG_ID").format(id_device=sensor_id, username=PRTG_USERNAME, password=PRTG_PASSWORD)
        response_prtg_data = requests.get(URL_PRTG_GET_DATA, verify=False).json()
        try:
            sensor = response_prtg_data["sensors"][0]
            prtg_data["prtg_id"] = sensor_id
            prtg_data["prtg_name_device"] = sensor.get("name", "Not Found")
            prtg_data["prtg_sensorname"] = sensor.get("device", "Not Found")
            prtg_data["prtg_status"] = sensor.get("status", "Not Found")
            prtg_data["prtg_lastup"] = re.sub(
                re.compile(r"<.*?>"), "", sensor.get("lastup", "Not Found")
            )
            prtg_data["prtg_lastdown"] = re.sub(
                re.compile(r"<.*?>"), "", sensor.get("lastdown", "Not Found")
            )
            return prtg_data

        except:
            prtg_data["prtg_id"] = prtg_id
            return prtg_data

    except Exception as e:
        prtg_data = {
            "prtg_id": "Error DevNet",
            "prtg_sensorname": "Error DevNet",
            "prtg_name_device": "Error DevNet",
            "prtg_status": "Error DevNet",
            "prtg_lastup": "Error DevNet",
            "prtg_lastdown": "Error DevNet",
        }
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en la funcion get_prtg_data en el archivo api_prtg{ip}")
        return prtg_data
