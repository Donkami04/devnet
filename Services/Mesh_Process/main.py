import os
import time
import traceback
import sched
import logging
import logger_config

from dotenv import load_dotenv
from mesh_data import get_mesh_process_data
from status_prtg import status_prtg
from command_mac_detail import run_mac_detail
from validate_status import validate_status

from db_get_data import get_data
from update_current_mac import update_mac, check_ip_in_output
from db_update_devnet import update_devnet_data, datetime_register

load_dotenv()
env = os.getenv("ENVIRONMENT")


def main():
    try:
        logging.info("##### Iniciando ciclo")

        # Obtenemos los datos actuales de la BD
        last_data = get_data(table_name="mesh_process")

        # Obtenemos los datos actuales de la controladora
        logging.info("##### Obteniendo informacion del comando show ip arp | in Vlan112")
        current_data = get_mesh_process_data()

        current_data_mac_updated = update_mac(last_data, current_data)

        # Actualizamos el estado de cada cliente
        logging.info("##### Actualizando el estado de cada cliente")
        data_updated = validate_status(current_data_mac_updated)
        
        # Actualizamos los datos en la BD
        if data_updated != False:
            
            db_response = update_devnet_data(data_updated)

            if db_response:
                datetime_register(status="OK", system_name="mesh_process")
            else:
                datetime_register(status="ERROR", system_name="mesh_process")

        else:
            datetime_register(status="ERROR", system_name="mesh_process")

        logging.info("##### Ciclo Terminado")

    except Exception as e:
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en funcion Main")
        datetime_register(status="ERROR", system_name="mesh_process")


def bucle(scheduler):
    main()
    scheduler.enter(150, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
