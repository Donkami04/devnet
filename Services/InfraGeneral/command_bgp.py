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

def bgp_function(switch):
    ip_switch = switch['ip']
    red = switch['red']
    name = switch['name_switch']
    is_bgp = switch['is_bgp']
    
    if is_bgp == 0:
        return []
    
    else:
        try:
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(hostname=ip_switch, port=22, username='roadmin', password='C4nd3*2023')
            channel = client.invoke_shell()

            commands = [
                "sh ip bgp summary\n"
            ]

            for command in commands:
                channel.send(command)
                time.sleep(1)  # Esperar para que el comando se procese

            output = ""
            while channel.recv_ready():
                output += channel.recv(1024).decode('utf-8')
            channel.close()
            client.close()
            neighbor_list = re.findall(r'(\d+\.\d+\.\d+\.\d+)\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\w+\s+\d+', output)

            data_list = []
            for ip in neighbor_list:
                neighbor_data = {
                    'ip_neighbor': ip,
                    'ip_switch': ip_switch,
                    'neighbor': 'bgp',
                    'red':red,
                    'name_switch':name,
                    'interface': "N/A"
                }
                data_list.append(neighbor_data)
            return data_list
        
        except Exception as e:
            logging.error("Error en funcion BGP")
            logging.error(e)
            logging.error(traceback.format_exc())
            
            data = [{
                'ip_neighbor': 'Not Found / Error', 
                'ip_switch': ip_switch,
                'neighbor': 'bgp',
                'red':red,
                'name_switch':name,
                'interface': "N/A"
            }]
            return data
    
