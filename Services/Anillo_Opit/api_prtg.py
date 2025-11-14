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


def get_status_prtg(idList):

    result = []

    try:
        for id_device in idList:
            logging.info(f"Obteniendo datos del interface {id_device} de PRTG")
            api_endpoint = os.getenv("DATA_INTERFACE").format(
                id_device=id_device, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            api_request = requests.get(api_endpoint, verify=False).json()
            api_response = api_request["sensors"]

            if api_response == []:
                logging.warning(f"Datos no encontrados para el interface {id_device}")
                result.append(
                    {
                        "id": id_device,
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
                "id": id_device,
                "status": "Error PRTG",
            }
        )
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en el id {id_device}")
        logging.error(f"Error en la funcion `get_status_prtg` en el archivo `get_status_prtg`")


def get_status_prtg_ping_sensors(idList):

    result = []

    try:
        for id_device in idList:
            logging.info(f"Obteniendo datos del sensor de ping {id_device} de PRTG")
            api_endpoint = os.getenv("STATUS_PING_SENSOR").format(
                id_device=id_device, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            api_request = requests.get(api_endpoint, verify=False).json()
            api_response = api_request["sensors"]

            if api_response == []:
                logging.warning(f"Datos no encontrados para el sensor con id {id_device}")
                result.append(
                    {
                        "id": id_device,
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
                "id": id_device,
                "status": "Error PRTG",
            }
        )
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en el id {id_device}")
        logging.error(
            f"Error en la funcion `get_status_prtg` en el archivo `get_status_prtg`"
        )
