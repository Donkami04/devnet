import logging
import traceback
from  db_connection import devnet_connection

def get_devnet_data(table_name):
    """
    Obtiene los datos actuales de una tabla específica en la base de datos `devnet`.

    Proceso:
    - Establece una conexión con la base de datos de producción.
    - Realiza una consulta SQL para obtener todos los registros de la tabla especificada.
    - Convierte los resultados en una lista de diccionarios, donde las claves son los nombres de las columnas.

    Parámetros:
    - table_name (str): Nombre de la tabla desde la cual se desean obtener los datos.

    Retorna:
    - list: Una lista de diccionarios que contiene los datos de la tabla.
    - None: Si ocurre un error durante la ejecución o la conexión a la base de datos falla.

    Manejo de errores:
    - Si ocurre un error durante la ejecución, se captura y se registra en los logs.
    - Si la conexión a la base de datos falla, se levanta un ValueError.
    """
    
    try:
        db_connector = devnet_connection()
        
        # En caso de que la conexion a las BD falle
        if db_connector is None:
            raise ValueError("No se pudo establecer la conexión con la base de datos: el conector es None.")

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
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error(f"Error al obtener datos de la base de datos")
        logging.error(f"Error en la funcion `get_data` en el archivo `get_data`")
        return None
