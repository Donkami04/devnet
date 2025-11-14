import logger_config
import requests
import os
import time
import traceback
import datetime
import sched
import logging
import re
import mysql.connector
from dotenv import load_dotenv
from config import database
from db_connections import devnet_connection
from db_get_data import get_data
from api_cisco import get_cisco_id, get_cisco_data
from api_prtg import get_prtg_id, get_prtg_data
from db_insert_historic import save_historic_data
from db_update_devnet import update_devnet_data, datetime_register

load_dotenv()

def main():
    try:

        # Obtenemos los datos de los Clientes desde la BD
        clients = get_data(table_name="desaladora_clients")
        if clients is None:
            raise ValueError(
                "No se pudo establecer la conexión con la base de datos: el conector es None."
            )

        counter = 1
        clients_updated = []
        for client in clients:
            logging.info(f'Procesando Cliente # {counter} de {len(clients)}: {client["ip"]}')
            counter += 1

            client = get_prtg_id(client) # Obtenemos Id de la API PRTG
            client = get_prtg_data(client) # Consultamos la data de la API PRTG
            client = get_cisco_id(client) # Obtenemos Id de la API CISCO
            client = get_cisco_data(client) # Consultamos la data de la API CISCO
            client["datetime"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            clients_updated.append(client)

        devnet_bd_response = update_devnet_data(clients_updated)
        historic_bd_response = save_historic_data(clients_updated)

        if devnet_bd_response is True and historic_bd_response is True:
            datetime_register(system_name="desaladora_clients", status="OK")
        else:
            datetime_register(system_name="desaladora_clients", status="ERROR")

        logging.info("Ciclo finalizado con Exito!")

    except Exception:
        logging.error(traceback.format_exc())
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        datetime_register(system_name="desaladora_clients", status="ERROR")

def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
