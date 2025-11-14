import pymssql
import re
import logging
import traceback

def get_cande_data(eqmt):
    """
    Obtiene las coordenadas GPS (latitud y longitud) de un equipo específico desde la base de datos 'Mina'.

    Esta función se conecta a una base de datos MSSQL para consultar las ubicaciones recientes de equipos.
    Si el identificador del equipo contiene "P", lo reemplaza por "PALA" antes de realizar la búsqueda. 
    Utiliza expresiones regulares para extraer las coordenadas de las columnas GPS_Latitud y GPS_Longitud.
    Si no se encuentra el equipo o si ocurre un error, la función devuelve las coordenadas predeterminadas 
    (99.999, 99.999).

    Args:
        eqmt (str): Identificador del equipo para buscar en la base de datos.

    Returns:
        tuple: Una tupla con las coordenadas (latitud, longitud) del equipo. Si no se encuentra el equipo 
        o ocurre un error, se retorna (99.999, 99.999).
    """
    server = "10.224.98.50"
    user = "lundinmining\\svc.cl.can.dashboard"
    password = "T3cn0l0g1a.20309"
    database = "Mina"

    conn = pymssql.connect(server=server, user=user, password=password, database=database)
    cursor = conn.cursor(as_dict=True)
    latitud = 99.999
    longitud = 99.999

    if "P" in eqmt:
        eqmt = eqmt.replace("P", "PALA")

    try:
        cursor.execute("SELECT TOP 1000 ([timestamp]), [Equipo], [GPS_Latitud], [GPS_Longitud], [GPS_Elevacion], [DSP_Status], [Status] FROM [Mina].[dbo].[ubicacion_equipos] order by [timestamp] desc")
        for row in cursor:
            if row["Equipo"] == eqmt:
                # Convertir los valores a cadenas antes de aplicar expresiones regulares
                latitud_str = str(row["GPS_Latitud"])
                longitud_str = str(row["GPS_Longitud"])
                
                # Utilizamos expresiones regulares para extraer los números con signo de las columnas GPS_Latitud y GPS_Longitud
                latitud = re.findall(r'(-?\d+\.\d+)', latitud_str)[0]
                longitud = re.findall(r'(-?\d+\.\d+)', longitud_str)[0]
                
                # print(row["timestamp"], row["Equipo"], latitud[0], longitud[0], row["GPS_Elevacion"], row["DSP_Status"], row["Status"])
                # print(longitud,latitud)
                break
        return float(latitud), float(longitud)

    except Exception as e:
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en la funcion `get_cande_data` del archivo `cande_position`")
        latitud = 99.999
        longitud = 99.999
        return latitud, longitud
    
    finally:
        conn.close()
        
# get_cande_data("P23")
