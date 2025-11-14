import traceback
import logging
from db_connections import historic_connection
from datetime import datetime, timedelta


def save_historic_data(data):
    # Calcular la fecha límite (12 meses atrás desde hoy)
    twelve_months_ago = datetime.now() - timedelta(days=365)
    twelve_months_ago_str = twelve_months_ago.strftime("%Y-%m-%d %H:%M:%S")

    # Consulta SQL para eliminar datos antiguos
    delete_query = """
    DELETE FROM `historic-devnet`.`devices`
    WHERE `datetime` < %s
    """

    # Consulta SQL para insertar datos
    insert_query = (
        "INSERT INTO `historic-devnet`.devices (host, type, site, dpto, prtg_name_device, prtg_id, prtg_sensorname, prtg_status, prtg_lastup, prtg_lastdown, "
        "cisco_device_ip, cisco_device_name, cisco_port, cisco_status, cisco_status_device, cisco_mac_address, data_backup, red, cctv_enabled, cctv_valid, ups_status, datetime) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    )

    data_tuple = [
        (
            device.get("host", ""),
            device.get("type", ""),
            device.get("site", ""),
            device.get("dpto", ""),
            device.get("prtg_name_device", ""),
            device.get("prtg_id", ""),
            device.get("prtg_sensorname", ""),
            device.get("prtg_status", ""),
            device.get("prtg_lastup", ""),
            device.get("prtg_lastdown", ""),
            device.get("cisco_device_ip", ""),
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
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        )
        for device in data
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

# test_data = [  {
#     "id": 8472234,
#     "host": "10.225.5.55",
#     "type": "Camara",
#     "site": "Padrones",
#     "dpto": "DPI",
#     "prtg_name_device": "Admin_Romana",
#     "prtg_id": "15305",
#     "prtg_sensorname": "Ping 276",
#     "prtg_status": "Up",
#     "prtg_lastup": "29-07-2024 0:40:13 [23 s ago]",
#     "prtg_lastdown": "28-05-2024 17:40:14 [61 d ago]",
#     "cisco_device_ip": "10.224.112.230",
#     "cisco_device_name": "CDCSSWDESAL-PPADR-ROMPUERTO-35.lundinmining.local",
#     "cisco_port": "GigabitEthernet1/0/10",
#     "cisco_status": "ASSOCIATED",
#     "cisco_status_device": "Up",
#     "cisco_mac_address": "14a78b152516",
#     "data_backup": False,
#     "red": "IT",
#     "cctv_enabled": "True",
#     "cctv_valid": "True",
#     "ups_status": 0,
#     "datetime": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#   },]
# save_historic_data(test_data)