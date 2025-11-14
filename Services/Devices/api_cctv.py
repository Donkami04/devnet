import logger_config
import requests
import os
import traceback
import logging
import re
from requests.exceptions import Timeout
from dotenv import load_dotenv

load_dotenv()
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_cctv_data():
    """
    Obtiene datos de múltiples servidores CCTV utilizando solicitudes HTTP.

    Esta función recopila datos de una lista predefinida de servidores CCTV enviando
    solicitudes GET al punto de acceso de la API de cada servidor. Las solicitudes son
    autenticadas utilizando credenciales obtenidas de las variables de entorno `CCTV_USER`
    y `CCT_PASS`. Si un servidor no responde debido a un tiempo de espera, la función registra
    el error y continúa con el siguiente servidor.

    Retorna:
        list: Una lista que contiene los datos agregados de todos los servidores CCTV.

    Variables de Entorno:
        CCTV_USER (str): Nombre de usuario para la autenticación en los servidores CCTV.
        CCT_PASS (str): Contraseña para la autenticación en los servidores CCTV.
        CCTV_BASE_URL (str): URL base de la API del CCTV, debe incluir un marcador `{ip_server}`
                             que será reemplazado por la dirección IP de cada servidor.

    Excepciones:
        Exception: Si ocurre un error desconocido al comunicarse con alguno de los servidores.
    
    Logs:
        Registra los errores de tiempo de espera y cualquier error inesperado al consultar los servidores CCTV.
    """
    try:
        USERNAME_CCTV = os.getenv("CCTV_USER")
        PASSWORD_CCTV = os.getenv("CCT_PASS")
        auth = (USERNAME_CCTV, PASSWORD_CCTV)

        cctv_list_servers = [
            "10.225.0.253",
            "10.231.0.253",
            "10.225.11.253",
            "10.231.10.253",
            "10.224.116.199",
        ]
        cctv_data = []

        for ip in cctv_list_servers:
            try:
                CCTV_API = os.getenv("CCTV_BASE_URL").format(ip_server=ip)
                cctv_response = requests.get(CCTV_API, auth=auth, timeout=10).json()
                data = cctv_response["data"]
                cctv_data.extend(data)

            except Timeout:
                logging.error(f"El servidor CCTV {ip} no responde: Time Out")
                continue
            
        return cctv_data

    except Exception as e:
        logging.error(f"Ocurrió un error desconocido con el sevidor CCTV {ip}: {e}")


def set_cctv_status(ip, cctv_data):
    """
    Obtiene el estado de una CCTV (cámara de seguridad) basada en la dirección IP.

    Esta función busca en una lista de datos de CCTV el estado asociado a una cámara específica, utilizando
    su dirección IP como referencia. Devuelve un diccionario con el estado de "enabled" (habilitada) y "valid" (válida)
    de la cámara si la encuentra. Si no se encuentra, retorna "Not Found" o "Error CCTV" en caso de fallos.

    Args:
        ip (str): Dirección IP de la cámara CCTV a buscar.
        cctv_data (list): Lista de diccionarios que contienen la información de las cámaras CCTV. Cada diccionario debe tener
                          una clave "url" para la IP y otra clave "status" que incluye "enabled" y "valid".

    Returns:
        dict: Diccionario con las claves 'cctv_enabled' y 'cctv_valid', que representan el estado de la cámara.
              Si no se encuentra la IP o hay un error, retorna valores predeterminados como "Not Found" o "Error CCTV".
    """
    cctv_enabled = "Not Found"
    cctv_valid = "Not Found"
    for data in cctv_data:
        if data["url"] == ip:
            cctv_enabled = data.get("status", "Error CCTV").get(
                "enabled", "Error CCTV"
            )
            cctv_valid = data.get("status", "Error CCTV").get("valid", "Error CCTV")
            
    finalData = {
        'cctv_enabled': cctv_enabled,
        'cctv_valid': cctv_valid,
    }
            
    return finalData