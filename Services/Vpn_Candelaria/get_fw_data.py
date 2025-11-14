import logging
import logger_config
import os
import traceback
from netmiko import ConnectHandler
from dotenv import load_dotenv


def get_users_data(host):
    """
    Obtiene los datos de los usuarios conectados a través de VPN SSL en un dispositivo Fortinet.

    Esta función se conecta a un dispositivo de red Fortinet utilizando SSH a través de la biblioteca Netmiko.
    Luego, ejecuta un comando para listar las sesiones de túnel de VPN SSL y devuelve el resultado.

    Args:
        host (str): La dirección IP o el nombre de host del dispositivo Fortinet al que se va a conectar.

    Returns:
        str: La salida del comando `execute vpn sslvpn list tunnel`, que contiene la lista de túneles de VPN SSL.
        Si ocurre un error, devuelve `None`.

    Raises:
        None: Los errores son capturados y registrados en los logs.

    Notes:
        - Las credenciales de autenticación (usuario y contraseña) se cargan desde las variables de entorno `NETMIKO_USER` y `NETMIKO_PASSWORD`.
        - Utiliza el puerto 2221 para la conexión SSH.
        - El comando ejecutado es específico para dispositivos Fortinet.
        - Los errores se registran utilizando el módulo `logging`.
    """
    try:
        load_dotenv()
        USER = os.getenv('NETMIKO_USER')
        PASSWORD = os.getenv('NETMIKO_PASSWORD')

        network_device_list = {
            "host": host,
            "username": USER,
            "password": PASSWORD,
            "device_type": "fortinet",
            "port": 2221,
            "timeout": 180,
        }

        net_connect = ConnectHandler(**network_device_list)
        output = net_connect.send_command("execute vpn sslvpn list tunnel")
        net_connect.disconnect()
        output = output.split("\n", 2)[2]
        print(output)
        print("######")
        return output
    
    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `get_users_data` en el archivo `get_fw_data`"
        )
        logging.error(e)
        return None
    
get_users_data("10.224.126.89")