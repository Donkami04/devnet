import logging
import traceback
from netmiko import ConnectHandler
import os

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
logging.getLogger().addHandler(file_handler)
paramiko_logger = logging.getLogger("paramiko")
paramiko_logger.setLevel(logging.WARNING)


def reset_base(ip_base):

    session_log = f"session_{ip_base.replace('.', '_')}.log"
    output = None
    output = None
    try:
        logging.info(f"Iniciando Reinicio {ip_base}")
        device = {
            "device_type": "cisco_ios_telnet",
            "host": ip_base,
            "username": "admin",
            "password": "netman",
            "port": 23,
            "session_log": session_log,  # Guarda el log de la sesión
            "timeout": 60,  # Aumentar el tiempo de espera general
            "blocking_timeout": 60,  # Tiempo de espera para operaciones bloqueantes
            "read_timeout_override": 60,  # Sobrescribir el timeout de lectura
        }

        # Iniciar la conexión TELNET
        with ConnectHandler(**device) as telnet:
            output = telnet.send_command("reboot", delay_factor=5)
            logging.info(f"Output: {output}")

        logging.info(f"Reinicio exitoso en {ip_base}. Detalles del output: {output}")
        return "Successful", "Reinicio exitoso"

    except Exception as e:
        error_message = f"Error intentando el reinicio de la base {ip_base}: {str(e)}"
        logging.error(error_message)
        logging.error(traceback.format_exc())
        logging.error("=============== Retornado Fail ==================")
        return "Fail", f"Reinicio automático fallido para {ip_base}: {str(e)}"

    # finally:
    #     error_log = f"error_{ip_base.replace('.', '_')}.log"
    #     if os.path.exists(output):
    #         os.rename(session_log, error_log)
    #         logging.error(f"Log detallado guardado en: {error_log}")
