import paramiko
import time
import re
import logging
import traceback

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler('ospf.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)
paramiko_logger = logging.getLogger("paramiko")
paramiko_logger.setLevel(logging.WARNING)

def ospf_function(switch, max_attempts=5):

    ip_switch = switch['ip']
    red = switch['red']
    name = switch['name_switch']
    is_ospf = switch['is_ospf']

    if is_ospf == 0:
        return []

    attempts = 0

    while attempts < max_attempts:
        try:
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(hostname=ip_switch, port=22, username='roadmin', password='C4nd3*2023')
            channel = client.invoke_shell()

            commands = [
                f"terminal length 0\n",
                "show ip ospf neighbor\n"
            ]

            for command in commands:
                channel.send(command)
                time.sleep(1)  # Esperar para que el comando se procese

            output = ""
            while channel.recv_ready():
                output += channel.recv(1024).decode('utf-8')
            channel.close()
            client.close()
            
            # Utilizar una expresión regular para capturar la IP y la interfaz
            neighbor_list = re.findall(r'(\d+\.\d+\.\d+\.\d+)\s+\d+\s+(\S+)\s+\d+:\d+:\d+\s+(\d+\.\d+\.\d+\.\d+)\s+(\S+)', output)
            # neighbor_list = re.findall(r'(\d+\.\d+\.\d+\.\d+)\s+\d+\s+(FULL/\w+)\s+\d+:\d+:\d+\s+(\d+\.\d+\.\d+\.\d+)\s+(\w+)', output)

            data_list = []
            for match in neighbor_list:
                ip, state, neighbor_ip, interface = match
                neighbor_data = {
                    'ip_neighbor': neighbor_ip,
                    'ip_switch': ip_switch,
                    'neighbor': 'ospf',
                    'red': red,
                    'name_switch': name,
                    'interface': interface
                }
                data_list.append(neighbor_data)

            if len(data_list) > 0:
                return data_list
            else:
                logging.warning(f"No se detecto resultado en el output en intento {attempts + 1}")
                logging.warning(output)
                attempts += 1
                time.sleep(2)  # Espera un poco antes de volver a intentar

        except Exception as e:
            logging.error("Error en funcion OSPF")
            logging.error(e)
            logging.error(traceback.format_exc())
            attempts += 1
            time.sleep(2)  # Espera un poco antes de volver a intentar

    data = [{
        'ip_neighbor': 'Not Found / Error',
        'ip_switch': ip_switch,
        'neighbor': 'ospf',
        'red': red,
        'name_switch': name,
        'interface': 'Not Found / Error'
    }]

    return data


# prueba = {"ip": "10.224.127.147", "red": "it", "name_switch": "prueba", "is_ospf": 1}
# resultado_prueba = ospf_function(prueba)
# print(resultado_prueba)
