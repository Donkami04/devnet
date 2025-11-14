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


def get_cisco_data(red, ip, cisco_id):
    """
    Obtiene datos de un dispositivo de Cisco utilizando la dirección IP y la red proporcionada.

    Esta función consulta la API de Cisco para obtener información detallada de un dispositivo,
    como el puerto, estado, dirección MAC, nombre del dispositivo y dirección IP del dispositivo.
    También consulta la API de PRTG para obtener el estado del dispositivo. Si no se puede obtener
    la información del dispositivo desde Cisco, intenta obtener los datos históricos a través de la
    función `get_historic_cisco_data`.

    Args:
        red (str): La red en la que se encuentra el dispositivo. Si es "IT", se asigna una red por defecto.
        ip (str): La dirección IP del dispositivo del cual se quiere obtener la información.

    Returns:
        dict: Diccionario con los datos del dispositivo Cisco y el estado correspondiente de PRTG.
              Contiene las siguientes claves:
              - 'cisco_port' (str): Puerto del dispositivo en Cisco.
              - 'cisco_status' (str): Estado actual del dispositivo en Cisco.
              - 'cisco_mac_address' (str): Dirección MAC del dispositivo.
              - 'cisco_device_name' (str): Nombre del dispositivo.
              - 'cisco_device_ip' (str): Dirección IP del dispositivo.
              - 'cisco_status_device' (str): Estado del dispositivo según PRTG.
              - 'data_backup' (bool): Indica si los datos provienen de un respaldo histórico.

    Errores:
        Si ocurre algún error en la consulta a la API de Cisco o PRTG, devuelve valores predeterminados
        con la etiqueta "Error Devnet" y registra los errores en el log.

    Raises:
        Registra errores utilizando logging cuando hay un fallo en la obtención de los datos.
    """

    cisco_data = {"data_backup": False}

    if red == "IT":
        red = "10.224.116.90"
    else:
        red = "10.224.241.14"

    try:
        cisco_id_device = cisco_id
        if cisco_id == "Not Found" or cisco_id is None:
            URL_CISCO_GET_ID = os.getenv("URL_CISCO_IP").format(
                red=red,
                ip=ip,
                cisco_username_2=CISCO_DEVICES_API_USERNAME_2,
                cisco_password=CISCO_API_PASSWORD,
            )
            response_cisco_get_id = requests.get(URL_CISCO_GET_ID, verify=False).json()
            cisco_id_device = (
                response_cisco_get_id.get("queryResponse", {"queryResponse": "Not Found"})
                .get("entityId", [{}])[0]
                .get("$", "Not Found")
            )
        if cisco_id_device == "Not Found":
            cisco_data = get_historic_cisco_data(ip)
            cisco_data["cisco_id"] = cisco_id_device
            return cisco_data
        else:
            URL_CISCO_ID = os.getenv("URL_CISCO_ID").format(
                red=red,
                cisco_id_device=cisco_id_device,
                cisco_username_1=CISCO_DEVICES_API_USERNAME_1,
                cisco_password=CISCO_API_PASSWORD,
            )
            cisco_client_response = requests.get(URL_CISCO_ID, verify=False).json()
            cisco_client_data = (
                cisco_client_response.get(
                    "queryResponse", {"queryResponse": "Not Found"}
                )
                .get("entity", [{}])[0]
                .get("clientsDTO", "Not Found")
            )

            if cisco_client_data == "Not Found":
                cisco_data = get_historic_cisco_data(ip)
                cisco_data["cisco_id"] = cisco_id_device
                return cisco_data

            cisco_data["cisco_port"] = cisco_client_data["clientInterface"]
            cisco_data["cisco_status"] = cisco_client_data["status"]
            cisco_data["cisco_mac_address"] = cisco_client_data["macAddress"]["octets"]
            cisco_data["cisco_device_name"] = cisco_client_data["deviceName"]
            cisco_data["cisco_device_ip"] = cisco_client_data["deviceIpAddress"][
                "address"
            ]
            cisco_data["cisco_id"] = cisco_id_device

            # ? Obtencion del estado del sensor ping en PRTG correspondiente al deviceIpAdress
            prtg_device_ip_url = os.getenv("URL_PRTG_IP").format(
                ip=cisco_data["cisco_device_ip"],
                username=PRTG_USERNAME,
                password=PRTG_PASSWORD,
            )
            prtg_device_ip_response = requests.get(
                prtg_device_ip_url, verify=False
            ).json()
            if prtg_device_ip_response["treesize"] == 0:
                cisco_data["cisco_status_device"] = "Not Found"

            else:
                prtg_device_id = prtg_device_ip_response["devices"][0]["objid"]
                prtg_device_id_url = os.getenv("URL_PRTG_ID").format(
                    id_device=prtg_device_id,
                    username=PRTG_USERNAME,
                    password=PRTG_PASSWORD,
                )
                prtg_device_status_response = requests.get(
                    prtg_device_id_url, verify=False
                ).json()
                cisco_data["cisco_status_device"] = prtg_device_status_response[
                    "sensors"
                ][0]["status"]
            return cisco_data

    except Exception as e:
        cisco_data = {
            "cisco_device_ip": "Error Devnet",
            "cisco_device_name": "Error Devnet",
            "cisco_port": "Error Devnet",
            "cisco_status": "Error Devnet",
            "cisco_status_device": "Error Devnet",
            "cisco_mac_address": "Error Devnet",
            "data_backup": False,
        }
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en la funcion `get_cisco_data` del archivo `api_cisco`")
        logging.error(f"Ip del emento que causo el error {ip}")
        return cisco_data
