import traceback
import logging
from db_connections import historic_connection
from datetime import datetime, timedelta


def save_historic_data(data):
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime("%Y-%m-%d %H:%M:%S")

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`firewalls`
    WHERE `datetime` < %s
    """

    # Consulta SQL para insertar todos los datos de los diccionarios
    insert_query = """
        INSERT INTO `historic-devnet`.`firewalls` 
        (`name`, `ip`, `channel`, `num_users`, `state`, `packet_loss`, `latency`, `jitter`, `failed_before`, `datetime`, 
        `link`, `gateway`, `ubication`, `status_gateway`) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    # Crear tupla con todos los datos
    data_tuple = [
        (
            fw.get("name"),
            fw.get("ip"),
            fw.get("channel"),
            fw.get("num_users"),
            fw.get("state"),
            fw.get("packet_loss"),
            fw.get("latency"),
            fw.get("jitter"),
            fw.get("failed_before"),
            fw.get("datetime"),
            fw.get("link"),
            fw.get("gateway"),
            fw.get("ubication"),
            fw.get("status_gateway")
        )
        for fw in data
    ]

    try:
        db_connector = historic_connection()
        historic_cursor = db_connector.cursor()

        # Eliminar registros antiguos
        historic_cursor.execute(delete_query, (twelve_months_ago_str,))

        # Insertar nuevos datos
        historic_cursor.executemany(insert_query, data_tuple)
        db_connector.commit()

        db_connector.close()

        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `save_historic_data` en el archivo `db_insert_historic`"
        )
        logging.error(e)

        return False
