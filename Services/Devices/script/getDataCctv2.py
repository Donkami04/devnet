import requests
import os
from dotenv import load_dotenv
import csv

load_dotenv()


def get_camaras_from_cctv():

    username = os.getenv("CCTV_USER")
    password = os.getenv("CCT_PASS")

    cctv_list_servers = [
        "10.225.0.253",
        "10.231.0.253",
        "10.225.11.253",
        "10.231.10.253",
        "10.224.116.199",
    ]

    auth = (username, password)
    data_cameras = []

    for ip_server in cctv_list_servers:
        api_cctv = os.getenv("CCTV_BASE_URL").format(ip_server=ip_server)
        data = requests.get(api_cctv, auth=auth).json()

        for elem in data["data"]:
            camera = {
                "cctvServer": ip_server,
                "integrator": elem["integrator"],
                "name": elem["name"],
                "server": elem["server"],
                "enabled": elem['status']['enabled'],
                "valid": elem['status']['valid'],
                "url": elem['url']
            }
            data_cameras.append(camera)
    print(data_cameras)
    return data_cameras


def write_csv(objects, file_name):
    # Determina las claves del diccionario como encabezados del CSV
    headers = objects[0].keys()

    # Escribe el archivo CSV
    with open(file_name, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=headers)

        # Escribe la fila de encabezados
        writer.writeheader()

        # Escribe cada objeto como una fila en el archivo
        writer.writerows(objects)


data_cameras = get_camaras_from_cctv()

write_csv(data_cameras, "camaras_gropus.csv")
