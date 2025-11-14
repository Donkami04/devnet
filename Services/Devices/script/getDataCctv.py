import requests
import os
from dotenv import load_dotenv
import csv

load_dotenv()

def get_camaras_from_cctv():

    username = os.getenv('CCTV_USER')
    password = os.getenv('CCT_PASS')

    cctv_list_servers = ['10.225.0.253', '10.231.0.253', '10.225.11.253', '10.231.10.253', '10.224.116.199']

    auth = (username, password)
    data_cameras = []

    for ip_server in cctv_list_servers:
        api_cctv = os.getenv('CCTV_BASE_URL').format(ip_server=ip_server)
        data = requests.get(api_cctv, auth=auth).json()

        for elem in data["data"]:
            data_cameras.append(elem["url"])
            
    return data_cameras
# nombre_archivo = "datos.csv"

# # Abrir el archivo CSV en modo de escritura
# with open(nombre_archivo, mode='w', newline='') as archivo_csv:
#     # Crear el escritor CSV
#     escritor_csv = csv.writer(archivo_csv)

#     # Escribir la primera fila con los encabezados
#     escritor_csv.writerow(['enabled', 'valid', 'url', 'id'])

#     # Iterar sobre cada diccionario en la lista y escribir las celdas correspondientes
#     for diccionario in data_cameras:
#         fila = [diccionario['status']['enabled'], diccionario['status']['valid'], diccionario['url'], diccionario['id']]
#         escritor_csv.writerow(fila)
#         # print(diccionario['status']['enabled'])
#         # print(diccionario['status']['valid'])
#         # print(diccionario['url'])
