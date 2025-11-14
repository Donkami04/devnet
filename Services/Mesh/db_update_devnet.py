import traceback
import logging
from db_connections import devnet_connection
from datetime import datetime, time


def update_devnet_data(data):
    """
    Actualiza múltiples registros en la tabla `devnet.mesh` de la base de datos `devnet`.

    Esta función recibe una lista de diccionarios, donde cada diccionario contiene los datos 
    necesarios para actualizar un registro en la tabla `devnet.mesh`. Se construye una consulta 
    SQL de actualización y se ejecuta para cada conjunto de datos. Si la operación es 
    exitosa, se confirman los cambios en la base de datos. En caso de error, se registra la 
    excepción en los logs y se devuelve `False`.

    Args:
        data (list[dict]): Una lista de diccionarios, donde cada diccionario contiene las 
        claves correspondientes a las columnas de la tabla `devnet.mesh`, y los valores a actualizar.

    Returns:
        bool: `True` si la actualización fue exitosa, `False` en caso de error.
    """

    query = """
        UPDATE devnet.mesh
        SET
            `device` = %s, 
            `eqmt` = %s, 
            `ping_avg` = %s, 
            `minimo` = %s, 
            `maximo` = %s, 
            `packet_loss` = %s, 
            `lastvalue` = %s, 
            `lastup` = %s, 
            `lastdown` = %s, 
            `nivel_senal` = %s, 
            `ruido_senal` = %s, 
            `tiempo_conexion` = %s, 
            `conectado_a` = %s, 
            `status_dispatch` = %s, 
            `operador` = %s, 
            `snr` = %s, 
            `id_prtg` = %s, 
            `distance` = %s, 
            `fail_senal` = %s, 
            `fail_time_senal` = %s, 
            `fail_snr` = %s, 
            `fail_time_snr` = %s, 
            `datetime` = %s
        WHERE `ip` = %s
    """

    # Crear una lista de tuplas con los valores correspondientes para cada fila a actualizar
    data_tuple = [
        (
            mesh_element["name_device"],
            mesh_element["eqmt"],
            mesh_element["avg_ping"],
            mesh_element["min_ping"],
            mesh_element["max_ping"],
            mesh_element["packet_loss"],
            mesh_element["last_value_ping"],
            mesh_element["last_up_ping"],
            mesh_element["last_down_ping"],
            mesh_element["signal_strength"],
            mesh_element["signal_noise"],
            mesh_element["connected_for"],
            mesh_element["ap_name"],
            mesh_element["status_dispatch"],
            mesh_element["operador"],
            mesh_element["snr_level"],
            mesh_element["id_prtg"],
            mesh_element["distance"],
            mesh_element["fail_senal"],
            mesh_element["fail_time_senal"],
            mesh_element["fail_snr"],
            mesh_element["fail_time_snr"],
            mesh_element["datetime"],
            mesh_element["ip_device"]
        )
        for mesh_element in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Ejecutar la consulta para cada conjunto de datos
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


def update_db_fail_counters():
    """
    Resetea los contadores de fallas en la base de datos si la función es ejecutada
    dentro de un intervalo de tiempo específico.

    Esta función se conecta a la base de datos `devnet`, y si se ejecuta entre las
    00:00 y 00:30 horas, resetea los contadores de fallas (`fail_senal`, `fail_time_senal`,
    `fail_snr`, `fail_time_snr`) en la tabla `devnet.mesh` a cero. La función maneja errores
    y registra cualquier excepción en los logs.

    Raises:
        Exception: Si ocurre algún error durante la ejecución de la consulta SQL o
        al cerrar la conexión a la base de datos.
    """
    try:
        now_datetime = datetime.now().time()
        bot_limit = time(0, 0)
        top_limit = time(0, 30)

        if bot_limit <= now_datetime <= top_limit:

            db_connector = devnet_connection()
            devnet_cursor = db_connector.cursor()

            query = "UPDATE devnet.mesh SET fail_senal = 0, fail_time_senal = 0, fail_snr = 0, fail_time_snr = 0"

            devnet_cursor.execute(query)
            db_connector.commit()

            db_connector.close()

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            "Error en la función `update_db_fail_counters` en el archivo `db_update_devnet`"
        )
