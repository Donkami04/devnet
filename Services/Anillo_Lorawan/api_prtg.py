import requests
import os
import logging
import traceback
from dotenv import load_dotenv


load_dotenv()
env = os.getenv("ENVIRONMENT")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_status_prtg(sensorsList):

    result = []
    ipListWithInterfaces = [
        "10.224.114.85",
        "10.224.114.82",
        "10.224.114.102",
        "10.230.112.31",
    ]

    try:
        for sensor in sensorsList:
            logging.info(f"Obteniendo datos del {sensor['device']} - {sensor['ip_device']}")
            api_endpoint = ""
            id_device = sensor["id_device"]
            
            if sensor["ip_device"] not in ipListWithInterfaces:
                api_endpoint = os.getenv("DATA_PING").format(id_device=id_device, username=PRTG_USERNAME, password=PRTG_PASSWORD)
            else:
                api_endpoint = os.getenv("DATA_INTERFACE").format(id_device=id_device, username=PRTG_USERNAME, password=PRTG_PASSWORD)
                

            api_request = requests.get(api_endpoint, verify=False).json()
            api_response = api_request["sensors"]

            if api_response == []:
                logging.warning(f"Datos no encontrados para el id {id_device}")
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