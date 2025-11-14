import os
import time
import traceback
import logging
import paramiko
import re
import mysql.connector
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s: %(message)s"
)
file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s: %(message)s"))
logging.getLogger().addHandler(file_handler)

load_dotenv()
env = os.getenv("ENVIRONMENT")


# def database_connection():
#     try:
#         if env == "local":
#             mydb = mysql.connector.connect(
#                 host=database["local"]["DB_HOST"],
#                 user=database["local"]["DB_USER"],
#                 password=database["local"]["DB_PASSWORD"],
#                 database=database["local"]["DB_DATABASE"],
#             )

#         else:
#             mydb = mysql.connector.connect(
#                 host=database["production"]["DB_HOST"],
#                 user=database["production"]["DB_USER"],
#                 password=database["production"]["DB_PASSWORD"],
#                 database=database["production"]["DB_DATABASE"],
#             )
#         return mydb

#     except Exception as e:
#         logging.error("Error al conectarse a la base de datos")
#         logging.error(traceback.format_exc())
#         logging.error(e)
        

# def get_data_from_db(ubication):
#     mydb = database_connection()
#     cursor = mydb.cursor()
#     query = f"SELECT * FROM devnet.mesh_process WHERE ubication = '{ubication}' and note <> 'NAT'"
#     cursor.execute(query)
    
#     column_names = [column[0] for column in cursor.description]
#     data = []
#     for row in cursor:
#         row_dict = {}
#         for i in range(len(column_names)):
#             row_dict[column_names[i]] = row[i]
#         data.append(row_dict)
        
#     if len(data) > 12:
#         return "fail"
#     else:
#         return "ok"



def run_mac_detail(mesh_clients_list):
    try:
        # mydb = database_connection()
        # cursor = mydb.cursor()
        # query = "SELECT * FROM devnet.mesh_process WHERE device = 'Cisco AP'"
        # cursor.execute(query)

        # column_names = [column[0] for column in cursor.description]
        
        # mesh_clients_list = []
        # for row in cursor:
        #     row_dict = {}
        #     for i in range(len(column_names)):
        #         row_dict[column_names[i]] = row[i]
        #     mesh_clients_list.append(row_dict)
        
        
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(
            hostname="10.224.125.137",
            port=22,
            username="roadmin",
            password="C4nd3*2023",
        )
        channel = client.invoke_shell()

        result = {}

        for mesh_client in mesh_clients_list:
            ubication = mesh_client["ubication"]
            mac = mesh_client["current_mac"]

            command = f"show wireless wgb mac-address {mac} detail\n"
            channel.send(command)
            time.sleep(2)

            output = ""
            while True:
                if channel.recv_ready():
                    output += channel.recv(1024).decode("utf-8")
                else:
                    break

            if "------------" in output:
                mac_addresses = re.findall(r"(\w{4}\.\w{4}\.\w{4})", output.split("------------")[1])
                # mac_addresses = ['000a.750e.4319', '0013.9533.a5c6', '0080.0701.1258', 'b827.ebbc.1e4d', 'cc90.70c1.72c0', 'cc90.70c1.72c6', '000a.750e.4319', '0013.9533.a5c6', '0080.0701.1258', 'b827.ebbc.1e4d', 'cc90.70c1.72c0', 'cc90.70c1.72c6', "a"]
                if ubication not in result:
                    result[ubication] = mac_addresses
                else:
                    result[ubication].extend(mac_addresses)
            else:
                print(f"No se encontraron direcciones MAC para {mac} en {ubication}")

        channel.close()
        client.close()

        # Validar el número de clientes por ubicación
        for ubication, mac_addresses in result.items():
            if len(mac_addresses) > 12:
                result[ubication] = {
                    "mac_addresses": mac_addresses,
                    "status_num_clients": get_data_from_db(ubication)
                }
            else:
                result[ubication] = {
                    "mac_addresses": mac_addresses,
                    "status_num_clients": "ok"
                }

        return result

    except Exception as e:
        logging.error("Error en funcion")
        logging.error(e)
        logging.error(traceback.format_exc())
        
        

# data_test = [
#     {
#         "id": 353,
#         "ubication": "Pala 10",
#         "device": "Cisco AP",
#         "client": "10.117.115.110",
#         "last_mac": "f01d.2d55.7512",
#         "current_mac": "f01d.2d55.dace",
#         "note": "No data",
#         "last_change_date": "2024-06-05 11:20:45",
#         "status": "ok",
#         "prtg_status": "Unusual",
#         "prtg_id": 13588,
#     },
#     {
#         "id": 354,
#         "ubication": "Pala 11",
#         "device": "Cisco AP",
#         "client": "10.117.115.110",
#         "last_mac": "f01d.2d55.7512",
#         "current_mac": "9cd5.7dd4.1e48",
#         "note": "No data",
#         "last_change_date": "2024-06-05 11:20:45",
#         "status": "ok",
#         "prtg_status": "Unusual",
#         "prtg_id": 13589,
#     }
# ]

# mac_data = run_mac_detail(data_test)
# print(mac_data)
