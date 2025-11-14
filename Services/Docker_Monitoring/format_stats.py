import logger_config
import logging


def bytes_to_gb(bytes_value):
    """Convertir bytes a gigabytes y formatear como cadena con 'GB'."""
    try:
        gb_value = bytes_value / (1024**3)  # Convertir bytes a gigabytes
        return f"{gb_value:.2f} GB"  # Formatear con dos decimales y agregar 'GB'

    except Exception as e:
        logging.error(f"Error al convertir bytes a GB: {e}")
        return bytes_value


# def calculate_cpu_percent(stats):
#     """Calcular el porcentaje de uso de la CPU a partir de las estadísticas."""
#     print(stats)
#     try:
#         cpu_delta = (
#             stats["cpu_stats"]["cpu_usage"]["total_usage"]
#             - stats["precpu_stats"]["cpu_usage"]["total_usage"]
#         )
#         system_delta = (
#             stats["cpu_stats"]["system_cpu_usage"]
#             - stats["precpu_stats"]["system_cpu_usage"]
#         )

#         if system_delta > 0 and cpu_delta > 0:
#             num_cpus = len(stats["cpu_stats"]["cpu_usage"]["percpu_usage"])
#             cpu_percent = (cpu_delta / system_delta) * num_cpus * 100.0
#         else:
#             cpu_percent = 0.0
#         return cpu_percent
#     except Exception as e:
#         logging.error(f"Error al calcular el porcentaje de CPU: {e}")
#         return "Error DevNet"


def calculate_cpu_percent(stats, name):
    """Calcular el porcentaje de uso de la CPU a partir de las estadísticas."""
    try:    
        cpu_delta = (
            stats["cpu_stats"]["cpu_usage"]["total_usage"]
            - stats["precpu_stats"]["cpu_usage"]["total_usage"]
        )
        system_delta = (
            stats["cpu_stats"]["system_cpu_usage"]
            - stats["precpu_stats"]["system_cpu_usage"]
        )

        if system_delta > 0 and cpu_delta > 0:
            num_cpus = stats["cpu_stats"]["online_cpus"]
            cpu_percent = (cpu_delta / system_delta) * num_cpus * 100.0
        else:
            cpu_percent = 0.0
        return cpu_percent
    except Exception as e:
        logging.error(f"Error al calcular el porcentaje de CPU del contenedor {name}: {e}")
        return "Error DevNet"