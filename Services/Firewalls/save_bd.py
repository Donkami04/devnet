import datetime
import os
import mysql.connector
import traceback
import logging
from dotenv import load_dotenv
from config import database
load_dotenv()


# def save_bd(data):
def save_bd(data):
    try:
        env = os.getenv('ENVIRONMENT')

        if env == 'local':
            mydb = mysql.connector.connect(
                host=database['local']['DB_HOST'],
                user=database['local']['DB_USER'],
                password=database['local']['DB_PASSWORD'],
                database=database['local']['DB_DATABASE']
            )
        else:
            mydb = mysql.connector.connect(
                host=database['production']['DB_HOST'],
                user=database['production']['DB_USER'],
                password=database['production']['DB_PASSWORD'],
                database=database['production']['DB_DATABASE']
            )
        cursor = mydb.cursor()
    
        query = """
            UPDATE devnet.firewalls 
            SET 
                `num_users` = %s,
                `state` = %s,
                `packet_loss` = %s,
                `latency` = %s,
                `jitter` = %s,
                `failed_before` = %s,
                `datetime` = %s,
                `status_gateway` = %s
            WHERE 
                `canal` = %s 
                AND `fw` = %s
        """
        values = (
            data.get('num_users'),
            data.get('state'),
            data.get('packet_loss'),
            data.get('latency'),
            data.get('jitter'),
            data.get('failed_before'),
            data.get('datetime'),
            data.get('status_gateway'),
            data.get('canal'),
            data.get('name')
        )

        cursor.execute(query, values)
        mydb.commit()

        query_historic = """
            INSERT INTO devnet.historic_firewalls 
            (`fw`, `ip`, `canal`, `num_users`, `state`, `packet_loss`, `latency`, `jitter`, `failed_before`, `datetime`, `link`, `gateway`, `ubication`, `status_gateway`)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values_historic = (
            data['name'],
            data['ip'],
            data['canal'],
            data['num_users'],
            data['state'],
            data['packet_loss'],
            data['latency'],
            data['jitter'],
            data['failed_before'],
            data['datetime'],
            data['link'],
            data['gateway'],
            data['ubication'],
            data['status_gateway']
        )

        cursor.execute(query_historic, values_historic)
        mydb.commit()
        
        cursor.close()
        
    except Exception as e:
        logging.error(f"Error: {e}")
        logging.error(traceback.format_exc())
        if 'mydb' in locals():
            mydb.close() 

# test_data = {'id': 17, 'fw': 'FW-Copiapo', 'ip': '10.224.21.1', 'canal': 'wan1', 'num_users': '871', 'state': 'Not Found', 'packet_loss': 'PRUEBA', 'latency': 'PRUEBA', 'jitter': 'PRUEBA', 'failed_before': 'No', 'datetime': '2024-05-02 13:35:31', 'link': 'MOVISTAR / SN VPF1880276', 'gateway': '181.212.121.9', 'ubication': 'corporate', 'status_gateway': 'Up', 'fail_datetime': ''}

# save_bd(test_data)