import traceback
import logging
from db_connections import devnet_connection
from datetime import datetime


def update_devnet_data(data):
    """
    Actualiza los datos en la base de datos para los registros que coincidan con la dirección IP proporcionada.

    Esta función actualiza las columnas `status_prtg`, `lastup_prtg`, `lastdown_prtg`, `device_ip_cisco`,
    `device_cisco`, `port_cisco`, `status_cisco`, `reachability_cisco`, `id_prtg`, `status_device_cisco`
    y `data_backup` en la tabla `candelaria_clients` de la base de datos `dcs` para las filas que coincidan
    con la dirección IP (`ip`) proporcionada en cada diccionario dentro de la lista `data`.

    En caso de que ocurra una excepción durante la ejecución:
    - Los detalles de la excepción se registran en los logs para su posterior análisis.
    - Se registra un mensaje de error específico indicando que hubo un problema en la función `update_devnet_data`
      dentro del archivo `db_update_devnet`.

    Args:
        data (list[dict]): Lista de diccionarios, donde cada diccionario representa los datos de un cliente
                           que se van a actualizar en la base de datos. Cada diccionario debe contener las
                           siguientes claves: `status_prtg`, `lastup_prtg`, `lastdown_prtg`, `device_ip_cisco`,
                           `device_cisco`, `port_cisco`, `status_cisco`, `reachability_cisco`, `id_prtg`,
                           `status_device_cisco`, `data_backup`, y `ip` (clave utilizada en la cláusula WHERE).

    Raises:
        Exception: Si ocurre algún error durante la conexión a la base de datos, la ejecución de la consulta,
                   o el cierre de la conexión.
    """

    delete_query = "DELETE FROM devnet.prtg_groups"

    query = """
            INSERT INTO devnet.prtg_groups
            (`device`, 
            `group`, 
            `status`, 
            `id_prtg`, 
            `sensor`, 
            `lastvalue`, 
            `rol`            
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

    data_tuple = [
        (
            item["device"],
            item["group"],
            item["status"],
            item["objid"],
            item["sensor"],
            item["lastvalue"],
            item["rol"]
        )
        for item in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Eliminamos los datos de la tabla para actualizarlos
        # En ciertas ocasiones desde PRTG eliminan un elemento la cual
        # ya no debe ser actualiazada en esta tabla
        devnet_cursor.execute(delete_query)

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

        datetime_register(system_name="candelaria_switches", status="ERROR")
        return False


def register_datetime_sensor_down(data, action):
    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        if action == "register":
            insert_query = """
                INSERT INTO devnet.prtg_groups_down_datetimes
                (`id_prtg`, `datetime`)
                VALUES (%s, %s)
            """
            values = (data["objid"], data["datetime"])  # Convertido a tupla
            devnet_cursor.execute(insert_query, values)

        elif action == "delete":
            delete_query = """
                DELETE FROM `devnet`.`prtg_groups_down_datetimes`
                WHERE `id_prtg` = %s
            """
            devnet_cursor.execute(delete_query, (data["objid"],))  # Tupla correcta

        db_connector.commit()
        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `register_datetime_sensor_down` en el archivo `db_update_devnet`"
        )
        datetime_register(system_name="candelaria_switches", status="ERROR")
        return False

    finally:
        if "devnet_cursor" in locals() and devnet_cursor:
            devnet_cursor.close()
        if "db_connector" in locals() and db_connector:
            db_connector.close()


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
