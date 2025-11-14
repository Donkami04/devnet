import traceback
import logging
from db_connections import devnet_connection
from datetime import datetime


def update_devnet_data(data):
    """
    Actualiza los datos en la tabla `vpn_candelaria` de la base de datos `devnet`.

    Este método elimina todos los registros existentes en la tabla `vpn_candelaria` y
    luego inserta un nuevo conjunto de datos proporcionado por el usuario.

    Args:
        data (list of dict): Lista de diccionarios, donde cada diccionario representa
                             un registro que se va a insertar en la tabla. Cada diccionario
                             debe contener las siguientes claves:
                             - 'fw': Identificador del firewall.
                             - 'email': Correo electrónico asociado.
                             - 'ip_lan': Dirección IP LAN.
                             - 'ip_origin': Dirección IP de origen.
                             - 'duration': Duración de la conexión.
                             - 'datetime': Fecha y hora del registro.

    Returns:
        bool: `True` si la operación fue exitosa, `False` si ocurrió un error.

    Raises:
        None: Los errores son capturados y registrados en los logs.

    Notes:
        - La tabla `vpn_candelaria` es vaciada antes de insertar los nuevos datos.
        - Los errores son registrados usando el módulo `logging`.
    """
    delete_query = "DELETE FROM `devnet`.`vpn_candelaria`"

    query = """
    INSERT INTO `devnet`.`vpn_candelaria` (
        `fw`,
        `email`,
        `ip_lan`,
        `ip_origin`,
        `duration`,
        `datetime`
    ) VALUES (%s, %s, %s, %s, %s, %s)
    """

    data_tuple = [
        (
            user.get("fw", ""),
            user.get("email", ""),
            user.get("ip_lan", ""),
            user.get("ip_origin", ""),
            user.get("duration", ""),
            user.get("datetime", ""),
        )
        for user in data
    ]

    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()

        # Limpiamos la tabla antes de insertar los nuevos datos
        devnet_cursor.execute(delete_query)  # Cambiar `executemany` a `execute`
        
        # Insertar nuevos datos
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