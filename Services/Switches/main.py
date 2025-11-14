import warnings
import requests
import os
import time
import traceback
import re
import sched
import datetime
import logging
import mysql.connector
import logger_config
from dotenv import load_dotenv
from config import database
from db_get_data import get_data
from api_cisco import get_cisco_data
from api_prtg import get_prtg_data
from db_update_devnet import update_devnet_data, datetime_register
from db_insert_historic import save_historic_data

def main():

    try:
        # Obtenemos la informacion de la BD de Prod
        allSwitches = get_data(table_name="candelaria_switches")
        
        # Aqui almacenamos toda la informacion
        final_data = []
        
        # Para cada IP hacemos las consultas a PRTG y a Cisco
        for switch in allSwitches:
            ip = switch['ip']
            logging.info(ip)

            # Obtenemos datos de la API PRTG 
            prtg_data = get_prtg_data(ip)
            switch.update(prtg_data)

            # Obtenemos el reachibility de cisco
            switch["reachability"] = get_cisco_data(ip)
            
            final_data.append(switch)
              
        devnet_bd_response = update_devnet_data(final_data)
        historic_bd_response = save_historic_data(final_data)
        if devnet_bd_response and historic_bd_response:
            datetime_register(system_name="candelaria_switches", status="OK")
        else:
            datetime_register(system_name="candelaria_switches", status="ERROR")

        logging.info('Ciclo finalizado con exito!')
            
    except Exception as e:
        datetime_register(system_name="candelaria_switches", status="ERROR")
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en la funcion `main` del archivo `main`")


def bucle(scheduler):
    #Funcion encargada de ejecutar el proceso principal cada 5 minutos.
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()


