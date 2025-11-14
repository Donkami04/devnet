import time
import sched
import datetime
import traceback
import logging
from get_fw_data import diagnose_fw_vdom, diagnose_fw, numUsers_fw_vdom, numUsers_fw
from db_get_data import get_data, check_failed_before
from api_prtg import get_prtg_data
from db_insert_historic import save_historic_data
from db_update_devnet import update_devnet_data, datetime_register


def main():
    try:

        # Obtenemos los datos mas recientes de la BD de produccion
        firewall_list = get_data(table_name="firewalls")
        
        # Aqui almacenamos los datos actualizados
        final_data = []
        for fw in firewall_list:
            host = fw.get("ip")
            name = fw.get("name")
            vdom = fw.get("vdom")
            gateway = fw.get("gateway")
            ubication = fw.get("ubication")
            channel = fw.get("channel")
            fw["datetime"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            logging.info(f"Corriendo : {host} - {name} - {channel}")
            
            # Obtenemos el estado del Gateway del Firewall en PRTG
            fw["status_gateway"] = get_prtg_data(gateway)

            # Inicializamos el número de usuarios por defecto
            fw["num_users"] = "N/A"
            
            # Si es una ubicación corporativa modificamos el número de usuarios
            if ubication == "corporate":
                if vdom != "N/A":
                    fw["num_users"] = numUsers_fw_vdom(host, vdom)
                else:
                    fw["num_users"] = numUsers_fw(host)

            # Dependiendo del valor de vdom usaremos una funcion especifica
            if vdom != "N/A":
                dataDiagnose_fw = diagnose_fw_vdom(host, vdom, channel)
                fw.update(dataDiagnose_fw)  
            else:
                dataDiagnose_fw = diagnose_fw(host, channel)
                fw.update(dataDiagnose_fw)
                
            fw["failed_before"] = check_failed_before(name, channel)

            # Agregamos el FW actualizado a final_data
            final_data.append(fw)
            
        devnet_bd_response = update_devnet_data(final_data)
        historic_bd_response = save_historic_data(final_data)

        if devnet_bd_response and historic_bd_response:
            datetime_register(system_name="firewalls", status="OK")
        else:
            datetime_register(system_name="firewalls", status="ERROR")

        logging.info("Ciclo finalizdo con exito!")

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)

def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
