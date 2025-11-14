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

    La función se conecta a una controladora inalámbrica Cisco utilizando SSH mediante Netmiko,
    y obtiene información detallada sobre un dispositivo específico identificado por su dirección IP.
    Los datos extraídos incluyen la intensidad de la señal, la relación señal/ruido (SNR), el tiempo
    de conexión, el nombre del punto de acceso al que está conectado, y el nivel SNR del enlace mesh.

    Args:
        device_ip (str): La dirección IP del dispositivo inalámbrico del cual se desea obtener la información.

    Returns:
        dict: Un diccionario con los siguientes campos:
            - 'signal_strength' (str): Intensidad de la señal en dBm.
            - 'signal_noise' (str): Relación señal/ruido en dB.
            - 'connected_for' (str): Tiempo de conexión en minutos.
            - 'ap_name' (str): Nombre del punto de acceso al que está conectado el dispositivo.
            - 'snr_level' (str): Nivel SNR del enlace mesh. Devuelve 'N/A' si no se encuentra.
        
        Si ocurre un error durante la ejecución, los valores serán 'Not Found'.
    """
    
    load_dotenv()
    USERNAME = os.getenv('NETMIKO_USERNAME')
    PASSWORD = os.getenv('NETMIKO_PASSWORD')
    IP_CONTROLADORA = os.getenv('IP_CONTROLADORA')
    
    UserName = USERNAME
    Password = PASSWORD
    host = IP_CONTROLADORA #! Ip controladora

    network_device_list = {
        "host": host,
        "username": UserName,
        "password": Password,
        "device_type": "cisco_wlc_ssh",
        "timeout": 4960,
    }

    net_connect = ConnectHandler(**network_device_list)
    
    try:
        
        data_pala = net_connect.send_command(f"sh wireless client summary detail ipv4 | inc {device_ip}") #! Ip Pala
        # logging.info(f"OUTPUT: sh wireless client summary detail ipv4 | inc {device_ip}: {data_pala}")
        
        output = net_connect.send_command("sh wireless client mac-address " + data_pala.split()[0] + " detail")
        # logging.info(f"OUTPUT: sh wireless client mac-address {data_pala.split()[0]}")
        # logging.info(f"detail: {output}")

        signal_strength_pattern = r"Radio Signal Strength Indicator\s*:\s*(-?\d+)\s+dBm"
        signal_noise_pattern = r"Signal to Noise Ratio\s*:\s*(-?\d+)\s+dB"
        connected_for_pattern = r"Connected For\s*:\s*(\d+)\s+seconds"
        ap_name_pattern = r"AP Name\s*:\s*(.*)"

        
        signal_strength = re.search(signal_strength_pattern, output)
        signal_noise_match = re.search(signal_noise_pattern, output)
        connected_for_match = re.search(connected_for_pattern, output)
        ap_name = re.search(ap_name_pattern, output)
        
        signal_strength = signal_strength.group(1) + " dBm"
        signal_noise = signal_noise_match.group(1) + " dB"
        ap_name = ap_name.group(1)
        connected_for = connected_for_match.group(1)
        connected_for = int(connected_for)//60
        connected_for = str(connected_for) + " Min"

        snr_output = net_connect.send_command(f"show ap name {ap_name} mesh neighbor | in PARENT")
        try:
            snr_level = snr_output.split()[3]
        except Exception:
            snr_level = 'N/A'

        netmiko_data = {
            'signal_strength': signal_strength,
            'signal_noise': signal_noise,
            'connected_for': connected_for,
            'ap_name': ap_name,
            'snr_level': snr_level
        }

        net_connect.disconnect()
        # print(netmiko_data)
        return netmiko_data

    except Exception as e:
        logging.error(f"Error Controladora Device {device_ip}")
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en la funcion `get_data_controladora` del archivo `controladora`")
        net_connect.disconnect()
        netmiko_data = {
            'signal_strength': 'Not Found',
            'signal_noise': 'Not Found',
            'connected_for': 'Not Found',
            'ap_name': 'Not Found',
            'snr_level': 'Not Found'
        }

        return netmiko_data

print(get_data_controladora('10.117.115.110'))