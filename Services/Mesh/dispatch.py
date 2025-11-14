import pymssql, os
from dotenv import load_dotenv

def get_data_dispatch(eqmt):
    """
    Obtiene el estado de despacho y el nombre del operador para un equipo específico desde la base de datos.

    La función se conecta a una base de datos MSSQL utilizando las credenciales y parámetros de conexión 
    obtenidos desde un archivo `.env`. Realiza una consulta para recuperar los datos de los equipos, 
    buscando coincidencias con el equipo especificado en `eqmt`. Si se encuentra el equipo, devuelve 
    su estado de despacho y el nombre del operador. Si no se encuentra, devuelve 'Not Found' para ambos.

    Args:
        eqmt (str): El identificador del equipo que se está buscando.

    Returns:
        tuple: Contiene dos cadenas:
            - status_dispatch: El estado de despacho del equipo y el nombre asociado. 
                               Retorna 'Not Found' si no se encuentra.
            - operador: El nombre del operador asociado al equipo. Retorna 'Not Found' si no se encuentra.
    """
    
    load_dotenv()
    HOST = os.getenv('SERVER_CONTROLADORA')
    USER = os.getenv('USER_DATABASE_CONTROLADORA')
    PASSWORD = os.getenv('PASSWORD_DATABASE_CONTROLADORA')
    DATABASE = os.getenv('DATABASE_CONTROLADORA')
    
    try:
        conn = pymssql.connect(host=HOST, 
                               user=USER, 
                               password=PASSWORD, 
                               database=DATABASE)

        cursor = conn.cursor()
        cursor.execute("SELECT TOP (1000) [shiftdate],[shift#] ,[endtime] ,[unit] ,[eqmt] ,[status] ,[name] ,[hora] ,[operatorname] FROM [MLCOperational].[dbo].[status_equipos]")
        # cursor.execute("SELECT TOP (1000) FROM [MLCOperational].[dbo].[status_equipos]")
        
        all_data = []
        for row in cursor:  
            data = list(row)
            all_data.append(data)

        for data_device in all_data:
            if data_device[4] == eqmt:
                status_dispatch = f'{data_device[5]}-{data_device[6]}'
                operador = data_device[8]

                return status_dispatch, operador

        status_dispatch = 'Not Found'
        operador = 'Not Found'
        conn.close()
        return status_dispatch, operador
        
    except Exception as e:
        status_dispatch = 'Not Found'
        operador = 'Not Found'
        return status_dispatch, operador
