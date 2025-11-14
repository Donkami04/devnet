from getDataCctv import get_camaras_from_cctv
import requests
from dotenv import load_dotenv
import os
import warnings
import mysql.connector
import logging
from config import database
from dotenv import load_dotenv
import traceback

def database_connection():
    env = 'production'
    try:
        if env == "local":
            mydb = mysql.connector.connect(
                host=database["local"]["DB_HOST"],
                user=database["local"]["DB_USER"],
                password=database["local"]["DB_PASSWORD"],
                database=database["local"]["DB_DATABASE"],
            )

        else:
            mydb = mysql.connector.connect(
                host=database["production"]["DB_HOST"],
                user=database["production"]["DB_USER"],
                password=database["production"]["DB_PASSWORD"],
                database=database["production"]["DB_DATABASE"],
            )
        return mydb

    except Exception as e:
        logging.error("Error al conectarse a la base de datos")
        logging.error(traceback.format_exc())
        logging.error(e)

def getCamerasFromPrtg():
    # load_dotenv()
    mydb = database_connection()
    cursor = mydb.cursor()
    query = "SELECT * FROM devnet.data_devices"
    cursor.execute(query)
    
    column_names = [column[0] for column in cursor.description]
    devices = []
    for row in cursor:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        devices.append(row_dict)
        
    for dev in devices:
        api_prtg_to_get_id = os.getenv('URL_PRTG_IP').format(ip=dev['ip'])
        id_sensor = requests.get(api_prtg_to_get_id).json()
        
        if id_sensor['devices'] == []:
            continue
        
        prtg_id = id_sensor['devices'][0]['objid']
        api_prtg_to_get_data = os.getenv('URL_PRTG_ID').format(id_device=prtg_id)
        data = requests.get(api_prtg).json()

