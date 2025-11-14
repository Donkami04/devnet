import logger_config
import logging
import traceback
from db_connections import devnet_connection, historic_connection


def get_data(table_name):
    """
    Obtiene los datos actuales de la tabla especificada en la base de datos `devnet`.

    Conecta a la base de datos, ejecuta una consulta para seleccionar todos los registros
    de la tabla indicada, y convierte los resultados en una lista de diccionarios, donde
    cada diccionario representa una fila con los nombres de las columnas como claves.

    Parámetros:
        table_name (str): El nombre de la tabla de la que se desea obtener los datos.

    Retorno:
        list of dict: Una lista de diccionarios, donde cada diccionario representa una fila
                      de la tabla, con los nombres de las columnas como claves y los valores
                      correspondientes. Si ocurre un error durante el proceso, retorna `None`.

    Excepciones:
        ValueError: Si no se puede establecer la conexión con la base de datos.
        Exception: Cualquier otra excepción que ocurra durante la ejecución.

    Ejemplo de uso:
        data = get_data("ups_data")
        if data:
            for record in data:
                print(record)
    """
    try:
        db_connector = devnet_connection()

        # En caso de que la conexion a las BD falle
        if db_connector is None:
            raise ValueError(
                "No se pudo establecer la conexión con la base de datos: el conector es None."
            )

        devnet_cursor = db_connector.cursor()

        # Realizar una consulta para leer información de la base de datos
        query = f"SELECT * FROM `devnet`.`{table_name}`"
        devnet_cursor.execute(query)

        # Obtener los nombres de las columnas
        column_names = [column[0] for column in devnet_cursor.description]

        # Convertir los resultados a una lista de diccionarios
        data = []
        for row in devnet_cursor:
            row_dict = {}
            for i in range(len(column_names)):
                row_dict[column_names[i]] = row[i]
            data.append(row_dict)

        db_connector.close()

        return data

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error al obtener datos de la base de datos")
        return None


def check_failed_before(name, channel):
    """
    Verifica si un firewall ha fallado (estado 'dead') en las últimas 24 horas para un nombre y canal específicos.

    Esta función se conecta a la base de datos `historic-devnet`, consulta la tabla `firewalls`, 
    y busca si existe una entrada en la que el firewall esté en estado 'dead' 
    en las últimas 24 horas para un nombre y canal dados.

    Args:
        name (str): Nombre del firewall.
        channel (str): Canal asociado al firewall.

    Returns:
        str: Retorna "Si" si existe al menos una entrada con estado 'dead' en las últimas 24 horas, 
             "No" si no se encuentra ninguna, o "Error DevNet" si ocurre un error en la consulta.

    Exceptions:
        ValueError: Si la conexión a la base de datos falla y el conector es None.
        Exception: Si ocurre un error en la ejecución de la consulta SQL o en cualquier otra parte del proceso.

    Log:
        Registra los errores en caso de fallas en la conexión a la base de datos o en la ejecución de la consulta.
    """
    try:
        db_connector = historic_connection()

        # En caso de que la conexion a las BD falle
        if db_connector is None:
            raise ValueError(
                "No se pudo establecer la conexión con la base de datos: el conector es None."
            )

        historic_cursor = db_connector.cursor()

        query = f"""
        SELECT * FROM `historic-devnet`.firewalls 
            WHERE name = '{name}' AND 
            channel = '{channel}' AND 
            state = 'dead' AND 
            datetime >= NOW() - INTERVAL 24 HOUR ORDER BY datetime 
            DESC LIMIT 1
            """

        historic_cursor.execute(query)
        row = historic_cursor.fetchone()

        historic_cursor.close()
        
        if row:
            return "Si"
        else:
            return "No"

    except Exception as e:
        logging.error(e)
        logging.error(f"Error en la consulta a la BD check_failed_before en el archivo db_get_data")
        return "Error DevNet"
    
# print(check_failed_before(name="FW-Chamonate", channel="port5"))