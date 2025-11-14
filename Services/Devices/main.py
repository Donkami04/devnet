import time
import traceback
import sched
import logging
import logger_config
from dotenv import load_dotenv
from ups import define_ups_status
from db_get_data import get_data
from api_cctv import get_cctv_data, set_cctv_status
from api_prtg import get_prtg_data
from api_cisco import get_cisco_data
from db_insert_historic import save_historic_data
from db_update_devnet import update_devnet_data, datetime_register
from concurrent.futures import ThreadPoolExecutor, as_completed


def process_devices_block(devices, cctv_data, bloque_id):
    """
    Procesa un bloque de dispositivos, registrando su origen (bloque) e índice local en los logs.

    Args:
        devices (list of dict): Dispositivos a procesar.
        cctv_data (dict): Datos de CCTV.
        bloque_id (str): Identificador del bloque (ej. "0-250").

    Returns:
        list of dict: Dispositivos actualizados.
    """
    final_data = []
    start_time = time.time()
    for idx, device in enumerate(devices, start=1):
        ip = device["host"]
        type = device["type"]
        red = device["red"]
        site = device["site"]
        prtg_id = device["prtg_id"]
        cisco_id = device["cisco_id"]

        # logging.info(f"dispositivo {ip} - {type} - {site}")
        logging.info(
            f"[Bloque {bloque_id} - Dispositivo # {idx}] Actualizando dispositivo {ip} - {type} - {site}"
        )

        prtg_data = get_prtg_data(ip, prtg_id)
        device.update(prtg_data)

        cisco_data = get_cisco_data(red, ip, cisco_id)
        device.update(cisco_data)

        cctv_status = {"cctv_enabled": "N/A", "cctv_valid": "N/A"}
        if type == "Camara" or type == "Cámara":
            cctv_status = set_cctv_status(ip, cctv_data)
        device.update(cctv_status)

        device["ups_status"] = define_ups_status(device["cisco_device_name"])

        final_data.append(device)

    end_time = time.time()
    logging.info(
        f"Tiempo de ejecución: {end_time - start_time:.2f} segundos Bloque # {bloque_id}"
    )
    return final_data


def get_devices_data():
    """
    Obtiene y procesa la información actual de los dispositivos y servidores CCTV, dividiéndolos en bloques
    para su procesamiento concurrente. Actualiza la base de datos DevNet y guarda los datos históricos.

    Este proceso se ejecuta en un bucle para repetirse cada 5 minutos, y maneja errores registrando información
    detallada en caso de fallos.
    """
    try:
        load_dotenv()

        devices = get_data(table_name="devices")

        cctv_data = get_cctv_data()

        bloques = [
            (devices[:100], "0-99"),
            (devices[100:200], "100-199"),
            (devices[200:300], "200-299"),
            (devices[300:400], "300-399"),
            (devices[400:500], "400-499"),
            (devices[500:600], "500-599"),
            (devices[600:700], "600-699"),
            (devices[700:800], "700-799"),
            (devices[800:], "800+"),
        ]

        final_data = []

        with ThreadPoolExecutor() as executor:
            futures = [
                executor.submit(process_devices_block, bloque, cctv_data, bloque_id)
                for bloque, bloque_id in bloques
            ]
            for future in as_completed(futures):
                print(future.result())
                final_data.extend(future.result())

        devnet_bd_response = update_devnet_data(final_data)
        historic_bd_response = save_historic_data(final_data)

        if devnet_bd_response and historic_bd_response:
            datetime_register(system_name="devices", status="OK")
        else:
            datetime_register(system_name="devices", status="ERROR")

        logging.info("Ciclo finalizado con éxito!")

    except Exception as e:
        datetime_register(system_name="devices", status="ERROR")
        logging.error(traceback.format_exc())
        logging.error(e)


def bucle(scheduler):
    """
    Función que ejecuta el ciclo de actualización de dispositivos y programa su próxima ejecución en 5 minutos.

    Args:
        scheduler (sched.scheduler): Instancia del programador para gestionar las ejecuciones periódicas.
    """
    get_devices_data()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
