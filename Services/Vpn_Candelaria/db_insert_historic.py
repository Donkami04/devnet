import traceback
import logging
from db_connections import historic_connection
from datetime import datetime, timedelta


def save_historic_data(data):
    """
    Guarda los datos históricos en la tabla `vpn_candelaria` de la base de datos `historic-devnet`.

    Esta función elimina los registros de la tabla `vpn_candelaria` que tengan más de 12 meses
    de antigüedad y luego inserta un nuevo conjunto de datos proporcionado por el usuario.

    Args:
        data (list of dict): Lista de diccionarios, donde cada diccionario representa un registro
                             que se va a insertar en la tabla. Cada diccionario debe contener las
                             siguientes claves:
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
        - Se eliminan registros en la tabla `vpn_candelaria` que tengan más de 12 meses de antigüedad.
        - Los nuevos datos se insertan después de la eliminación de registros antiguos.
        - Los errores se registran utilizando el módulo `logging`.
    """
    
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime("%Y-%m-%d %H:%M:%S")

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`vpn_candelaria`
    WHERE `datetime` < %s
    """

    # Consulta SQL para insertar datos
    insert_query = """
    INSERT INTO `historic-devnet`.`vpn_candelaria` (
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
