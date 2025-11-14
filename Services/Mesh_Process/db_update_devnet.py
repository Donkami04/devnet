import traceback
import logging
from db_connections import devnet_connection
from datetime import datetime, time


def update_devnet_data(data):

    query = """
        UPDATE devnet.mesh_process
        SET
            `last_mac` = %s,
            `current_mac` = %s,
            `note` = %s,
            `last_change_date` = %s,
            `status` = %s,
            `prtg_status` = %s,
            `prtg_id` = %s,
            `status_num_clients` = %s
        WHERE `client` = %s
    """

    # Crear una lista de tuplas con los valores correspondientes para cada fila a actualizar
    data_tuple = [
        (
            mesh_element["last_mac"],
            mesh_element["current_mac"],
            mesh_element["note"],
            mesh_element["last_change_date"],
            mesh_element["status"],
            mesh_element["prtg_status"],
            mesh_element["prtg_id"],
            mesh_element["status_num_clients"],
            mesh_element["client"],
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


# testData = [
#     {
#         "id": 349,
#         "ubication": "Pala 10",
#         "device": "Cliente 1",
#         "client": "10.117.126.118",
#         "last_mac": "Prueba",
#         "current_mac": "Prueba",
#         "note": "No data",
#         "last_change_date": "2024-06-14 11:09:32",
#         "status": "Not Found",
#         "prtg_status": "Not Found",
#         "prtg_id": 0,
#         "status_num_clients": "N/A",
#         "is_currently": "Not Found",
#     },
#     {
#         "id": 353,
#         "ubication": "Pala 10",
#         "device": "Cisco AP",
#         "client": "10.117.115.110",
#         "last_mac": "Prueba",
#         "current_mac": "Prueba",
#         "note": "No data",
#         "last_change_date": "2024-09-03 19:32:08",
#         "status": "ok",
#         "prtg_status": "No operando",
#         "prtg_id": 0,
#         "status_num_clients": "ok",
#         "is_currently": "Found",
#     },
#     {
#         "id": 492,
#         "ubication": "Pala 11",
#         "device": "Cliente 2",
#         "client": "10.117.126.118",
#         "last_mac": "Prueba",
#         "current_mac": "Prueba",
#         "note": "No data",
#         "last_change_date": "2024-06-14 11:09:32",
#         "status": "N/A",
#         "prtg_status": "Not Found",
#         "prtg_id": 0,
#         "status_num_clients": "N/A",
#         "is_currently": "Not Found",
#     },
#     {
#         "id": 493,
#         "ubication": "Pala 11",
#         "device": "Cisco AP",
#         "client": "10.117.115.110",
#         "last_mac": "Prueba",
#         "current_mac": "Prueba",
#         "note": "No data",
#         "last_change_date": "2024-09-03 19:32:08",
#         "status": "ok",
#         "prtg_status": "No operando",
#         "prtg_id": 0,
#         "status_num_clients": "ok",
#         "is_currently": "Found",
#     },
# ]

# print(update_devnet_data(testData))
