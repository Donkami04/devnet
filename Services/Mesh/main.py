import warnings, requests, os, time, traceback, datetime, sched, re, logging, xmltodict
import mysql.connector
import logger_config
from dotenv import load_dotenv
from config import database
from datetime import timedelta, datetime
from controladora import get_data_controladora
from dispatch import get_data_dispatch
from actility_position import get_actility_data
from cande_position import get_cande_data
from calculate_distance import get_distance
from counter import counter_function
from db_get_data import get_data
from db_update_devnet import update_db_fail_counters, update_devnet_data, datetime_register
from db_insert_historic import save_historic_data
from api_prtg import get_prtg_id, get_prtg_ValueLastUpDown, get_pingData
from db_get_data import get_data


def main():
    try:

        load_dotenv()
        data_mesh = get_data(table_name="mesh")

        # Actualizamos de ser necesario los contadores de FAILS
        update_db_fail_counters()

        final_data = []

        for device in data_mesh:
            ip_device = device["ip"]
            name_device = device["device"]
            eqmt = device["eqmt"]
            logging.info(f"Consultando informacion: {name_device}")

            # Obtenemos el Objid del device en PRTG
            deviceId_prtg = get_prtg_id(ip_device)

            # En caso de que `deviceId_prtg` sea Not Found o Error DevNet
            # los demas valores dependientes de este Id tendran este mismo valor
            if deviceId_prtg == "Not Found" or deviceId_prtg == "Error DevNet":
                sensorId = deviceId_prtg
                last_value_ping = deviceId_prtg
                last_up_ping = deviceId_prtg
                last_down_ping = deviceId_prtg
                avg_ping = deviceId_prtg
                min_ping = deviceId_prtg
                max_ping = deviceId_prtg
                packet_loss = deviceId_prtg

            if deviceId_prtg != "Not Found" and deviceId_prtg != "Error DevNet":
                sensorId, last_value_ping, last_up_ping, last_down_ping = (
                    get_prtg_ValueLastUpDown(deviceId_prtg)
                )

            if sensorId != "Not Found" and sensorId != "Error DevNet":
                avg_ping, min_ping, max_ping, packet_loss = get_pingData(sensorId)

            netmiko_data = get_data_controladora(ip_device)
            signal_strength = netmiko_data["signal_strength"]
            signal_noise = netmiko_data["signal_noise"]
            connected_for = netmiko_data["connected_for"]
            ap_name = netmiko_data["ap_name"]
            snr_level = netmiko_data["snr_level"]

            ap_longitude, ap_latitude = get_actility_data(ap_name) #! Descomentar
            elem_longitude, elem_latitud = get_cande_data(eqmt) #! Descomentar
            distance = get_distance(ap_longitude, ap_latitude, elem_longitude, elem_latitud) #! Descomentar
            # distance = 0.0  #! Borrar, en local no se puede acceder a lat y longt de los equipos
            status_dispatch, operador = get_data_dispatch(eqmt)
            fail_senal, fail_time_senal, fail_snr, fail_time_snr = counter_function(
                ip_device, signal_strength, snr_level, data_mesh
            )

            now = datetime.now()
            now_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
            now_datetime = str(now_datetime)
            # Este query se usa para actualizar la tabla mesh a la cual la API consulta.
            # fail_senal, fail_time_senal, fail_snr, fail_time_snr = counter_function(ip_device, signal_strength, snr_level, data_mesh)

            data_elemen_mesh = {
                "ip_device": ip_device,
                "name_device": name_device,
                "eqmt": eqmt,
                "avg_ping": avg_ping,
                "min_ping": min_ping,
                "max_ping": max_ping,
                "packet_loss": packet_loss,
                "last_value_ping": last_value_ping,
                "last_up_ping": last_up_ping,
                "last_down_ping": last_down_ping,
                "signal_strength": signal_strength,
                "signal_noise": signal_noise,
                "connected_for": connected_for,
                "ap_name": ap_name,
                "status_dispatch": status_dispatch,
                "operador": operador,
                "snr_level": snr_level,
                "id_prtg": deviceId_prtg,
                "distance": distance,
                "fail_senal": fail_senal,
                "fail_time_senal": fail_time_senal,
                "fail_snr": fail_snr,
                "fail_time_snr": fail_time_snr,
                "datetime": now_datetime,
            }

            final_data.append(data_elemen_mesh)

        devnet_bd_response = update_devnet_data(final_data)
        historic_bd_response = save_historic_data(final_data)
        
        if devnet_bd_response is True and historic_bd_response is True:
            datetime_register(system_name="mesh", status="OK")
        else:
            datetime_register(system_name="mesh", status="ERROR")

        logging.info("Terminado Ciclo")

    except Exception as e:
        datetime_register(system_name="mesh", status="ERROR")
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error("Error en main")


def bucle(scheduler):

    main()
    scheduler.enter(300, 1, bucle, (scheduler,))


if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()
