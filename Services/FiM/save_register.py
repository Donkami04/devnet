import os
import logging
import mysql.connector
import traceback
import datetime
from dotenv import load_dotenv
from config import database
import logger_config
from db_connections import devnet_connection

load_dotenv()
env = os.getenv("ENVIRONMENT")


def save_down_register(data, status):
    # Guardar en una tabla las fechas en las que la base fim estuvo down
    mydb = devnet_connection()
    cursor = mydb.cursor()

    base_name = data["name"]
    base_ip = data["ip"]

    now = datetime.datetime.now()
    fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
    fecha_y_hora = str(fecha_y_hora)

    query_down = "INSERT INTO devnet.dates_down_fimbase (base_name, base_ip, date, status) VALUES (%s, %s, %s, %s)"
    value_down = (base_name, base_ip, fecha_y_hora, status)
    cursor.execute(query_down, value_down)
    mydb.commit()
    cursor.close()


def update_status_base(data):
    # Actualiza el estado de la base en la tabla fim_base sin escribir lineas nuevas
    mydb = devnet_connection()
    cursor = mydb.cursor()

    base_ip = data["ip"]
    status_http = data["status_http"]
    status_ping = data["status_ping"]
    message = data["message"]

    query_update = f"UPDATE devnet.fim_base SET status_http = '{status_http}', status_ping = '{status_ping}', message = '{message}' WHERE base_ip = '{base_ip}'"

    cursor.execute(query_update)
    mydb.commit()
    cursor.close()
