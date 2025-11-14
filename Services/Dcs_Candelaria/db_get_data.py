import logger_config
import logging
import traceback
from db_connections import devnet_connection, historic_connection

def get_data(table_name):
    """
    Obtiene los datos actuales de la tabla especificada en la base de datos `devnet`.

    Conecta a la base de datos, ejecuta una consulta para seleccionar todos los registros
    de la tabla indicada, y convierte los resultados en una lista de diccionarios, donde
    cada diccionario representa una fila con los nombres de las columnas como claves.

    Parámetros:
        table_name (str): El nombre de la tabla de la que se desea obtener los datos.

    Retorno:
        list of dict: Una lista de diccionarios, donde cada diccionario representa una fila
                      de la tabla, con los nombres de las columnas como claves y los valores
                      correspondientes. Si ocurre un error durante el proceso, retorna `None`.

    Excepciones:
        ValueError: Si no se puede establecer la conexión con la base de datos.
        Exception: Cualquier otra excepción que ocurra durante la ejecución.

    Ejemplo de uso:
        data = get_data("candelaria_clients")
        if data:
            for record in data:
                print(record)
    """
    try:
        db_connector = devnet_connection()

        # En caso de que la conexion a las BD falle
        if db_connector is None:
            raise ValueError("No se pudo establecer la conexión con la base de datos: el conector es None.")

        devnet_cursor = db_connector.cursor()

        # Realizar una consulta para leer información de la base de datos
        query = f"SELECT * FROM `devnet`.`{table_name}`"
        devnet_cursor.execute(query)

        # Obtener los nombres de las columnas
        column_names = [column[0] for column in devnet_cursor.description]

        # Convertir los resultados a una lista de diccionarios
        data = []
        for row in devnet_cursor:
            row_dict = {}
            for i in range(len(column_names)):
                row_dict[column_names[i]] = row[i]
            data.append(row_dict)

        db_connector.close()

        return data

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error(f"Error al obtener datos de la base de datos")
        return None

def get_historic_cisco_data(client):
    """
    Busca en la base de datos histórica la información más reciente del cliente 
    proporcionado, asegurando que el campo `device_cisco` no tenga el valor 'Not Found'. 
    Actualiza el diccionario `client` con la información más reciente encontrada o 
    asigna valores predeterminados en caso de no encontrar datos o si ocurre un error.
    En caso de encontrar el valor desde los datos historicos definira la propiedad
    `data_backup` = True, de lo contrario `data_backup` = False.
    
    Parámetros:
        client (dict): Diccionario que contiene la información del cliente, 
                       incluyendo la dirección IP (clave 'ip').
    
    Retorno:
        dict: El diccionario `client` con la información actualizada o con 
              valores predeterminados en caso de error o falta de datos.
    
    Excepciones:
        ValueError: Si no se puede establecer la conexión con la base de datos.
        Exception: Cualquier otra excepción que ocurra durante la ejecución.
    
    Ejemplo de uso:
        client = {"ip": "10.225.196.21"}
        updated_client = get_historic_cisco_data(client)
        print(updated_client)
    """
    try:
        db_connector = historic_connection()
        
        # En caso de que la conexión a la BD falle
        if db_connector is None:
            raise ValueError("`get_historic_cisco_data` - `db_get_data` No se pudo establecer la conexión con la base de datos: el conector es None.")

        historic_db_cursor = db_connector.cursor()
        
        query = f"""
                SELECT * FROM `historic-devnet`.`candelaria_clients`
                WHERE ip = '{client["ip"]}' AND 
                device_cisco <> 'Not Found' 
                ORDER BY id DESC LIMIT 1
                """
        historic_db_cursor.execute(query)
        results = historic_db_cursor.fetchall()
        
        if results:
            data_backup = [dict(zip(historic_db_cursor.column_names, row)) for row in results][0]
            
            client["port_cisco"] = data_backup['port_cisco']
            client["status_cisco"] = data_backup['status_cisco']
            client["device_cisco"] = data_backup['device_cisco']
            client["device_ip_cisco"] = data_backup['device_ip_cisco']
            client["reachability_cisco"] = data_backup['reachability_cisco']
            client["status_device_cisco"] = data_backup['status_device_cisco']
            client["data_backup"] = 'true'
            return client
        else:
            client["port_cisco"] = 'Not Found'
            client["status_cisco"] = 'Not Found'
            client["device_cisco"] = 'Not Found'
            client["device_ip_cisco"] = 'Not Found'
            client["reachability_cisco"] = 'Not Found'
            client["status_device_cisco"] = 'Not Found'
            client["data_backup"] = 'false'
            return client
            
    except Exception as e:
        # En caso de error, se asignan valores por defecto y se registra el error
        client["port_cisco"] = 'Error DevNet'
        client["status_cisco"] = 'Error DevNet'
        client["device_cisco"] = 'Error DevNet'
        client["device_ip_cisco"] = 'Error DevNet'
        client["reachability_cisco"] = 'Error DevNet'
        client["status_device_cisco"] = 'Error DevNet'
        client["data_backup"] = 'false'
        
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error(f'Error con el Cliente {client["ip"]}')
        logging.error(f"Error en la funcion `get_historic_cisco_data` del archivo `db_get_data`")
        return client

# client = {"ip": "10.225.196.21"}
# print(get_historic_cisco_data(client))
