import subprocess
import logger_config
import logging

from db_update_devnet import update_statusCores


def ping_host():
    ipList = ["10.224.127.1", "10.224.127.2", "10.230.127.1"]
    final_data = []

    for ip in ipList:
        logging.info(f"({ip}) Actualizando estado de los servidores CORE")
        try:
            response = subprocess.run(
                ["ping", "-c", "4", ip], capture_output=True, text=True, timeout=10
            )
            if response.returncode == 0:
                data = {"ip": ip, "status": "Up", "message": "OK"}
                final_data.append(data)
            else:
                data = {"ip": ip, "status": "Down", "message": response.stderr}
                final_data.append(data)
                

        except subprocess.TimeoutExpired:
            errData = {
                "ip": ip,
                "status": "Down",
                "message": "Tiempo de espera agotado (ping no respondió en el tiempo especificado).",
            }
            final_data.append(errData)
            logging.error("Error en la funcion `ping_host` del archivo `status_core`")
            