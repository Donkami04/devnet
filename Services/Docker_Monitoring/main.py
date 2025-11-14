import docker
import logging
import logger_config
import sched
import time
import traceback
from db_update_devnet import update_devnet_data, datetime_register
from format_stats import bytes_to_gb, calculate_cpu_percent

def main():

    try:
        
        logging.info("Obteniendo información de los contenedores...")
        
        # Crear una instancia del cliente Docker
        client = docker.from_env()

        # Listar todos los contenedores (activos y detenidos)
        containers = client.containers.list(all=True)
        

        
        # Lista para almacenar la información de los contenedores
        containers_info = []

        # Obtener estadísticas para cada contenedor
        for container in containers:
            
            # El contenedor de phpmyadmin tiene conflictos
            if "php" in container.name:
                continue
                
            # Obtener estadísticas
            stats = container.stats(stream=False)
            
            # Calcular el porcentaje de uso de la CPU
            cpu_usage_percent = calculate_cpu_percent(stats, container.name)
            
            # Crear un diccionario para el contenedor con valores formateados
            container_dict = {
                'name': container.name,
                'status': container.status,  # Obtener el estado del contenedor
                'cpu_usage_percent': f"{cpu_usage_percent:.2f}%",  # Porcentaje de uso de CPU
                'memory_usage': bytes_to_gb(stats['memory_stats']['usage']),
                'memory_limit': bytes_to_gb(stats['memory_stats']['limit'])
            }
            
            # Añadir el diccionario a la lista
            containers_info.append(container_dict)
        
        db_response = update_devnet_data(containers_info)
        
        if db_response:
            datetime_register(status="OK", system_name="devnet")
        else:
            datetime_register(status="ERROR", system_name="devnet")
            
        logging.info("Información de los contenedores obtenida correctamente.")

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(f"Error al obtener información de los contenedores: {e}")
        datetime_register(status="ERROR", system_name="devnet")
        
        
def bucle(scheduler):
    main()
    scheduler.enter(300, 1, bucle, (scheduler,))

if __name__ == "__main__":
    s = sched.scheduler(time.time, time.sleep)
    s.enter(0, 1, bucle, (s,))
    s.run()