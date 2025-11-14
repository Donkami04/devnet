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


def get_prtg_data(ip):
    # Función encargada de obtener los datos de PRTG y guardarlos en una variable.
    # Inicializamos la variable como Not Found en caso de no recibir data de la API.
    prtg_data = {
        "status_prtg": "Not Found",
        "lastup_prtg": "Not Found",
        "lastdown_prtg": "Not Found",
    }

    try:
        URL_PRTG_IP = os.getenv("URL_PRTG_IP").format(
            ip=ip, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )
        prtg_ip_response = requests.get(URL_PRTG_IP, verify=False).json()

        if len(prtg_ip_response["devices"]) == 0:
            return prtg_data
        else:
            id_device_prtg = prtg_ip_response["devices"][0]["objid"]
            URL_PRTG_ID = os.getenv("URL_PRTG_ID").format(
                id_device=id_device_prtg, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            prtg_data_response = requests.get(URL_PRTG_ID, verify=False).json()
            sensor = prtg_data_response["sensors"][0]
            status = sensor["status"]
            last_up = sensor["lastup"]
            last_down = sensor["lastdown"]

            patron = re.compile(
                r"<.*?>"
            )  # Se usa para formatear el last_up y last_down
            last_up = re.sub(patron, "", last_up)
            last_down = re.sub(patron, "", last_down)

            prtg_data["status_prtg"] = status
            prtg_data["lastup_prtg"] = last_up
            prtg_data["lastdown_prtg"] = last_down

            return prtg_data

    except Exception as e:
        logging.error(f"Error con el IP en Funcion 'get_prtg_data'  {ip}")
        logging.error(traceback.format_exc())
        logging.error(e)
        prtg_data = {
            "name": "Error DevNet",
            "status_prtg": "Error DevNet",
            "lastup_prtg": "Error DevNet",
            "lastdown_prtg": "Error DevNet",
        }
        return prtg_data
