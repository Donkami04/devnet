import os
import time
import traceback
import re
import logging
import logger_config
import paramiko
from dotenv import load_dotenv

load_dotenv()
env = os.getenv('ENVIRONMENT')

def get_mesh_process_data():
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(hostname="10.224.114.65", port=22, username='roadmin', password='C4nd3*2023')
        channel = client.invoke_shell()
        logging.info("##### Conectado al dispositivo")
        commands = [
            f"terminal length 0\n",
            "show ip arp | in Vlan112\n"
        ]

        for command in commands:
            channel.send(command)
            time.sleep(2)

        output = ""
        while channel.recv_ready():
            output += channel.recv(1024).decode('utf-8')
        channel.close()
        client.close()
        
        regex = r"Internet\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+\d+\s+([0-9a-fA-F]{4}\.[0-9a-fA-F]{4}\.[0-9a-fA-F]{4})"

        # Lista para almacenar los resultados
        resultado = []
        for linea in output.split("\n"):
            match = re.search(regex, linea)
            if match:
                ip = match.group(1)
                mac = match.group(2)
                resultado.append({'ip': ip, 'mac': mac})

        return resultado

    except Exception as e:
        logging.error("Error en funcion get_mesh_process_data")
        logging.error(e)
        logging.error(traceback.format_exc())
        return False

# get_mesh_process_data()
