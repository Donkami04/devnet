import logger_config
import requests
import os
import traceback
import logging
import re
from dotenv import load_dotenv
from db_update_devnet import update_interfaces, datetime_register, update_sysHealth

load_dotenv()
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def update_prtg_data(data_switches):

    try:

        interfaces_finalData = []
        sysHealth_finalData = []

        for switch in data_switches:
            ip_switch = switch["ip"]
            logging.info(f"({ip_switch}) Actualizando datos de Interfaces y System Health")
            name_switch = switch["name_switch"]
            red = switch["red"]

            # Obtenemos Id de la API de PRTG
            id_prtg = get_id_prtg(ip_switch)
            if id_prtg == "Not Found" or id_prtg == "Error DevNet":
                data_prtg = {
                    "name": "No Devices Found",
                    "status": "Not Found",
                    "objid": "Not Found",
                    "ip_switch": {ip_switch},
                    "name_switch": name_switch,
                    "red": red,
                }
                interfaces_finalData.append(data_prtg)
                sysHealth_finalData.append(data_prtg)

            else:
                # Obtenemos de la API PRTG la data de las interfaces y system Health
                data_interfaces = get_data_interfaces(
                    ip_switch, id_prtg, red, name_switch
                )
                data_systemhealth = system_health(ip_switch, id_prtg, red, name_switch)

                interfaces_finalData.extend(data_interfaces)
                sysHealth_finalData.extend(data_systemhealth)

        response_interf = update_interfaces(interfaces_finalData)
        if response_interf:
            datetime_register(status="OK", system_name="inf_gen_interfaces")
        else:
            datetime_register(status="ERROR", system_name="inf_gen_interfaces")

        response_sysHealth = update_sysHealth(sysHealth_finalData)
        if response_sysHealth:
            datetime_register(status="OK", system_name="inf_gen_sysHealth")
        else:
            datetime_register(status="ERROR", system_name="inf_gen_sysHealth")

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error en la funcion `update_prtg_data` en el archivo api_prtg")
        datetime_register(status="ERROR", system_name="inf_gen_interfaces")
        datetime_register(status="ERROR", system_name="inf_gen_sysHealth")


# Obtiene Id del PRTG
def get_id_prtg(ip_switch):
    try:
        url_objid = os.getenv("URL_PRTG_GET_ID").format(
            ip=ip_switch, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )
        response_objid = requests.get(url_objid, verify=False).json()
        objid = response_objid.get("devices", [{"objid": "Not Found"}])
        if objid == []:
            objid = "Not Found"
            return objid

        objid = objid[0].get("objid", "Not Found")
        return objid

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            f"Error en la funcion get_id_prtg en el archivo api_prtg: {ip_switch}"
        )
        return ("Error DevNet",)


# Obtiene informacion de las interfaces en PRTG
def get_data_interfaces(ip_switch, id_switch, red, name_switch):
    interfaces_notFound = [
        {
            "name": "No Devices Found",
            "status": "Not Found",
            "objid": "Not Found",
            "ip_switch": ip_switch,
            "name_switch": name_switch,
            "red": red,
        }
    ]
    try:
        url_interfaces = os.getenv("URL_PRTG_GET_STATUS_INTERFACES").format(
            id_switch=id_switch, username=PRTG_USERNAME, password=PRTG_PASSWORD
        )

        response_interfaces = requests.get(url_interfaces, verify=False).json()
        interfaces = response_interfaces.get("sensors", interfaces_notFound)

        if interfaces == []:
            return []

        for interface in interfaces:
            interface["ip_switch"] = ip_switch
            interface["red"] = red
            interface["name_switch"] = name_switch

        return interfaces

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error - Funcion interfaces")
        datetime_register(status="ERROR", system_name="inf_gen_interfaces")
        return interfaces_notFound


# Obtiene Datos de los System Health
def system_health(ip_switch, id_switch, red, name_switch):
    devices_systemhealth_notFound = [
        {
            "name": "No Devices Found",
            "status": "Down",
            "objid": "Not Found",
            "lastvalue": "Not Found",
            "name_switch": name_switch,
            "ip_switch": ip_switch,
            "red": red,
        }
    ]

    try:

        url_system_health = None
        security_ips = ["10.224.116.5", "10.224.116.69"]
        if ip_switch in security_ips: 
            url_system_health = os.getenv("URL_PRTG_GET_DATA_WITHOUT_TYPE").format(id_switch=id_switch, username=PRTG_USERNAME, password=PRTG_PASSWORD)
        else:
            url_system_health = os.getenv("URL_PRTG_GET_STATUS_SYSTEM_HEALTH").format(id_switch=id_switch, username=PRTG_USERNAME, password=PRTG_PASSWORD)
        
        response_systemhealth = requests.get(url_system_health, verify=False).json()
        devices_systemhealth = response_systemhealth.get(
            "sensors", devices_systemhealth_notFound
        )

        if devices_systemhealth == []:
            return []

        for device in devices_systemhealth:
            device["ip_switch"] = ip_switch
            device["red"] = red
            device["name_switch"] = name_switch
        return devices_systemhealth

    except Exception as e:
        logging.error(f"Error - Funcion system_health")
        logging.error(e)
        logging.error(traceback.format_exc())
        datetime_register(status="ERROR", system_name="inf_gen_sysHealth")
        return devices_systemhealth_notFound
