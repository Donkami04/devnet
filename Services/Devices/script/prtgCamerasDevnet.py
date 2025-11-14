from getDataCctv import get_camaras_from_cctv
import requests
import csv


def get_camaras_registered_prtg():
    cameras_cctv = get_camaras_from_cctv() # Aqui estan todas las camaras de cctv
    
    # API DevNet
    response = requests.get("http://10.224.116.14:3001/api/v1/candelaria/devices").json()
    
    cameras = [] # Aqui estan las camaras del DevNet
    for device in response:
        if (device['type'] == "Camara" or device['type'] == "Cámara" or device['type'] == "camara" or device['type'] == "cámara"):
            cameras.append(device)
        
    data_for_csv = []
    # for camera in cameras:
    #     data = {}
    #     if camera['host'] in cameras_cctv:
    #         data['cctv'] = True
    #     if camera['host'] not in cameras_cctv:
    #         data['cctv'] = False
    #     if camera['status_prtg'] != "Not Found":
    #         data['prtg'] = True
    #     if camera['status_prtg'] == "Not Found":
    #         data['prtg'] = False
            
    for camera in cameras:
        data = {
            'ip': camera['host'],
            'site': camera['site'],
            'dpto': camera['dpto'],
            'red': camera['red'],
            'cctv': camera['host'] in cameras_cctv,
            'prtg': camera['prtg_status'] != "Not Found"
        }
        data_for_csv.append(data)
        
    # Especifica el nombre del archivo CSV que quieres crear
    csv_file = 'output.csv'

    # Obtén las cabeceras a partir de las claves del primer diccionario
    headers = data_for_csv[0].keys()

    # Escribe los datos en el archivo CSV
    with open(csv_file, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=headers)
        
        # Escribe la fila de cabeceras
        writer.writeheader()
        
        # Escribe las filas de datos
        writer.writerows(data_for_csv)

    print(f"Datos escritos en {csv_file}")


get_camaras_registered_prtg()