import logging
import traceback
import telnetlib
import time

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
logging.getLogger().addHandler(file_handler)


def reset_base(ip_base):
    try:
        logging.warning(f"Iniciando Reinicio {ip_base}")
        telnet = telnetlib.Telnet(ip_base, 23, timeout=60)

        telnet.read_until(b"Username:", timeout=10)
        telnet.write(b"admin\n")

        telnet.read_until(b"Password:", timeout=10)
        telnet.write(b"netman\n")
        logging.warning(f"Loging exitoso {ip_base}")
        
        telnet.read_until(b">", timeout=10)
        telnet.write(b"reboot\n")

        time.sleep(5)  # Esperar unos segundos para permitir que el comando se ejecute
        output = telnet.read_very_eager().decode("utf-8")

        logging.info(f"Output: {output}")
        logging.info(f"Reinicio exitoso en {ip_base}. Detalles del output: {output}")

        telnet.close()
        return "Successful", "Reinicio exitoso"

    except Exception as e:
        error_message = f"Error intentando el reinicio de la base {ip_base}: {str(e)}"
        logging.error(error_message)
        logging.error(traceback.format_exc())
        logging.error("=============== Retornado Fail ==================")
        return "Fail", f"Reinicio automático fallido para {ip_base}: {str(e)}"
