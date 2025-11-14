import paramiko
import time
import re
import logging
import logger_config
import traceback


def get_interfaces_descriptions(switch):
    print('Entrando a get_interfaces_descriptions', switch)
    ip_switch = switch["ip"]
    ip_list = ["10.224.127.183", "10.224.127.182", "10.224.126.89", "10.224.126.93"]

    if ip_switch in ip_list or (switch["is_eigrp"] == 0 and switch["is_bgp"] == 0 and switch["is_ospf"] == 0):
        pass
    else:
        try:
            print('Entrando a try <================')
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
            print('output', output)
            # Parsear el output
            parsed_output = []
            lines = output.strip().split("\n")
            headers = lines[0].split()
            for line in lines[2:]:  # Ignorar la primera línea (encabezados)
                columns = line.split()
                entry = {
                    "name_switch": switch["name_switch"],
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
            print('parsed_output', parsed_output)
            return parsed_output

        except Exception as e:
            logging.error("Error en funcion INTERFACES DESCRIPTION")
            logging.error(e)
            logging.error(traceback.format_exc())

# get_interfaces_descriptions({"ip": "10.224.127.1", 'is_eigrp': 1, 'is_bgp': 1, 'is_ospf': 1, 'name_switch': 'SW1'})
