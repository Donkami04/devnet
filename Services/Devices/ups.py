import requests
import os
import traceback
import logging
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s: %(message)s"
)
file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s: %(message)s"))
logging.getLogger().addHandler(file_handler)

load_dotenv()
env = os.getenv("ENVIRONMENT")

if env == "production":
    api_env = "10.224.116.14"
if env == "development":
    api_env = "10.224.116.78"
if env != "production" and env != "development":
    api_env = "localhost"
    

def define_ups_status(sw_name):
    try:
        # logging.info("Iniciando actualizacion del estado de UPS para cada dispositivo")
        # Obtenemos los datos actualizados de los Dispositivos y UPS de la API DevNet
        ups_list = get_api_ups_data()

        if ups_list == None:
            raise ValueError("Error al obtener la información de la API")

        ups_status = 0  # Inicializamos la llave 'ups_status'
        if (
            ".lundinmining.local" in sw_name
        ):  # Eliminamos el dominio lundin para la comparativa de nombres
            sw_name = sw_name.replace(".lundinmining.local", "")

        for ups in ups_list:
            # Obtenemos el nombre de la UPS
            name_ups = ups["name"]
            # Comparamos el nombre de la UPS con el nombre del SW del Dispositivo
            # Para poder comparar agregamos la terminacion "-APC"
            if name_ups.upper() == f"{sw_name.upper()}-APC":
                ups_status = ups[
                    "status_ups"
                ]  # Asignamos el estado de la UPS al dispositivo

        # logging.info("Se ha actualizado el estado de las UPS correctamente")

        return ups_status

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(f"Hubo un error en la funcion `define_ups_status`: {e}")
        return None


def get_api_ups_data():
    # * Realiza la peticion a la API DevNet para obtener informacion de las UPS
    try:
        API_UPS = os.getenv("API_UPS").format(env=api_env)
        response = requests.get(API_UPS, verify=False).json()
        data_ups = response["data"]
        return data_ups

    except Exception as e:
        logging.error("Error al obtener la informacion de las UPS desde la API")
        logging.error(traceback.format_exc())
        logging.error("Error detallado:")
        logging.error(e)
        return None


def get_api_devices_data():
    # * Realiza la peticion a la API DevNet para obtener informacion de los dispositivos

    try:
        API_DEVICES = os.getenv("API_DEVICES").format(env=api_env)
        data_devices = requests.get(API_DEVICES, verify=False).json()
        return data_devices

    except Exception as e:
        logging.error(
            "Error al obtener la informacion de los DISPOSITIVOS desde la API"
        )
        logging.error(traceback.format_exc())
        logging.error("Error detallado:")
        logging.error(e)
        return None

