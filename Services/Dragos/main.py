import os
import time
import logging
import traceback
import sched
from dotenv import load_dotenv
from get_data import get_devnet_data
from api_prtg import get_status_prtg
from db_update import update_devnet_data, datetime_register
import requests

load_dotenv()
env = os.getenv("ENVIRONMENT")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def main():
    try:
        db_devnet_data = get_devnet_data(table_name="dragos")

        # Crear un set para eliminar duplicados
        id_device_set = {item['id_device'] for item in db_devnet_data}

        # Convertir a lista
        id_device_list = list(id_device_set)

        # Obtenemos el estado de cada interface de cada device
        interface_status = get_status_prtg(id_device_list)

        # Actualizamos los datos en la BD
        result = update_devnet_data(interface_status)

        # Actualizamos registro datetime del sistema
        if result is True:
            datetime_register(system_name="dragos", status="OK")
        else:
            datetime_register(system_name="dragos", status="ERROR")

        logging.info("Ciclo finalizado con exito!")

    except Exception as e:
        datetime_register(system_name="dragos", status="ERROR")
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en la funcion `main` del archivo `main`")


def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
