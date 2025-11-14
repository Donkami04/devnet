import logger_config
import requests
import os
import traceback
import logging
import re
from dotenv import load_dotenv
from db_get_data import get_historic_cisco_data

load_dotenv()
CISCO_DEVICES_API_USERNAME_1 = os.getenv("CISCO_DEVICES_API_USERNAME_1")
CISCO_DEVICES_API_USERNAME_2 = os.getenv("CISCO_DEVICES_API_USERNAME_2")
CISCO_API_PASSWORD = os.getenv("CISCO_API_PASSWORD")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_cisco_data(ip):
    # Función encargada de obtener los datos de CISCO y guardarlos en una variable.
    try:
        URL_CISCO_IP_DEVICE = os.getenv("URL_CISCO_IP_DEVICE").format(
            ip=ip,
            cisco_username_1=CISCO_DEVICES_API_USERNAME_1,
            cisco_password=CISCO_API_PASSWORD,
        )
        cisco_ip_response = requests.get(URL_CISCO_IP_DEVICE, verify=False).json()
        if cisco_ip_response["queryResponse"]["@count"] == 0:
            return "Not Found"

        else:
            cisco_id_client = (
                cisco_ip_response.get("queryResponse", "Not Found")
                .get("entityId", [])[0]
                .get("$", "Not Found")
            )
            URL_CISCO_ID_DEVICE = os.getenv("URL_CISCO_ID_DEVICE").format(
                id_device=cisco_id_client,
                cisco_username_2=CISCO_DEVICES_API_USERNAME_2,
                cisco_password=CISCO_API_PASSWORD,
            )
            cisco_data_device = requests.get(URL_CISCO_ID_DEVICE, verify=False).json()
            status_cisco_device = (
                cisco_data_device.get("queryResponse", "Not Found")
                .get("entity", [])[0]
                .get("devicesDTO", "Not Found")
                .get("reachability", "Not Found")
            )
            return status_cisco_device

    except Exception as e:
        logging.error(f"Error con el IP en Funcion 'get_cisco_data' {ip}")
        logging.error(traceback.format_exc())
        logging.error(e)
        return "Not Found"
