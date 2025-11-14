import re
import os
import logging
import traceback
import logger_config
from netmiko import ConnectHandler
from dotenv import load_dotenv


def get_data_controladora(device_ip):
    """
    Obtiene datos detallados de un cliente inalámbrico conectado a una controladora Cisco.

    Args:
        device_ip (str): La dirección IP del dispositivo inalámbrico.

    Returns:
        dict: Un diccionario con información del dispositivo.
    """

    load_dotenv()
    USERNAME = os.getenv("NETMIKO_USERNAME")
    PASSWORD = os.getenv("NETMIKO_PASSWORD")
    IP_CONTROLADORA = os.getenv("IP_CONTROLADORA")

    UserName = USERNAME
    Password = PASSWORD
    host = IP_CONTROLADORA  # IP controladora

    network_device_list = {
        "host": host,
        "username": UserName,
        "password": Password,
        "device_type": "cisco_wlc_ssh",
        "timeout": 30,
    }

    max_retries = 3  # Número máximo de reintentos
    for attempt in range(max_retries):
        logging.info(
            f"Intento {attempt + 1} de {max_retries} para extraer datos de la controladora {device_ip}"
        )
        try:
            net_connect = ConnectHandler(**network_device_list)

            data_pala = net_connect.send_command(
                f"sh wireless client summary detail ipv4 | inc {device_ip}"
            )  # IP Pala
            if not data_pala.strip():  # Comprobar si no se obtuvo salida
                raise ValueError(
                    "No se encontró la dirección IP en la salida del comando."
                )

            output = net_connect.send_command(
                "sh wireless client mac-address " + data_pala.split()[0] + " detail"
            )
            if not output.strip():  # Comprobar si no se obtuvo salida
                raise ValueError("No se pudo obtener detalles del cliente.")

            signal_strength_pattern = (
                r"Radio Signal Strength Indicator\s*:\s*(-?\d+)\s+dBm"
            )
            signal_noise_pattern = r"Signal to Noise Ratio\s*:\s*(-?\d+)\s+dB"
            connected_for_pattern = r"Connected For\s*:\s*(\d+)\s+seconds"
            ap_name_pattern = r"AP Name\s*:\s*(.*)"

            signal_strength = re.search(signal_strength_pattern, output)
            signal_noise_match = re.search(signal_noise_pattern, output)
            connected_for_match = re.search(connected_for_pattern, output)
            ap_name = re.search(ap_name_pattern, output)

            if not (
                signal_strength
                and signal_noise_match
                and connected_for_match
                and ap_name
            ):
                raise ValueError("Patrón no detectado en la salida.")

            signal_strength = signal_strength.group(1) + " dBm"
            signal_noise = signal_noise_match.group(1) + " dB"
            ap_name = ap_name.group(1)
            connected_for = int(connected_for_match.group(1)) // 60
            connected_for = str(connected_for) + " Min"

            snr_output = net_connect.send_command(
                f"show ap name {ap_name} mesh neighbor | in PARENT"
            )
            snr_level = snr_output.split()[3] if len(snr_output.split()) > 3 else "N/A"

            net_connect.disconnect()

            netmiko_data = {
                "signal_strength": signal_strength,
                "signal_noise": signal_noise,
                "connected_for": connected_for,
                "ap_name": ap_name,
                "snr_level": snr_level,
            }

            return netmiko_data

        except Exception as e:
            logging.error(
                f"Error Controladora Device {device_ip} en el intento {attempt + 1}: {e}"
            )
            logging.error(traceback.format_exc())
            logging.error(
                "Error en la funcion `get_data_controladora` del archivo `controladora`"
            )
            if attempt < max_retries - 1:  # Si no es el último intento, desconectamos
                try:
                    net_connect.disconnect()
                except Exception:
                    pass  # Ignorar errores en la desconexión
            else:
                # Si hemos agotado los intentos, devolvemos datos de error
                net_connect.disconnect()
                return {
                    "signal_strength": "Not Found",
                    "signal_noise": "Not Found",
                    "connected_for": "Not Found",
                    "ap_name": "Not Found",
                    "snr_level": "Not Found",
                }
