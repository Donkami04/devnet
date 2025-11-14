import paramiko
import time
import re
import logging
import traceback

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)
paramiko_logger = logging.getLogger("paramiko")
paramiko_logger.setLevel(logging.WARNING)

def eigrp_clcanot_ug_function(ip_switch, red, name):
    if ip_switch == "10.224.127.147" or ip_switch == "10.224.127.148":
        try:
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(hostname=ip_switch, port=22, username='roadmin', password='C4nd3*2023')
            channel = client.invoke_shell()

            commands = [
                f"terminal length 0\n",
                "sh ip eigrp vrf CLCANOT_UG neighbors\n"
            ]

            for command in commands:
                channel.send(command)
                time.sleep(1)

            output = ""
            while channel.recv_ready():
                output += channel.recv(1024).decode('utf-8')
            channel.close()
            client.close()
            patron = r'\d+\s+(\S+)\s+(\S+)\s+(\d+)\s+(\S+)\s+(\d+)\s+(\w+)\s+(\d+)\s+(\d+)'

            # patron = r'\d+\s+([\d.]+)\s+(\S+)\s+(\d+)\s+([\w/]+)\s+(\d+)\s+(\w+)\s+(\d+)\s+(\d+)'
            coincidencias = re.finditer(patron, output)
            
            data_list = []


            for match in coincidencias:                
                address = match.group(1)
                interface = match.group(2)
                data = {
                    'ip_neighbor': address,
                    'interface': interface,
                    'ip_switch': ip_switch,
                    'neighbor': 'eigrp',
                    'red': red,
                    'name_switch': name
                }
                data_list.append(data)


            return data_list

        except Exception as e:
            logging.error("Error en funcion EIRGP")
            logging.error(e)
            logging.error(traceback.format_exc())
            data = [{
                'ip_neighbor': 'Not Found / Error', 
                'interface': 'Not Applicable',
                'ip_switch': ip_switch,
                'neighbor': 'eigrp',
                'red': red,
                'name_switch': name
            }]
            

            return data
    else:
        return []



# eigrp_function("10.224.127.1", "OT", "PRUEBA")