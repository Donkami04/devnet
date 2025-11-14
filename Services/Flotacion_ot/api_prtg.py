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


def get_status_prtg(data):

    result = []

    try:
        for elem in data:
            ip = elem["ip"]
            logging.info(f"Obteniendo datos del {ip}")
            api_getId_device = os.getenv("GET_ID_DEVICE").format(ip_device=ip, username=PRTG_USERNAME, password=PRTG_PASSWORD)
            api_getId_device_request = requests.get(api_getId_device, verify=False).json()
            devices = api_getId_device_request["devices"]

            if devices == []:
                logging.warning(f"Datos no encontrados para el IP {ip}")
                result.append(
                    {
                        "ip": ip,
                        "status": "Not Found",
                    }
                )
                continue

            device_id = devices[0]["objid"]

            api_getSensors_status = os.getenv("GET_SENSORS_STATUS").format(device_id=device_id, username=PRTG_USERNAME, password=PRTG_PASSWORD)
            api_getSensors_status_request = requests.get(
                api_getSensors_status, verify=False
            ).json()

            sensors = api_getSensors_status_request["sensors"]
            if sensors == []:
                logging.warning(f"Datos no encontrados para el IP {ip} con id {device_id}")
                result.append(
                    {
                        "ip": ip,
                        "status": "Not Found",
                    }
                )
                continue

            for sensor in sensors:
                result.append(sensor)
                
        return result

    except Exception as e:
        result.append(
            {
                "ip": ip,
                "status": "Error PRTG",
            }
        )
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en el ip {ip}")
        logging.error(f"Error en la funcion `get_status_prtg` en el archivo `get_status_prtg`")
