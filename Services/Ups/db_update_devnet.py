import traceback
import logging
from db_connections import devnet_connection
from datetime import datetime


def update_devnet_data(data):
    """
    Actualiza los datos de los dispositivos UPS en la base de datos de producción `devnet.ups`.

    Proceso:
    - Actualiza las filas correspondientes en la base de datos basándose en la dirección IP de cada UPS.

    Parámetros:
    - data (list): Lista de diccionarios que contienen datos de los dispositivos UPS.

    Manejo de errores:
    - Si ocurre un error durante la ejecución, se captura y se registra en los logs.
    """

    # Consulta SQL para actualizar los datos donde el valor de la columna 'ip' coincida
    query = """
    UPDATE devnet.ups SET 
        name = %s,
        status_prtg = %s,
        status_ups = %s,
        batery = %s,
        id_ups = %s,
        uptime = %s,
        ubication = %s
    WHERE ip = %s
    """

    data_tuple = [
        (
            ups["name"],
            ups["status_prtg"],
            ups["status_ups"],
            ups["batery"],
            ups["id_ups"],
            ups["uptime"],
            ups["ubication"],
            ups["ip"],  # Esto es lo que se utiliza para encontrar la fila a actualizar
        )
        for ups in data
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
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        logging.error(e)
        return False


def datetime_register(system_name, status):
    """
    Registra la fecha, hora y estado del último ciclo de actualización para un sistema específico en la base de datos.

    Proceso:
    - Actualiza el registro de la última fecha, hora y estado de un sistema en la tabla `devnet.datetime_systems`.

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


# print(
#     update_devnet_data(
#         [
#             {
#                 "id": 1,
#                 "ip": "10.224.1.8",
#                 "name": "CDBUSSWADM-PBODEGA-21-APC",
#                 "status_prtg": "Up",
#                 "status_ups": 2,
#                 "batery": 1,
#                 "id_ups": 7986,
#                 "uptime": "100",
#                 "ubication": "ADMINISTRACION",
#                 "datetime": "2024-09-17 18:54:09",
#             },
#             {
#                 "id": 2,
#                 "ip": "10.224.1.144",
#                 "name": "CDBUSSWADM-RMAPLTA-20-APC",
#                 "status_prtg": "Up",
#                 "status_ups": 2,
#                 "batery": 1,
#                 "id_ups": 8003,
#                 "uptime": "100",
#                 "ubication": "ADMINISTRACION",
#                 "datetime": "2024-09-17 18:54:12",
#             },
#             {
#                 "id": 3,
#                 "ip": "10.224.1.29",
#                 "name": "CDBUSSWADM-11-APC",
#                 "status_prtg": "Up",
#                 "status_ups": 2,
#                 "batery": 1,
#                 "id_ups": 9580,
#                 "uptime": "100",
#                 "ubication": "ADMINISTRACION",
#                 "datetime": "2024-09-17 18:54:16",
#             },
#         ]
#     )
# )
