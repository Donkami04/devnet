import time
import logging
import traceback
import sched
import logger_config
from command_route import route_function

from status_core import ping_host
from db_update_devnet import update_neighbors, update_via_bgp
from db_get_data import get_data
from api_prtg import update_prtg_data
from neighbors import (
    process_neighbors,
    status_neighbor,
    get_interfaces_descriptions,
    set_interfaces_descriptions,
)


def main():
    try:
        logging.info(f"Iniciando proceso")
        
        # Obtenemos los datos de la BD de produccion
        data_switches = get_data(table_name="data_inf_gen")

        # Eliminamos del listado la concentradora inalambrica
        data_switches = [sw for sw in data_switches if sw["category"] != "AP"]
        
        # Actualizamos la informacion referente a PRTG
        update_prtg_data(data_switches)

        # Actualizamos los datos de los cores
        ping_host()

        # Obtenemos la data de los neighbors
        current_data_neighbors = process_neighbors(data_switches)

        # Asignamos a cada neighbors el estado Up o Down
        status_data_neighbors = status_neighbor(current_data_neighbors)

        # Informacion de las interfaces de los Switches
        data_interfaces = get_interfaces_descriptions(data_switches)

        # Asignamos a cada SW la descripcion de su interface
        final_data_neighbors = set_interfaces_descriptions(data_interfaces, status_data_neighbors)

        # Guardamos en la BD los datos de los Neighbors
        update_neighbors(final_data_neighbors)
        
        # Obtenemos la informacion del comando ip route
        data_route = route_function(data_switches)

        # Actualizamos la BD con Route BGP
        update_via_bgp(data_route)

        logging.info("Terminado")

    except Exception as e:
        logging.error(traceback.format_exc())


def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
