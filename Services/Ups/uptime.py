import requests
import warnings
import os
import datetime
import re
import calendar
import traceback
import logging
import xml.etree.ElementTree as ET

from dotenv import load_dotenv

warnings.filterwarnings('ignore', message='Unverified HTTPS request')

def get_uptime(id_ping):
    try:
        PRTG_USERNAME = os.getenv("PRTG_USERNAME")
        PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")
        now = datetime.datetime.now()
        ano_actual = now.year
        mes_actual = now.month
        _, num_days = calendar.monthrange(ano_actual, mes_actual)

        sdate = f"{ano_actual}-{mes_actual:02d}-01-00-00-00"
        edate = f"{ano_actual}-{mes_actual:02d}-{num_days}-23-59-59"

        load_dotenv()
        uptime_url = os.getenv('URL_UPTIME_UPS').format(id_ping=id_ping, sdate=sdate, edate=edate, username=PRTG_USERNAME, password=PRTG_PASSWORD)
        response = requests.get(uptime_url, verify=False)
        xml_content = response.content
        
        # Parsear la respuesta XML
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
            return result

        # Convertir el elemento raíz en un diccionario
        xml_dict = xml_to_dict(root)
        uptime_percent = xml_dict['uptimepercent']
        clean_percent = re.sub(r'[^\d.]', '', uptime_percent)
        if clean_percent == '100':
            # clean_percent = float(clean_percent)
            return clean_percent
        if clean_percent == '':
            clean_percent = round(float(0), 2)
        if clean_percent != '100':
            clean_percent = round((float(clean_percent) / 1000), 2)

        return clean_percent

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error("Error en la función `get_uptime` en el archivo `uptime`")
        logging.error(e)
        return 0


