import logging
import traceback
from datetime import datetime
from db_connection import devnet_connection


def update_devnet_data(data):
    """
    Actualiza el estado de las interfaces en la base de datos `dcs.anillo-ug` utilizando los datos proporcionados.

    Esta función toma una lista de diccionarios que contienen el estado de la interfaz (`status`) y el 
    identificador de PRTG (`objid`). Actualiza la columna `status` en la tabla `anillo-ug` de la base de datos 
    `dcs` para cada registro cuyo `id_prtg` coincida con el `objid` proporcionado.

    Args:
        data (list): Una lista de diccionarios, cada uno con las claves `status` y `objid`, que representan el estado 
                     de la interfaz y el identificador PRTG, respectivamente.

    Returns:
        bool: Retorna `True` si la actualización se realizó con éxito, de lo contrario retorna `False` si se 
              produce algún error durante el proceso.
              
    Raises:
        Exception: Registra cualquier excepción que ocurra durante la ejecución, incluyendo el rastreo de la pila, 
                   en los logs de errores.
    """
    # Consulta SQL para actualizar los datos donde el valor de la columna 'id_prtg' coincida
    query = """
    UPDATE devnet.`flotacion_ot` SET 
        status = %s
    WHERE device_id = %s
    """

    # Construimos los tuplas que contienen el `status` y el `id_prtg` para cada entrada
    data_tuple = [(elem["status"], elem["objid"]) for elem in data]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Ejecutamos la consulta con múltiples valores
        devnet_cursor.executemany(query, data_tuple)
        db_connector.commit()

        db_connector.close()

        return True

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        logging.error(e)
        return False


def datetime_register(system_name, status):
    """
    Registra la fecha, hora y estado del último ciclo de actualización para un sistema específico en la base de datos.

    Proceso:
    - Actualiza el registro de la última fecha, hora y estado de un sistema en la tabla `dcs.datetime_systems`.

    Parámetros:
    - system_name (str): Nombre del sistema que se está registrando (por ejemplo, "ups").
    - status (str): Estado actual del sistema (por ejemplo, "OK" o "ERROR").

    Manejo de errores:
    - Si ocurre un error durante la ejecución, se captura y se registra en los logs.
    """

    now = datetime.now()
    now_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
    now_datetime = str(now_datetime)

    query = f"""
    UPDATE devnet.datetime_systems SET 
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
