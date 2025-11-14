import time
import sched
import logging
import logger_config
from datetime import datetime
from get_fw_data import get_users_data
from format_data import format_data_funct
from db_update_devnet import update_devnet_data, datetime_register
from db_insert_historic import save_historic_data



def main():

    # Esta es la informacion de los FW donde los usuarios se conectan mediante VPN
    fw_data = [
        {"host": "10.224.126.89", "fw": 1},
        # {"host": "10.224.126.93", "fw": 2},
        # {"host": "10.224.126.97", "fw": 3},
    ]

    try:
        final_data = []

        # Para cada FW en fw_data realizamos:
        for firewall in fw_data:
            host = firewall["host"]
            fw = firewall["fw"]
            
            logging.info(f"Obteniendo datos del FW: {fw}")

            # Obtenemos las informacion de los usuarios conectados a la VPN
            users_data = get_users_data(host)

            # Si no se obtuvieron datos guardamos  un solo usuario con datos de error
            # para mostrar en la UI que dicho FW no arrojo respuesta
            if users_data is None:
                error_dict = {
                    "email": "Error DevNet",
                    "ip_lan": "Error DevNet",
                    "ip_origin": "Error DevNet",
                    "duration": 0,
                    "fw": fw,
                    "datetime": str(datetime.now().strftime("%Y-%m-%d %H:%M:%S")),
                }

                final_data.append(error_dict)
                logging.error(f"No se obtuvieron datos del FW: {fw}")
                continue

            # Formateamos la informacion obtenida en la funcion `get_users_data`
            data_formated = format_data_funct(users_data, fw)

            # Agregamos la data formateada a final_data
            final_data.extend(data_formated)
        print(data_formated) 
        devnet_bd_response = update_devnet_data(final_data)
        historic_bd_response = save_historic_data(final_data)

        if devnet_bd_response is True and historic_bd_response is True:
            datetime_register(system_name="vpn_candelaria", status="OK")
        else:
            datetime_register(system_name="vpn_candelaria", status="ERROR")

        logging.info("Ciclo finalizado con Exito!")

    except Exception as e:
        datetime_register(system_name="vpn_candelaria", status="ERROR")
        logging.exception(e)


def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
