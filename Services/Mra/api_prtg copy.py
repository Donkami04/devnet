import requests
import warnings
import os
import datetime
import time
import calendar
import mysql.connector
import logging
import traceback
import sched
from dotenv import load_dotenv


load_dotenv()
env = os.getenv("ENVIRONMENT")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_status_prtg(db_devnet_data):

    result = []

    try:
        for device in db_devnet_data:
            
            ip_device = device["ip_device"]
            api_endpoint = os.getenv("DATA_INTERFACE").format(
                ip_device, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            api_endpoint_ping = os.getenv("DATA_PING").format(
                ip_device, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )

            api_request = None
            if ("Ping" in device['sensor']):
                api_request = requests.get(api_endpoint_ping, verify=False).json()
            else:
                api_request = requests.get(api_endpoint, verify=False).json()
            api_response = api_request["sensors"]

            if api_response == []:
                logging.warning(f"Datos no encontrados para el ip {ip_device}")
                result.append(
                    {
                        "objid": ip_device,
                        "status": "Not Found",
                    }
                )
                continue

            for sensor in api_response:
                result.append(sensor)

        return result

    except Exception as e:
        result.append(
            {
                "objid": ip_device,
                "status": "Error PRTG",
            }
        )
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en el id {device}")
        logging.error(f"Error en la funcion `get_status_prtg` en el archivo `get_status_prtg`")
