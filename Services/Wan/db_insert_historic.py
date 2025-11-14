import traceback
import logging
from db_connections import historic_connection
from datetime import datetime, timedelta

def save_historic_data(data):
    """
    Inserta y gestiona datos históricos de dispositivos UPS en la base de datos `historic-devnet`.

    Proceso:
    - Elimina registros antiguos (mayores a 12 meses) de la base de datos histórica.
    - Inserta nuevos datos de UPS en la base de datos histórica.

    Parámetros:
    - data (list): Lista de diccionarios que contienen datos de los dispositivos UPS.

    Manejo de errores:
    - Si ocurre un error durante la ejecución, se captura y se registra en los logs.
    """
    
    print(data)
    
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime('%Y-%m-%d %H:%M:%S')

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`ups`
    WHERE `datetime` < %s
    """

    # Consulta SQL para insertar datos
    insert_query = """
    INSERT INTO `historic-devnet`.`ups` (ip, name, status_prtg, status_ups, batery, id_ups, uptime, ubication, datetime)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    data_tuple = [
        (
            ups['ip'], 
            ups['name'], 
            ups['status_prtg'], 
            ups['status_ups'], 
            ups['batery'], 
            ups['id_ups'], 
            ups['uptime'], 
            ups['ubication'],
            ups['datetime']
        ) 
        for ups in data
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
        logging.error("Error en la función `save_historic_data` en el archivo `db_insert_historic`")
        logging.error(e)
        
        return False
