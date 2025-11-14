import xml.etree.ElementTree as ET
import requests, warnings, os, datetime, time, calendar, mysql.connector, logging, traceback, sched
from dotenv import load_dotenv
from config import database

warnings.filterwarnings('ignore', message='Unverified HTTPS request')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
file_handler = logging.FileHandler('issues.log')
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
logging.getLogger().addHandler(file_handler)

load_dotenv()
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

def get_uptime():
    
    query = "SELECT * FROM devnet.data_wan"
    cursor.execute(query)
    column_names = [column[0] for column in cursor.description]

    # Convertir los resultados a una lista de diccionarios
    wanList = []
    for row in cursor:
        row_dict = {}
        for i in range(len(column_names)):
            row_dict[column_names[i]] = row[i]
        wanList.append(row_dict)

    try:
        for wan in wanList:
            ip_wan = wan.get('ip')
            logging.info(ip_wan)
            device_id_url = os.getenv('URL_PRTG_GET_ID_WITH_IP').format(ip=ip_wan)
            response_1 = requests.get(device_id_url, verify=False).json()
            device_data = response_1.get('devices', 'Not Found')
            
            # Inicializamos la data para guardar en caso de error
            data_wan = {
                'ip': ip_wan,
                'sensor_name': 'Not Found',
                'last_uptimedays': 'Not Found',
                'last_downtimedays': 'Not Found',
                'last_uptimepercent': 0.0,
                'last_downtimepercent': 0.0,
                'current_uptimepercent': 0.0,
                'today_uptimepercent': 0.0,
                'status': 'Not Found'
            }
            
            if device_data == 'Not Found' or device_data == []:
                save_bd(data_wan)
            else:
                device_id = device_data[0].get('objid')
                device_status = device_data[0].get('status', 'Not Found')
                
                if ip_wan.startswith('10.224.126'):
                    get_id_ping_url = os.getenv('URL_PRTG_GET_ID_PING_WITH_ID_SNMP').format(id_device=device_id)

                else:
                    get_id_ping_url = os.getenv('URL_PRTG_GET_ID_PING_WITH_ID').format(id_device=device_id)
                    
                response_2 = requests.get(get_id_ping_url, verify=False).json()
                sensor_ping_id = response_2.get('sensors', [{}])[0].get('objid', 'Not Found')
                sensor_name = response_2.get('sensors', [{}])[0].get('device', 'Not Found')
                if sensor_ping_id == 'Not Found' or sensor_ping_id == []:
                    logging.error(f"Sensor ping id not Found {ip_wan}")
                    save_bd(data_wan)
                else:
                    sdate_anterior, edate_anterior, sdate_actual, edate_actual, sdate_hoy, edate_hoy = dates()
                    last_month = get_wan_data(sensor_ping_id, sdate_anterior, edate_anterior)
                    current_month = get_wan_data(sensor_ping_id, sdate_actual, edate_actual)
                    today = get_wan_data(sensor_ping_id, sdate_hoy, edate_hoy)
                    
                    data_wan = {
                        'ip': ip_wan,
                        'sensor_name': sensor_name,
                        'last_uptimedays': last_month['uptime_days'],
                        'last_downtimedays': last_month['downtime_days'],
                        'last_uptimepercent': last_month['uptime_percent'],
                        'last_downtimepercent': last_month['downtime_percent'],
                        'current_uptimepercent': current_month['uptime_percent'],
                        'today_uptimepercent': today['uptime_percent'],
                        'status': device_status
                    }
                    
                    save_bd(data_wan)
                    
        cursor.close()
        logging.info("Terminado")
                    
    except Exception as e:
        logging.error(f"Error desconocido con la ip {ip_wan}")
        logging.error(f"Error: {e}")
        logging.error(f"TRAZABILIDAD: {traceback.format_exc()}")
        save_bd_datetime(status='ERROR')
                                
# Convierte el dato en float
def format_historic_data(data):
    if "?" in data:
        data = data.replace("?", "100%")
    data = ''.join(data.split())
    data = data.replace('%', '')
    data = data.replace(',', '.')
    data = round(float(data), 2)
    return data

# Extrae la informacion de PRTG respecto a los datos historicos entre dos fechas y horas
def get_wan_data(sensor_ping_id, sdate, edate):
    get_historicdata = os.getenv('URL_HISTORICDATA').format(id_ping=sensor_ping_id, sdate=sdate, edate=edate)
    response_3 = requests.get(get_historicdata, verify=False)
    xml_content = response_3.content
    root = ET.fromstring(xml_content)

    # Función recursiva para convertir un elemento XML en un diccionario
    def xml_to_dict(element):
        if len(element) == 0:
            return element.text
        result = {}
        for child in element:
            child_data = xml_to_dict(child)
            if child.tag in result:
                if isinstance(result[child.tag], list):
                    result[child.tag].append(child_data)
                else:
                    result[child.tag] = [result[child.tag], child_data]
            else:
                result[child.tag] = child_data
        # print(result['uptimepercent'])
        return result
    
    xml_dict = xml_to_dict(root)
    
    uptime_percent = xml_dict.get('uptimepercent', 'Not Found')
    downtime_percent = xml_dict.get('downtimepercent', 'Not Found')
    uptime_days = xml_dict.get('uptime', 'Not Found')
    downtime_days = xml_dict.get('downtime', 'Not Found')

    try:
        uptime_days = ' '.join(uptime_days.split())
        downtime_days = ' '.join(downtime_days.split())

        uptime_percent = format_historic_data(uptime_percent)
        downtime_percent = format_historic_data(downtime_percent)

        data = {
            "uptime_days": uptime_days,
            "downtime_days": downtime_days,
            "uptime_percent": uptime_percent,
            "downtime_percent": downtime_percent
        }
        return data
    
    except Exception as e:
        logging.error(f" {root}: {e}")
        
        data = {
            "uptime_days": uptime_days,
            "downtime_days": downtime_days,
            "uptime_percent": uptime_percent,
            "downtime_percent": downtime_percent
        }
        return data

# Define las fechas del mes anterior y mes actual
def dates():
    now = datetime.datetime.now()
    ano_actual = now.year
    ano_actual_for_mes_anterior = now.year
    mes_actual = now.month

    if mes_actual == 1:  # Si es enero, restamos un mes y ajustamos el año
        mes_anterior = 12
        ano_actual_for_mes_anterior = ano_actual - 1
    else:
        mes_anterior = mes_actual - 1

    _, num_days_anterior = calendar.monthrange(ano_actual, mes_anterior)
    _, num_days_actual = calendar.monthrange(ano_actual, mes_actual)

    sdate_anterior = f"{ano_actual_for_mes_anterior}-{mes_anterior:02d}-01-00-00-00"
    edate_anterior = f"{ano_actual_for_mes_anterior}-{mes_anterior:02d}-{num_days_anterior}-23-59-59"

    sdate_actual = f"{ano_actual}-{mes_actual:02d}-01-00-00-00"
    edate_actual = f"{ano_actual}-{mes_actual:02d}-{num_days_actual}-23-59-59"

    sdate_hoy = f"{ano_actual}-{mes_actual:02d}-{now.day:02d}-00-00-00"
    edate_hoy = f"{ano_actual}-{mes_actual:02d}-{now.day:02d}-23-59-59"
    
    return sdate_anterior, edate_anterior, sdate_actual, edate_actual, sdate_hoy, edate_hoy

# Guarda en la base de datos la data
def save_bd(data_wan):
    ip = data_wan['ip']
    sensor_name = data_wan['sensor_name']
    last_uptimedays = data_wan['last_uptimedays']
    last_uptimepercent = data_wan['last_uptimepercent']
    last_downtimedays = data_wan['last_downtimedays']
    last_downtimepercent = data_wan['last_downtimepercent']
    current_uptimepercent = data_wan['current_uptimepercent']
    today_uptimepercent = data_wan['today_uptimepercent']
    status_device = data_wan['status']
    # print(last_uptimepercent)
    query = f"INSERT INTO devnet.wan (`ip`, `sensor`, `last_uptime_days`, `last_uptime_percent`, `last_down_days`, `last_down_percent`, `current_uptime_percent`, `today_uptime_percent`, `status`)"
    values = f"VALUES ('{ip}', '{sensor_name}', '{last_uptimedays}', '{last_uptimepercent}', '{last_downtimedays}', '{last_downtimepercent}', '{current_uptimepercent}', '{today_uptimepercent}', '{status_device}')"
    cursor.execute(query + values)
    mydb.commit()

    if sensor_name == 'Not Found':
        save_bd_datetime(status='ERROR')
    else:
        save_bd_datetime(status='OK')

# Guarda en la base de datos la fecha y hora de la ultima consulta    
def save_bd_datetime(status):
    now = datetime.datetime.now()
    fecha_y_hora = now.strftime("%Y-%m-%d %H:%M:%S")
    fecha_y_hora = str(fecha_y_hora)
    cursor.execute(f"INSERT INTO fechas_consultas_wan (ultima_consulta, estado) VALUES ('{fecha_y_hora}', '{status}')")
    mydb.commit()
    


def bucle(scheduler):
    get_uptime()
    scheduler.enter(7200, 1, bucle, (scheduler,))

if __name__ == '__main__':
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()