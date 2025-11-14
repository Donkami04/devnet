import traceback
import logging
from db_connections import historic_connection
from datetime import datetime, timedelta


def save_historic_interfaces(data):
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime("%Y-%m-%d %H:%M:%S")

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`interfaces`
    WHERE `datetime` < %s
    """

    insert_query = """
            INSERT `historic-devnet`.interfaces 
            (id_prtg, name, status, ip_switch, name_switch, red, datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

    data_tuple = [
        (
            fw.get("objid", ""),
            fw.get("name", ""),
            fw.get("status", ""),
            fw.get("ip_switch", ""),
            fw.get("name_switch", ""),
            fw.get("red", ""),
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
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
            "Error en la función `save_interfaces` en el archivo `db_insert_historic`"
        )
        logging.error(e)

        return False


def save_historic_sys_health(data):
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime("%Y-%m-%d %H:%M:%S")

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`system_health`
    WHERE `datetime` < %s
    """

    insert_query = """
            INSERT `historic-devnet`.system_health 
            (id_prtg, name, lastvalue, status, ip_switch, name_switch, red, datetime)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

    data_tuple = [
        (
            fw.get("objid", ""),
            fw.get("name", ""),
            fw.get("lastvalue", ""),
            fw.get("status", ""),
            fw.get("ip_switch", ""),
            fw.get("name_switch", ""),
            fw.get("red", ""),
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
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
            "Error en la función `save_sys_health` en el archivo `db_insert_historic`"
        )
        logging.error(e)

        return False


def save_historic_neighbors(data):
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime("%Y-%m-%d %H:%M:%S")

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`neighbors`
    WHERE `datetime` < %s
    """

    insert_query = """
            INSERT INTO `historic-devnet`.neighbors 
            (`ip_neighbor`, 
            `neighbor`, 
            `red`, 
            `name_switch`, 
            `ip_switch`, 
            `interface`, 
            `status`, 
            `interface_descrip`,
            `datetime`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

    data_tuple = [
        (
            neigh["ip_neighbor"],
            neigh["neighbor"],
            neigh["red"],
            neigh["name_switch"],
            neigh["ip_switch"],
            neigh["interface"],
            neigh["status"],
            neigh["interface_descrip"],
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
        for neigh in data
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
            "Error en la función `save_sys_health` en el archivo `db_insert_historic`"
        )
        logging.error(e)

        return False
