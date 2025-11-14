import logger_config
import requests
import os
import traceback
import logging
import re
import xmltodict
from datetime import datetime, timedelta
from dotenv import load_dotenv


load_dotenv()
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_prtg_id(ip):
    """
    Obtiene el ID de un dispositivo en PRTG basado en su dirección IP.

    Esta función realiza una solicitud HTTP a la API de PRTG para obtener el ID del 
    dispositivo correspondiente a la dirección IP proporcionada. Si el dispositivo no se 
    encuentra, devuelve "Not Found". En caso de error, devuelve "Error DevNet" y registra 
    la excepción en los logs.

    Args:
        ip (str): Dirección IP del dispositivo a consultar.

    Returns:
        str: ID del dispositivo en PRTG, "Not Found" si no se encuentra, o "Error DevNet" 
        en caso de error.
    """
    try:
        url_prtg_ip = os.getenv("URL_GET_ID_PING").format(
            ip_host=ip, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )
        prtg_response = requests.get(url_prtg_ip, verify=False).json()

        if len(prtg_response["devices"]) == 0:
            return "Not Found"
        else:
            deviceId_prtg = prtg_response["devices"][0]["objid"]
            return deviceId_prtg

    except Exception as e:
        deviceId_prtg = "Error DevNet"
        logging.error(traceback.format_exc())
        logging.error(f"Error con el Cliente {ip}")
        logging.error(e)
        logging.error("Error en la funcion `get_prtg_id` del archivo `api_prtg`")
        return deviceId_prtg


def get_prtg_ValueLastUpDown(deviceId_prtg):
    """
    Obtiene el lastvalue, lastdown y lastup de un dispositivo en PRTG.

    Esta función realiza una solicitud HTTP a la API de PRTG para obtener los datos del 
    sensor asociado con el ID del dispositivo proporcionado. Si no se encuentra el sensor, 
    devuelve "Not Found". En caso de error, devuelve "Error DevNet" y registra la excepción 
    en los logs.

    Args:
        deviceId_prtg (str): ID del dispositivo en PRTG.

    Returns:
        tuple: Una tupla que contiene el ID del sensor, el último valor del ping, el 
        último 'up' y el último 'down'. Si no se encuentra el sensor, o en caso de error, 
        devuelve "Not Found" o "Error DevNet" respectivamente en cada campo.
    """
    try:
        # Si no hay id_prtg no se puede obtener la informacion necesaria
        sensorData_prtg_url = os.getenv("URL_GET_LAST_DATA_PING").format(
            id_ping=deviceId_prtg, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )
        sensorData_prtg_url_response = requests.get(
            sensorData_prtg_url, verify=False
        ).json()

        if sensorData_prtg_url_response["sensors"] == []:
            sensorId = "Not Found"
            last_value_ping = "Not Found"
            last_up_ping = "Not Found"
            last_down_ping = "Not Found"
            return sensorId, last_value_ping, last_up_ping, last_down_ping

        else:
            data = sensorData_prtg_url_response["sensors"][0]
            last_up_prtg = data["lastup"]
            last_down_prtg = data["lastdown"]

            # Formatear el last_up y last_down
            patron = re.compile(r"<.*?>")

            sensorId = data["objid"]
            last_value_ping = data["lastvalue"]
            last_up_ping = re.sub(patron, "", last_up_prtg)
            last_down_ping = re.sub(patron, "", last_down_prtg)

            return sensorId, last_value_ping, last_up_ping, last_down_ping

    except Exception as e:
        sensorId = "Error DevNet"
        last_value_ping = "Error DevNet"
        last_up_ping = "Error DevNet"
        last_down_ping = "Error DevNet"
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en la funcion `get_prtg_ValueLastUpDown` del archivo `api_prtg`")
        return sensorId, last_value_ping, last_up_ping, last_down_ping


def get_pingData(sensorId):
    """
    Obtiene datos de ping (promedio, mínimo, máximo y pérdida de paquetes) de un sensor PRTG.

    Esta función realiza una solicitud HTTP a la API de PRTG para obtener los datos históricos 
    de ping de un sensor específico en un intervalo de 30 minutos. Si los datos no están 
    disponibles, devuelve "Error DevNet" en cada campo. En caso de error, también devuelve 
    "Error DevNet" y registra la excepción en los logs.

    Args:
        sensorId (str): ID del sensor PRTG.

    Returns:
        tuple: Una tupla que contiene el ping promedio, mínimo, máximo y la pérdida de paquetes. 
        En caso de error o si no se encuentran los datos, devuelve "Error DevNet" en cada campo.
    """
    try:
        edate = datetime.today()
        sdate = datetime.today() - timedelta(minutes=30)
        edate = edate.strftime("%Y-%m-%d-%H-%M-%S")
        sdate = sdate.strftime("%Y-%m-%d-%H-%M-%S")

        URL_GET_DATA_PING = os.getenv("URL_GET_DATA_PING").format(
            objid=sensorId,
            sdate=sdate,
            edate=edate,
            username=PRTG_USERNAME,
            password=PRTG_PASSWORD,
        )

        data_ping = requests.get(URL_GET_DATA_PING, verify=False)
        data_ping = xmltodict.parse(data_ping.text)
        print(data_ping)
        prtg_error = data_ping.get("prtg", None)
        if prtg_error and "error" in prtg_error:
            avg_ping = "Not Found"
            min_ping = "Not Found"
            max_ping = "Not Found"
            packet_loss = "Not Found"
            return avg_ping, min_ping, max_ping, packet_loss
        
        data_ping = data_ping["histdata"]["item"]["value"]  #! Se agrega la posicion [0] para la version 1 de PRTG

        avg_ping = data_ping[0].get("#text", "Not Found")
        min_ping = data_ping[1].get("#text", "Not Found")
        max_ping = data_ping[2].get("#text", "Not Found")
        packet_loss = data_ping[3].get("#text", "Not Found")
        
        return avg_ping, min_ping, max_ping, packet_loss

    except Exception as e:
        avg_ping = "Error DevNet"
        min_ping = "Error DevNet"
        max_ping = "Error DevNet"
        packet_loss = "Error DevNet"
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en la funcion `get_pingData` del archivo `api_prtg`")
        return avg_ping, min_ping, max_ping, packet_loss
    
    
    
# print(get_pingData("13591"))
# print(get_pingData("13605"))
# print(get_prtg_ValueLastUpDown("13604"))