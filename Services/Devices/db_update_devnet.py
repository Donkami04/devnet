import traceback
import logging
from db_connections import devnet_connection
from datetime import datetime


def update_devnet_data(data):
    """
    Actualiza los datos en la base de datos para los registros que coincidan con la dirección IP proporcionada.

    Esta función actualiza las columnas `status_prtg`, `lastup_prtg`, `lastdown_prtg`, `device_ip_cisco`,
    `device_cisco`, `port_cisco`, `status_cisco`, `reachability_cisco`, `id_prtg`, `status_device_cisco`
    y `data_backup` en la tabla `devices` de la base de datos `dcs` para las filas que coincidan
    con la dirección IP (`ip`) proporcionada en cada diccionario dentro de la lista `data`.

    En caso de que ocurra una excepción durante la ejecución:
    - Los detalles de la excepción se registran en los logs para su posterior análisis.
    - Se registra un mensaje de error específico indicando que hubo un problema en la función `update_devnet_data`
      dentro del archivo `db_update_devnet`.

    Args:
        data (list[dict]): Lista de diccionarios, donde cada diccionario representa los datos de un cliente
                           que se van a actualizar en la base de datos. Cada diccionario debe contener las
                           siguientes claves: `status_prtg`, `lastup_prtg`, `lastdown_prtg`, `device_ip_cisco`,
                           `device_cisco`, `port_cisco`, `status_cisco`, `reachability_cisco`, `id_prtg`,
                           `status_device_cisco`, `data_backup`, y `ip` (clave utilizada en la cláusula WHERE).

    Raises:
        Exception: Si ocurre algún error durante la conexión a la base de datos, la ejecución de la consulta,
                   o el cierre de la conexión.
    """

    query = (
        "UPDATE `devnet`.devices SET prtg_name_device = %s, prtg_id = %s, prtg_sensorname = %s, prtg_status = %s, "
        "prtg_lastup = %s, prtg_lastdown = %s, cisco_device_name = %s, cisco_port = %s, cisco_status = %s, cisco_status_device = %s, cisco_mac_address = %s, "
        "data_backup = %s, red = %s, cctv_enabled = %s, cctv_valid = %s, ups_status = %s, cisco_id = %s, cisco_device_ip = %s WHERE host = %s"
    )

    # Estructura de datos para el query
    data_tuple = [
        (
            device.get("prtg_name_device", ""),
            device.get("prtg_id", ""),
            device.get("prtg_sensorname", ""),
            device.get("prtg_status", ""),
            device.get("prtg_lastup", ""),
            device.get("prtg_lastdown", ""),
            device.get("cisco_device_name", ""),
            device.get("cisco_port", ""),
            device.get("cisco_status", ""),
            device.get("cisco_status_device", ""),
            device.get("cisco_mac_address", ""),
            device.get("data_backup", ""),
            device.get("red", ""),
            device.get("cctv_enabled", ""),
            device.get("cctv_valid", ""),
            device.get("ups_status", ""),
            device.get("cisco_id", ""),
            device.get("cisco_device_ip", ""),
            device.get("host", ""),  # Este es el campo IP para el WHERE
        )
        for device in data
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
        logging.error(e)
        logging.error(
            "Error en la función `update_devnet_data` en el archivo `db_update_devnet`"
        )
        datetime_register(system_name="devices", status="ERROR")

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


# dataTest = [
# {
#     "id": 1,
#     "host": "10.225.5.98",
#     "type": "Camara",
#     "site": "Padrones",
#     "dpto": "DPI",
#     "red": "IT",
#     "prtg_name_device": "Ping 360",
#     "prtg_id": "15355",
#     "prtg_sensorname": "Ingreso Vehiculos",
#     "prtg_status": "Up",
#     "prtg_lastup": "17-05-2025 14:01:09 [46 s ago]",
#     "prtg_lastdown": "26-02-2025 3:08:16 [80 d ago]",
#     "cisco_device_ip": "10.224.112.253",
#     "cisco_device_name": "CDBUSSWDESAL-GaritaPuerto-81.lundinmining.local",
#     "cisco_port": "GigabitEthernet0/5",
#     "cisco_status": "ASSOCIATED",
#     "cisco_status_device": "Up",
#     "cisco_mac_address": "4cbd8f4364a8",
#     "data_backup": 0,
#     "cctv_enabled": "1",
#     "cctv_valid": "1",
#     "ups_status": 0,
#     "cisco_id": 1111,
# }
# ]

# print(update_devnet_data(dataTest))
