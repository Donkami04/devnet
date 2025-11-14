import paramiko
import time
import re
import logging, traceback

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)
paramiko_logger = logging.getLogger("paramiko")
paramiko_logger.setLevel(logging.WARNING)

# def route_function(ip_switch, red, name):
def route_function(data_switches):

    final_data = []
    
    for sw in data_switches:
        ip_switch = sw.get("ip", "")
        red = sw.get("red", "")
        name = sw.get("name_switch", "")
        
        if ip_switch == "10.224.127.1" or ip_switch == "10.224.127.2" or ip_switch == "10.230.127.1":
            try:
                logging.info(f"({ip_switch}) Actualizando estado de los route_default")
                client = paramiko.SSHClient()
                client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
                client.connect(hostname=ip_switch, port=22, username='roadmin', password='C4nd3*2023')
                channel = client.invoke_shell()

                commands = [
                    "show ip route 0.0.0.0\n"
                ]

                for command in commands:
                    channel.send(command)
                    time.sleep(1)

                output = ""
                while channel.recv_ready():
                    output += channel.recv(1024).decode('utf-8')
                channel.close()
                client.close()
                data = {
                    'red': red,
                    'name_switch': name,
                }
                    
                if 'via "bgp 65001"' not in output:
                    data['via_bgp'] = 'false'
                    data['ip_switch'] = ip_switch
                    final_data.append(data)
                    continue
                
                data['via_bgp'] = 'true'
                data['ip_switch'] = ip_switch
                final_data.append(data)
                
                
            except Exception as e:
                logging.error("Error en funcion route_function en el archivo command_route")
                logging.error(e)
                logging.error(traceback.format_exc())
                
                data = {
                    'red': red,
                    'name_switch': name,
                    'via_bgp': 'Error',
                    'ip_switch': ip_switch,
                }
                    
                return data

    return final_data
# route_function('10.230.127.1', 'it', 'OJOS')