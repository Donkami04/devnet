import os
import logging
import traceback
import logger_config
import sched
import time
from dotenv import load_dotenv
from db_get_data import get_data
from api_prtg import get_prtg_data
from db_update_devnet import datetime_register, update_devnet_data

load_dotenv()
env = os.getenv('ENVIRONMENT')

def main():
    
    try:
        
        # Obtenemos la informacion de la BD de prod  
        wanList = get_data(table_name="wan")

        final_data = []
        
        for wan in wanList:
            ip_wan = wan.get('ip')
            logging.info(ip_wan)
            
            # Obtenemos la data de la API de PRTG
            data_prtg = get_prtg_data(ip_wan)
            
            # Actualizamos informacion y almacenamos
            wan.update(data_prtg)
            final_data.append(wan)
            
        bd_response = update_devnet_data(final_data)
        
        if bd_response:
            datetime_register(status="OK", system_name="wan")
        else:
            datetime_register(status="ERROR", system_name="wan")
            
        logging.info("Ciclo finalizado con exito!")
                    
    except Exception as e:
        logging.error(f"TRAZABILIDAD: {traceback.format_exc()}")
        logging.error(f"Error: {e}")
        logging.error(f"Error desconocido con la ip {ip_wan} en funcion main")
        datetime_register(status="ERROR", system_name="wan")
    
def bucle(scheduler):
    main()
    scheduler.enter(7200, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
