import requests
import warnings
import os
import logging
import csv
from dotenv import load_dotenv


warnings.filterwarnings("ignore", message="Unverified HTTPS request")

logging.basicConfig(level=logging.INFO, format="%(message)s")
file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter("%(message)s"))
logging.getLogger().addHandler(file_handler)

load_dotenv()
env = os.getenv("ENVIRONMENT")
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")

def main():
    ipList = ["10.224.127.180", "10.224.127.148", "172.31.250.26", "172.31.1.246", "10.123.128.239", "172.31.1.245", "172.31.1.244", "172.31.250.30", "10.224.127.147", "10.224.127.181"]
    final_data = []
    for ip in ipList:
        url_getId = f"https://10.224.241.25/api/table.json?content=devices&columns=objid,device,status&filter_host={ip}&username={PRTG_USERNAME}&password={PRTG_PASSWORD}&count=*"
        response = requests.get(url_getId, verify=False).json()
        
        if response["devices"] == []:
            continue
        
        objid_device = response["devices"][0]["objid"]
        
        url_getInterfaces = f"https://10.224.241.25/api/table.json?content=sensors&id={objid_device}&columns=device,name,objid&filter_type=SNMPTraffic&username={PRTG_USERNAME}&password={PRTG_PASSWORD}"
        response = requests.get(url_getInterfaces, verify=False).json()
        
        if response["sensors"] == []:
            continue
        
        data_sensors = response["sensors"]
        
        for interface in data_sensors:
            interface["ip"] = ip
            interface["id_device"] = objid_device
            final_data.append(interface)
            
    return final_data
    # print(final_data)
    # print(len(final_data))
    

def write_csv(data):
    # Nombre del archivo CSV
    filename = 'data_mapa_ug.csv'

    # Obtener las claves del primer diccionario como encabezados
    headers = data[0].keys()

    # Escribir los datos en el archivo CSV
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=headers)
        
        # Escribir los encabezados
        writer.writeheader()
        
        # Escribir las filas de datos
        writer.writerows(data)

    print(f'Archivo CSV "{filename}" creado con éxito.')
    
# data = main()
# write_csv(data)
