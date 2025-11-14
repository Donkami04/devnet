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
    """
    Obtiene el estado de un dispositivo en PRTG a partir de su dirección IP.

    La función hace una petición a la API de PRTG para obtener el ID del dispositivo asociado a la IP proporcionada. Luego,
    con ese ID, realiza otra petición para obtener el estado del sensor PRTG asociado al dispositivo. Si no se encuentra
    información relevante, retorna 'Not Found'. En caso de error, registra los detalles del error y retorna 'Error DevNet'.

    Args:
        ip (str): La dirección IP del dispositivo del que se desea obtener información en PRTG.

    Returns:
        str: El estado del sensor PRTG asociado al dispositivo, 'Not Found' si no se encuentra información, o 'Error DevNet'
             si ocurre algún error durante la ejecución.
    
    Raises:
        Exception: En caso de que ocurra algún error al hacer las peticiones HTTP a la API de PRTG, se registra el error en el log.
    """
    try:

        URL_PRTG_GET_ID = os.getenv("URL_PRTG_IP").format(
            ip=ip, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )
        response_prtg_get_id = requests.get(URL_PRTG_GET_ID, verify=False).json()
        if len(response_prtg_get_id["devices"]) == 0:
            return "Not Found"

        else:
            prtg_id = response_prtg_get_id["devices"][0]["objid"]
            URL_PRTG_GET_DATA = os.getenv("URL_PRTG_ID").format(
                id_device=prtg_id, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            response_prtg_data = requests.get(URL_PRTG_GET_DATA, verify=False).json()

            sensor = response_prtg_data["sensors"]
            if sensor == []:
                return "Not Found"

            status = sensor[0].get("status", "Not Found")
            return status

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en la funcion get_prtg_data en el archivo api_prtg: {ip}")
        return ("Error DevNet",)


# get_prtg_data("181.212.121.91")
