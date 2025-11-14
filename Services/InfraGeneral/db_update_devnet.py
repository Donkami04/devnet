import traceback
import logging
from datetime import datetime
from db_connections import devnet_connection
from db_insert_historic import save_historic_neighbors, save_historic_interfaces, save_historic_sys_health

def update_interfaces(data):

    delete_query = "DELETE FROM devnet.interfaces"

    query = """
            INSERT devnet.interfaces 
            (id_prtg, name, status, ip_switch, name_switch, red)
            VALUES (%s, %s, %s, %s, %s, %s)
        """

    data_tuple = [
        (
            fw.get("objid", ""),
            fw.get("name", ""),
            fw.get("status", ""),
            fw.get("ip_switch", ""),
            fw.get("name_switch", ""),
            fw.get("red", ""),
        )
        for fw in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Eliminamos los datos de la tabla para actualizarlos
        # En ciertas ocasiones desde PRTG eliminan una Interface la cual
        # ya no debe ser actualiazada en esta tabla
        devnet_cursor.execute(delete_query)

        devnet_cursor.executemany(query, data_tuple)
        db_connector.commit()

        db_connector.close()
        
        response = save_historic_interfaces(data)
        if response:
            datetime_register(status="OK", system_name="inf_gen_interfaces")
        else:
            datetime_register(status="ERROR", system_name="inf_gen_interfaces")
        
        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        datetime_register(status="ERROR", system_name="inf_gen_interfaces")
        return False


def update_sysHealth(data):
    delete_query = "DELETE FROM devnet.system_health"

    query = """
            INSERT devnet.system_health 
            (id_prtg, name, lastvalue, status, ip_switch, name_switch, red)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
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
        )
        for fw in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Eliminamos los datos de la tabla para actualizarlos
        # En ciertas ocasiones desde PRTG eliminan una Interface la cual
        # ya no debe ser actualiazada en esta tabla
        devnet_cursor.execute(delete_query)

        devnet_cursor.executemany(query, data_tuple)
        db_connector.commit()

        db_connector.close()
        
        response = save_historic_sys_health(data)
        if response:
            datetime_register(status="OK", system_name="inf_gen_sysHealth")
        else:
            datetime_register(status="ERROR", system_name="inf_gen_sysHealth")

        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        datetime_register(status="ERROR", system_name="inf_gen_sysHealth")
        return False


def update_statusCores(data):

    query = """
            UPDATE devnet.status_cores 
            SET status = %s, message = %s
            WHERE ip = %s
        """

    data_tuple = [
        (
            core.get("status", ""),
            core.get("message", ""),
            core.get("ip", ""),
        )
        for core in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        devnet_cursor.executemany(query, data_tuple)
        db_connector.commit()

        db_connector.close()

        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        datetime_register(status="ERROR", system_name="inf_gen_neighbors")
        return False


def update_neighbors(data):

    delete_query = "DELETE FROM devnet.neighbors"

    query = """
            INSERT INTO devnet.neighbors 
            (`ip_neighbor`, 
            `neighbor`, 
            `red`, 
            `name_switch`, 
            `ip_switch`, 
            `interface`, 
            `status`, 
            `interface_descrip`) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
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
        )
        for neigh in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Eliminamos los datos de la tabla para actualizarlos
        devnet_cursor.execute(delete_query)

        devnet_cursor.executemany(query, data_tuple)
        db_connector.commit()

        db_connector.close()
        
        response = save_historic_neighbors(data)
        if response:
            datetime_register(status="OK", system_name="inf_gen_neighbors")
        else:
            datetime_register(status="ERROR", system_name="inf_gen_neighbors")

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        datetime_register(status="ERROR", system_name="inf_gen_neighbors")
        return False


def update_via_bgp(data):

    query = """
            UPDATE devnet.route_default 
            SET via_bgp = %s
            WHERE ip_switch = %s
        """

    data_tuple = [
        (
            e["via_bgp"],
            e["ip_switch"],
        )
        for e in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        devnet_cursor.executemany(query, data_tuple)
        db_connector.commit()

        db_connector.close()
        datetime_register(status="OK", system_name="inf_gen_routeDefault")
        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        datetime_register(status="ERROR", system_name="inf_gen_routeDefault")
        return False


def datetime_register(system_name, status):
    """
    Registra la fecha y hora actual junto con el estado proporcionado en la tabla `datetime_systems`.

    Esta función actualiza el campo `status` y el campo `datetime` en la tabla `datetime_systems` de la base de datos `dcs`
    para el registro donde `system_name` coincide con el nombre de la tabla especificada. La fecha y hora actual se
    formatea como una cadena en el formato 'YYYY-MM-DD HH:MM:SS' antes de ser guardada.

    En caso de que ocurra una excepción durante la ejecución:
    - Los detalles de la excepción se registran en los logs para su posterior análisis.
    - Se registra un mensaje de error específico indicando que hubo un problema en la función `datetime_register`
      dentro del archivo `db_update_devnet`.

    Args:
        table_name (str): El nombre de la tabla en la base de datos que se va a actualizar en el campo `system_name`.
        status (str): El estado que se desea registrar en la tabla junto con la fecha y hora actuales.

    Raises:
        Exception: Si ocurre algún error durante la conexión a la base de datos, la ejecución de la consulta,
                   o el cierre de la conexión.
    """
    now = datetime.now()
    now_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
    now_datetime = str(now_datetime)

    query = f"""
    UPDATE `devnet`.`datetime_systems` SET 
    status = '{status}', 
    datetime = '{now_datetime}' 
    WHERE system_name = '{system_name}'
    """

    try:

        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        devnet_cursor.execute(query)
        db_connector.commit()

        db_connector.close()

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `datetime_register` en el archivo `db_update_devnet`"
        )
        logging.error(e)
