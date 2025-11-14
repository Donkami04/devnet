import os
import time
import logging
import traceback
import sched
from dotenv import load_dotenv
from get_data import get_devnet_data
from api_prtg import get_status_prtg
from db_update import update_devnet_data, datetime_register

load_dotenv()
env = os.getenv("ENVIRONMENT")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def main():
    try:
        db_devnet_data = get_devnet_data(table_name="flotacion_ot")

        # Obtenemos el estado de cada sensor de cada device
        sensors_status = get_status_prtg(db_devnet_data)

        # Actualizamos los datos en la BD
        result = update_devnet_data(sensors_status)

        # Actualizamos registro datetime del sistema
        if result is True:
            datetime_register(system_name="flotacion_ot", status="OK")
        # else:
        #     datetime_register(system_name="flotacion_ot", status="ERROR")

        logging.info("Ciclo finalizado con exito!")

    except Exception as e:
        datetime_register(system_name="flotacion_ot", status="ERROR")
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