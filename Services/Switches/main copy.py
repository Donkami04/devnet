import warnings, requests, os, time, traceback, re, sched, datetime, logging
import mysql.connector
from dotenv import load_dotenv
from config import database

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s: %(message)s')
file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s: %(message)s'))
logging.getLogger().addHandler(file_handler)
load_dotenv()

def switches():
    env = os.getenv('ENVIRONMENT')
    
    # Conexión a la BD
    if env == 'local':
        mydb = mysql.connector.connect(
        host=database['local']['DB_HOST'],
        user=database['local']['DB_USER'],
        password=database['local']['DB_PASSWORD'],
        database=database['local']['DB_DATABASE']
        )
        
    if env == 'production':
        mydb = mysql.connector.connect(
        host=database['production']['DB_HOST'],
        user=database['production']['DB_USER'],
        password=database['production']['DB_PASSWORD'],
        database=database['production']['DB_DATABASE']
        )
        
    cursor = mydb.cursor()

    # Realizar una consulta para leer información de la base de datos
    query = "SELECT * FROM devnet.data_switches"
    cursor.execute(query)

    # Obtener los nombres de las columnas
    column_names = [column[0] for column in cursor.description]

    # Convertir los resultados a una lista de diccionarios
    allSwitches = []
    for row in cursor:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        allSwitches.append(row_dict)
        

    try:
        # Para cada IP hacemos las consultas a PRTG y a Cisco
        for switch in allSwitches:
            ip = switch['ip']
            group = switch['group']
            name=switch['dispositivo']
            logging.info(ip)

            prtg_data = get_prtg_data(ip)
            name = prtg_data['name']
            status = prtg_data['status']
            last_up = prtg_data['last_up']
            last_down = prtg_data['last_down']
            
            status_cisco_device = get_cisco_data(ip)
            
            # Una vez obtenidos los datos guardamos en la BD
            sql = f"INSERT INTO switches (dispositivo, ip, tipo, status_prtg, lastup_prtg, lastdown_prtg, reachability, ups1, ups2, status_ups1, status_ups2, `group`)"
            val = f"VALUES ('{name}', '{ip}', 'Switch', '{status}', '{last_up}', '{last_down}', '{status_cisco_device}', 'NA', 'NA', 'NA', 'NA', '{group}')"
            consulta = f"{sql} {val}"
            cursor.execute(consulta)
            mydb.commit()
        
        # Guardamos la fecha y hora de la consulta en la BD    
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        sql_datetime = f"INSERT INTO fechas_consultas_switches (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'OK')"
        cursor.execute(sql_datetime)
        mydb.commit()   
        cursor.close()

        logging.info('Terminado')
            
    except Exception:
        # En caso de error se detiene la función y se guarda la fecha y hora y el estado error
        now = datetime.datetime.now()
        fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
        fecha_y_hora = str(fecha_y_hora)
        sql_datetime = f"INSERT INTO fechas_consultas_switches (ultima_consulta, estado) VALUES ('{fecha_y_hora}', 'ERROR')"
        cursor.execute(sql_datetime)
        mydb.commit()
        cursor.close()


def get_prtg_data(ip):
    # Función encargada de obtener los datos de PRTG y guardarlos en una variable.
    # Inicializamos la variable como Not Found en caso de no recibir data de la API.
    prtg_data = {
        'name': 'Not Found',
        'status': 'Not Found',
        'last_up': 'Not Found',
        'last_down': 'Not Found'
    }
    
    try:
        URL_PRTG_IP = os.getenv('URL_PRTG_IP').format(ip=ip)
        prtg_ip_response = requests.get(URL_PRTG_IP, verify=False).json()
        
        if len(prtg_ip_response['devices']) == 0:
            return prtg_data    
        else:
            id_device_prtg = prtg_ip_response['devices'][0]['objid']
            URL_PRTG_ID = os.getenv('URL_PRTG_ID').format(id_device=id_device_prtg)
            prtg_data = requests.get(URL_PRTG_ID, verify=False).json()
            sensor = prtg_data['sensors'][0]
            status = sensor['status']
            name = sensor['device']
            last_up = sensor['lastup']
            last_down = sensor['lastdown']
            
            patron = re.compile(r'<.*?>') # Se usa para formatear el last_up y last_down
            last_up =  re.sub(patron, '', last_up)
            last_down =  re.sub(patron, '', last_down)
            
            prtg_data['name'] = name
            prtg_data['status'] = status
            prtg_data['last_up'] = last_up
            prtg_data['last_down'] = last_down
            
            return prtg_data
    
    except Exception as e:
        logging.error(f"Error con el IP en Funcion 'get_prtg_data'  {ip}")
        logging.error(traceback.format_exc())
        logging.error(e)
        
        return prtg_data

def get_cisco_data(ip):
    # Función encargada de obtener los datos de CISCO y guardarlos en una variable.
    try:
        URL_CISCO_IP_DEVICE = os.getenv('URL_CISCO_IP_DEVICE').format(ip=ip)
        cisco_ip_response = requests.get(URL_CISCO_IP_DEVICE, verify=False).json()
        if cisco_ip_response['queryResponse']['@count'] == 0:
            return 'Not Found'
        
        else:
            cisco_id_client = cisco_ip_response.get('queryResponse', 'Not Found').get('entityId', [])[0].get('$', 'Not Found')
            URL_CISCO_ID_DEVICE = os.getenv('URL_CISCO_ID_DEVICE').format(id_device=cisco_id_client)
            cisco_data_device = requests.get(URL_CISCO_ID_DEVICE, verify=False).json()
            status_cisco_device = cisco_data_device.get('queryResponse', 'Not Found').get('entity', [])[0].get('devicesDTO', 'Not Found').get('reachability', 'Not Found')
            return status_cisco_device
    
    except Exception as e:
        logging.error(f"Error con el IP en Funcion 'get_cisco_data' {ip}")
        logging.error(traceback.format_exc())
        logging.error(e)
        return 'Not Found'
    

def bucle(scheduler):
    #Funcion encargada de ejecutar el proceso principal cada 5 minutos.
    switches()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()


