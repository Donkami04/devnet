import logging
import traceback
import logger_config
from db_get_data import get_data


# Funcion empleada para darle estado UP o DOWN al neighbor
def status_neighbor(mydb, current_neighbors):
    try:
        dataNeighbor = get_data(table_name="data_neighbors")

        for data in dataNeighbor:
            data.pop("id", None)

        for neighbor in dataNeighbor:
            if neighbor in current_neighbors:
                neighbor["status"] = "Up"
            else:
                neighbor["status"] = "Down"

        return dataNeighbor

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            f"Error en la funcion `status_neighbor` en el archivo neighbors"
        )
