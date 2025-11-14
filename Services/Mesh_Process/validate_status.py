import logger_config
import logging
import traceback
from collections import Counter


def validate_status(devices):
    try:
        
        # Lista de IPs especiales
        special_clients = ["10.117.112.25", "10.117.112.21", "10.117.112.20"]
        
        # Paso 1: contar las MACs
        mac_list = [item["current_mac"] for item in devices if item["current_mac"] != "Not Found"]
        mac_count = Counter(mac_list)

        # Paso 2: actualizar el status según las reglas
        for item in devices:
            if item.get("note") == "NAT":
                item["status"] = "ok"
            elif item.get("client") in special_clients:
                item["status"] = "ok"
            elif mac_count[item["current_mac"]] > 1:
                item["status"] = "fail"
            else:
                item["status"] = "ok"

        return devices

    except Exception as e:
        # En caso de error, se captura la excepción y se retorna un mensaje con el error
        logging.error(traceback.format_exc())
        return False


# test = [
#     {"current_mac": "a874.1d39.1609", "client": "10.117.112.999", "note": "NAT"},
#     {"current_mac": "a874.1d39.1609", "client": "10.117.112.250", "note": "No data"},
#     {"current_mac": "a874.1d39.1609", "client": "10.117.112.20", "note": "No data"},
#     {"current_mac": "a874.1d39.1609", "client": "10.117.112.250", "note": "No data"},
# ]

# a = validate_status(test)

# for item in a:
#     print(item["current_mac"], item["status"])
