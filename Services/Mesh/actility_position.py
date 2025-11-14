import logging
import mysql.connector
import traceback
import os
from config import database
from dotenv import load_dotenv
from db_connections import devnet_connection

load_dotenv()
env = os.getenv("ENVIRONMENT")


def get_actility_data(ap_name):
    """
    Obtiene los datos de latitud y longitud de un dispositivo basado en su nombre de punto de acceso (AP) desde la base de datos.

    Esta función consulta la base de datos `devnet` para obtener la latitud y longitud de un
    dispositivo que coincida con el nombre de punto de acceso proporcionado. Si el dispositivo
    no se encuentra o si los valores de latitud y longitud son 0.0, devuelve coordenadas
    predeterminadas (99.999, 99.999). En caso de error, también devuelve estas coordenadas
    predeterminadas y registra la excepción en los logs.

    Args:
        ap_name (str): Nombre del punto de acceso del dispositivo.

    Returns:
        tuple: Una tupla que contiene la latitud y la longitud del dispositivo. Si no se
        encuentran datos o en caso de error, devuelve (99.999, 99.999).
    """
    try:
        db_connector = devnet_connection()
        devnet_cursor = db_connector.cursor()
        query = f"SELECT * FROM devnet.data_mesh_actility WHERE name = '{ap_name}'"
        devnet_cursor.execute(query)

        # Lee todas las filas para asegurarse de que no queden resultados sin leer
        rows = devnet_cursor.fetchall()
        if not rows:
            db_connector.commit()
            return 99.999, 99.999

        # Usa la primera fila
        row = rows[0]
        column_names = [column[0] for column in devnet_cursor.description]

        device = {column_names[i]: row[i] for i in range(len(column_names))}

        db_connector.commit()
        devnet_cursor.close()

        if device["latitude"] == 0.0 or device["longitude"] == 0.0:
            latitude = 99.999
            longitude = 99.999
            return latitude, longitude

        return device["latitude"], device["longitude"]

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error funcion `get_actility_data` en el archivo `actility_position`")
        return 99.999, 99.999


# # Ejemplo de uso
# ap_name = "CAN-RAPRW-3"
# latitude, longitude = get_actility_data(ap_name)
# print(f"Latitud: {latitude}, Longitud: {longitude}")
