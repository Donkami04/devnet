import logger_config
import requests
import os
import traceback
import logging
import re
from dotenv import load_dotenv

load_dotenv()
PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def get_prtg_id(client):
    """
    Obtiene el ID de PRTG (objid) para un dispositivo desde la API de PRTG.

    Esta función consulta la API de PRTG utilizando la dirección IP del cliente para
    obtener el ID asociado al dispositivo (objid). Si la consulta no encuentra ningún
    dispositivo, se asigna 'Not Found' al campo `id_prtg` del cliente. En caso de un
    error en la solicitud o en la lógica de la función, se asigna 'Error PRTG' al campo `id_prtg`.

    Args:
        client (dict): Diccionario que contiene los datos del cliente, incluyendo
                       la dirección IP bajo la clave "ip".

    Returns:
        dict: El diccionario del cliente con el campo `id_prtg` actualizado con el ID de PRTG,
              'Not Found' si no se encontró el dispositivo, o 'Error PRTG' en caso de error.
    """
    try:
        url_prtg_ip = os.getenv('URL_PRTG_IP').format(ip=client["ip"], username=PRTG_USERNAME, password=PRTG_PASSWORD)
        prtg_response = requests.get(url_prtg_ip, verify=False).json()
        if len(prtg_response['devices']) == 0:
            client["id_prtg"] = 'Not Found'
            return client
        else:
            client["id_prtg"] = prtg_response['devices'][0]['objid']
            return client
        
    except Exception as e:
        client["id_prtg"] = 'Error PRTG'
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error(f'Error con el Cliente {client["ip"]}')
        logging.error("Error en la funcion `get_prtg_id` del archivo `main`")
        return client
    
def get_prtg_data(client):
    """
    Obtiene los datos del sensor de un dispositivo desde la API de PRTG.

    Esta función consulta la API de PRTG utilizando el ID de PRTG (`id_prtg`) del cliente
    para obtener información sobre el sensor asociado al dispositivo. Si el `id_prtg`
    es 'Error PRTG' o 'Not Found', se asignan esos valores a los campos `status_prtg`,
    `last_up_prtg` y `last_down_prtg` del cliente. Si la consulta no encuentra sensores,
    se asigna 'Not Found' a esos campos. En caso de un error en la solicitud o en la lógica
    de la función, se asigna 'Error PRTG' a los mismos campos.

    Args:
        client (dict): Diccionario que contiene los datos del cliente, incluyendo
                       el ID de PRTG bajo la clave `id_prtg`.

    Returns:
        dict: El diccionario del cliente con los campos `status_prtg`, `last_up_prtg`, 
              y `last_down_prtg` actualizados con la información obtenida de PRTG, 
              o con valores predeterminados en caso de error o falta de datos.
    """
    try:
        # Si no hay id_prtg no se puede obtener la informacion necesaria
        if client["id_prtg"] == 'Error PRTG' or client["id_prtg"] == 'Not Found':
            client["status_prtg"] = client["id_prtg"]
            client["last_up_prtg"] = client["id_prtg"]
            client["last_down_prtg"]= client["id_prtg"]
            return client
        
        else:
            url_prtg_id = os.getenv('URL_PRTG_ID').format(id_device=client["id_prtg"], username=PRTG_USERNAME, password=PRTG_PASSWORD)
            prtg_response = requests.get(url_prtg_id, verify=False).json()
            
            if prtg_response['sensors'] == []:
                client["status_prtg"] = "Not Found"
                client["last_up_prtg"] = "Not Found"
                client["last_down_prtg"]= "Not Found"
                return client

            else:
                data = prtg_response['sensors'][0]
                last_up_prtg = data['lastup']
                last_down_prtg = data['lastdown']
                
                # Formatear el last_up y last_down
                patron = re.compile(r'<.*?>') 
                last_up_prtg_formated =  re.sub(patron, '', last_up_prtg)
                last_down_prtg_formated =  re.sub(patron, '', last_down_prtg)

                client["status_prtg"] = data['status']
                client["lastup_prtg"] = last_up_prtg_formated
                client["lastdown_prtg"]= last_down_prtg_formated
                return client
        
    except Exception as e:
        client["status_prtg"] = "Error PRTG"
        client["last_up_prtg"] = "Error PRTG"
        client["last_down_prtg"]= "Error PRTG"
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error(f'Error con el Cliente {client["ip"]}')
        logging.error("Error en la funcion `get_prtg_data` del archivo `main`")
        return client
    
# client = {"ip": "10.225.196.21", "id_prtg": 15091}
# response = get_prtg_data(client)
# print(response)