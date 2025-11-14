import logging
import logger_config
import requests
import warnings
import os
import datetime
import time
import traceback
import paramiko
import re
from db_get_data import get_data
from command_bgp import bgp_function
from command_ospf import ospf_function
from command_eigrp import eigrp_function
from command_route import route_function
from status_neighbor import status_neighbor
from commands_ot.clcanot_dcs import eigrp_clcanot_dcs_function
from commands_ot.clcanot_ug import eigrp_clcanot_ug_function
from commands_ot.clcanot_ugmine import eigrp_clcanot_ugmine_function
from interfaces_descriptions import get_interfaces_descriptions


def process_neighbors(data_switches):
    try:
        current_data_neighbors = []
        for switch in data_switches:
            ip_switch = switch["ip"]
            name_switch = switch["name_switch"]
            red = switch["red"]
            logging.info(f"{ip_switch} - {name_switch} - {red} Actualizando estado de los Neighbors")

            data_bgp = bgp_function(switch)
            data_eigrp = eigrp_function(switch)
            data_ospf = ospf_function(switch)
            data_clcanot_dcs = eigrp_clcanot_dcs_function(ip_switch, red, name_switch)
            data_clcanot_ug = eigrp_clcanot_ug_function(ip_switch, red, name_switch)
            data_clcanot_ugmine = eigrp_clcanot_ugmine_function(
                ip_switch, red, name_switch
            )
            data_neighbors = (
                data_bgp
                + data_eigrp
                + data_ospf
                + data_clcanot_dcs
                + data_clcanot_ug
                + data_clcanot_ugmine
            )
            data_neighbors = [
                e
                for e in data_neighbors
                if e.get("name_switch") not in ["CORE-OT-NX-CONC", "CORE-OT-NX-ADM"]
            ]

            for neigh in data_neighbors:
                current_data_neighbors.append(neigh)
                
        return current_data_neighbors

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            f"Error en la funcion `process_neighbors` en el archivo neighbors"
        )


def status_neighbor(current_neighbors):
    try:
        
        dataNeighbor = get_data(table_name="data_neighbors")

        for data in dataNeighbor:
            data.pop("id", None)

        for neighbor in dataNeighbor:
            if neighbor in current_neighbors:
                neighbor["status"] = "Up"
            else:
                neighbor["status"] = "Down"

        return dataNeighbor

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(
            f"Error en la funcion `status_neighbor` en el archivo neighbors"
        )

def get_interfaces_descriptions(data_switches):
    
    data_interfaces = []
    for element in data_switches:
        ip_switch = element["ip"]
        ip_list = ["10.224.127.183", "10.224.127.182", "10.224.126.89", "10.224.126.93"]

        if ip_switch in ip_list or (
            element["is_eigrp"] == 0 and element["is_bgp"] == 0 and element["is_ospf"] == 0
        ):
            pass
        else:
            try:
                
                client = paramiko.SSHClient()
                client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                client.connect(
                    hostname=ip_switch, port=22, username="roadmin", password="C4nd3*2023"
                )
                channel = client.invoke_shell()

                commands = ["terminal length 0\n", "show interface description\n"]

                for command in commands:
                    channel.send(command)
                    time.sleep(2)  # Esperar para que el comando se procese

                output = ""
                while channel.recv_ready():
                    output += channel.recv(1024).decode("utf-8")
                channel.close()
                client.close()
                
                # Parsear el output
                parsed_output = []
                lines = output.strip().split("\n")
                headers = lines[0].split()
                for line in lines[2:]:  # Ignorar la primera línea (encabezados)
                    columns = line.split()
                    entry = {
                        "name_switch": element["name_switch"],
                        "interface": columns[0],
                        "descrip": " ".join(columns[3:]),
                    }
                    parsed_output.append(entry)

                parsed_output = parsed_output[
                    1:-1
                ]  # Eliminar el primer y ultimo elemento porque estan malos, es parte del output que no interesa

                # Transformamos las interfaces que sean del tipo Vlan9999 por Vl9999 para que coincidan
                for entry in parsed_output:
                    if "Vlan" in entry["interface"]:
                        entry["interface"] = entry["interface"].replace("Vlan", "Vl")

                data_interfaces.extend(parsed_output)

            except Exception as e:
                logging.error(traceback.format_exc())
                logging.error(e)
                logging.error("Error en funcion get_interfaces_description en el archivo neighbors")
                return []
    return data_interfaces

def set_interfaces_descriptions(interfaces_description, status_data_neighbors):
    try:
        for element in status_data_neighbors:
            element["interface_descrip"] = ""
            if "Vlan" in element["interface"]:
                element["interface"] = element["interface"].replace("Vlan", "Vl")

        # interfaces_description = []
        # for switch in data_switches:
        #     data = get_interfaces_descriptions(switch)
        #     if data != None:
        #         for element in data:
        #             interfaces_description.append(element)

        for item in interfaces_description:
            for element in status_data_neighbors:
                if (
                    element["name_switch"] == item["name_switch"]
                    and element["interface"] == item["interface"]
                ):
                    element["interface_descrip"] = item["descrip"]
                    # break

        return status_data_neighbors

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error("Error en funcion set_interfaces_description en el archivo neighbors")
