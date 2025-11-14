import os
import time
import logging
import traceback
import sched
from dotenv import load_dotenv
from db_get_data import get_devnet_data
from api_prtg import get_status_prtg, get_status_prtg_ping_sensors
from db_update import update_devnet_data, datetime_register

load_dotenv()
env = os.getenv("ENVIRONMENT")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def main():
    try:
        db_devnet_data = get_devnet_data(table_name="anillo_opit")

        # Creamos una lista de interfaces
        id_interface_list = [item['id_device'] for item in db_devnet_data if '- Rajant' not in item['device']]

        # Creamos una lista de sensores ping rajant
        id_sensor_list = [item['id_device'] for item in db_devnet_data if '- Rajant' in item['device']]

        # Crear un set para eliminar duplicados
        id_device_set = {item for item in id_interface_list}

        # Convertir a lista
        id_device_list = list(id_device_set)

        # Obtenemos el estado de cada interface de cada device
        interface_status = get_status_prtg(id_device_list)
        sensors_status = get_status_prtg_ping_sensors(id_sensor_list)

        dataToUpdate = interface_status + sensors_status

        # Actualizamos los datos en la BD
        result = update_devnet_data(dataToUpdate)

        # Actualizamos registro datetime del sistema
        if result is True:
            datetime_register(system_name="anillo_opit", status="OK")
        else:
            logging.error("Error al guardar en la BD")
            logging.error(result)
            datetime_register(system_name="anillo_opit", status="ERROR")

        logging.info("Ciclo finalizado con exito!")

    except Exception as e:
        datetime_register(system_name="anillo_opit", status="ERROR")
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
