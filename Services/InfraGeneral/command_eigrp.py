import paramiko
import time
import re
import logging
import traceback


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler('eigrp.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)
paramiko_logger = logging.getLogger("paramiko")
paramiko_logger.setLevel(logging.WARNING)

def eigrp_function(switch, max_attempts=5):
    ip_switch = switch['ip']
    red = switch['red']
    name = switch['name_switch']
    is_eigrp = switch['is_eigrp']
    
    if is_eigrp == 0:
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
                "show ip eigrp neighbors\n"
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

            if "10.224.126.22" in output:
                data = {
                    'ip_neighbor': "10.224.126.22",
                    'interface': "Not Found",
                    'ip_switch': ip_switch,
                    'neighbor': 'eigrp',
                    'red': red,
                    'name_switch': name     
                }
                data_list.append(data)
            
            if len(data_list) > 0:
                return data_list
            else:
                logging.warning(f"No se detecto resultado en el output en intento {attempts + 1}")
                logging.warning(output)
                attempts += 1
                time.sleep(2)  # Pausa antes de volver a intentar

        except Exception as e:
            logging.error("Error en funcion EIRGP")
            logging.error(e)
            logging.error(traceback.format_exc())
            attempts += 1
            time.sleep(2)  # Pausa antes de volver a intentar

    data = [{
        'ip_neighbor': 'Not Found / Error', 
        'interface': 'Not Applicable',
        'ip_switch': ip_switch,
        'neighbor': 'eigrp',
        'red': red,
        'name_switch': name
    }]

    return data

# prueba = {'ip': '10.224.127.3', 'red': 'it', 'name_switch':'prueba', 'is_eigrp': 1}
# resultado_prueba = eigrp_function(prueba)
# print(resultado_prueba)