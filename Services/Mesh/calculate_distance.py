import math
import logging
import traceback

def get_distance(lon1, lat1, lon2, lat2):
    """
    Calcula la distancia en metros entre dos puntos geográficos utilizando la fórmula de Haversine.

    Esta función toma las coordenadas de longitud y latitud de dos puntos y calcula la distancia 
    en metros entre ellos, asumiendo que ambos puntos están en la superficie de la Tierra. Si 
    alguna de las coordenadas es 99.999, la función retorna 0 metros. En caso de error, se 
    registra la excepción en los logs y también se devuelve 0.0.

    Args:
        lon1 (float): Longitud del primer punto.
        lat1 (float): Latitud del primer punto.
        lon2 (float): Longitud del segundo punto.
        lat2 (float): Latitud del segundo punto.

    Returns:
        float: La distancia en metros entre los dos puntos. Retorna 0 si alguna de las 
        coordenadas es inválida (99.999) o si ocurre un error.
    """
    try:
     
        if lon1 == 99.999 or lat1 == 99.999 or lon2 == 99.999 or lat2 == 99.999:
            # logging.info("Uno de los datos es 99.999, retornando 0 metros")
            return 0
        
        # Radio de la Tierra en metros
        R = 6371000  

        # Convertir grados decimales a radianes
        lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])

        # Diferencias de longitud y latitud
        dlon = lon2 - lon1 
        dlat = lat2 - lat1 

        # Aplicar la fórmula de Haversine
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a)) 
        distance = R * c
        distance = round(distance, 1)
        logging.info(f"{distance} metros")
        return distance
    
    except Exception as e:
        logging.error(e)
        logging.error(traceback.format_exc())
        logging.error("Error en la funcion `get_distance` del archivo `calculate_distance`")
        return 0.0