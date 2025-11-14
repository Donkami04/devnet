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
    DELETE FROM `historic-devnet`.`candelaria_clients`
    WHERE `datetime` < %s
    """

    # Consulta SQL para insertar datos
    insert_query = """
        INSERT INTO `historic-devnet`.`mesh` (
            `ip`,
            `device`, 
            `eqmt`, 
            `ping_avg`, 
            `minimo`, 
            `maximo`, 
            `packet_loss`, 
            `lastvalue`, 
            `lastup`, 
            `lastdown`, 
            `nivel_senal`, 
            `ruido_senal`, 
            `tiempo_conexion`, 
            `conectado_a`, 
            `status_dispatch`, 
            `operador`, 
            `snr`, 
            `id_prtg`, 
            `distance`, 
            `fail_senal`, 
            `fail_time_senal`, 
            `fail_snr`, 
            `fail_time_snr`, 
            `datetime`
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        )
    """

    # Crear una lista de tuplas con los valores correspondientes para cada fila a insertar
    data_tuple = [
        (
            mesh_element["ip_device"],
            mesh_element["name_device"],
            mesh_element["eqmt"],
            mesh_element["avg_ping"],
            mesh_element["min_ping"],
            mesh_element["max_ping"],
            mesh_element["packet_loss"],
            mesh_element["last_value_ping"],
            mesh_element["last_up_ping"],
            mesh_element["last_down_ping"],
            mesh_element["signal_strength"],
            mesh_element["signal_noise"],
            mesh_element["connected_for"],
            mesh_element["ap_name"],
            mesh_element["status_dispatch"],
            mesh_element["operador"],
            mesh_element["snr_level"],
            mesh_element["id_prtg"],
            mesh_element["distance"],
            mesh_element["fail_senal"],
            mesh_element["fail_time_senal"],
            mesh_element["fail_snr"],
            mesh_element["fail_time_snr"],
            mesh_element["datetime"],
        )
        for mesh_element in data
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

# data = [{'ip_device': '10.117.115.184', 'name_device': 'Pala 61', 'eqmt': 'P61', 'avg_ping': '153 msec', 'min_ping': '15 msec', 'max_ping': '174 msec', 'packet_loss': '0 %', 'last_value_ping': '32 msec', 'last_up_ping': '03-09-2024 18:34:36 [4 m 23 s ago]', 'last_down_ping': '03-09-2024 18:29:41 [9 m 18 s ago]', 'signal_strength': '-79 dBm', 'signal_noise': '14 dB', 'connected_for': '2 Min', 'ap_name': 'CAN-MAPRW-23', 'status_dispatch': '4-LIMPIEZA PATO', 'operador': 'VERA WARNER', 'snr_level': 'N/A', 'id_prtg': 13600, 'distance': 0.0, 'fail_senal': 0, 'fail_time_senal': 0, 'fail_snr': 0, 'fail_time_snr': 0, 'datetime': '2024-09-03 17:39:24'}]

# save_historic_data(data)