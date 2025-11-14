import traceback
import logging
from datetime import datetime


# def update_mac(last_data, current_data):
#     try:
#         # Lista donde se almacenarán los datos actualizados
#         data_updated = last_data.copy()

#         # Actualizar las direcciones MAC en la lista last_data
#         if current_data != False:
#             for last in data_updated:
#                 for current in current_data:
#                     if (
#                         last["client"] == current["ip"]
#                         and last["current_mac"] != current["mac"]
#                     ):
#                         last["current_mac"] = current["mac"]
#                         break

#             # Crear nuevos diccionarios para IPs en current_data que no están en last_data
#             current_ips = [entry["ip"] for entry in current_data]
#             last_ips = [entry["client"] for entry in last_data]

#             # Agregar nuevos dispositivos a la lista si su IP no está en last_data
#             for current in current_data:
#                 if current["ip"] not in last_ips:
#                     new_entry = {
#                         "id": None,
#                         "ubication": None,
#                         "device": None,
#                         "client": current["ip"],
#                         "last_mac": None,
#                         "current_mac": current["mac"],
#                         "note": None,
#                         "last_change_date": None,
#                         "status": None,
#                         "prtg_status": None,
#                         "prtg_id": None,
#                         "status_num_clients": None,
#                     }
#                     data_updated.append(new_entry)

#             return data_updated

#         else:
#             return False

#     except Exception as e:
#         logging.error(traceback.format_exc())
#         logging.error(
#             "Error en la función `update_mac` en el archivo `db_update_devnet`"
#         )
#         logging.error(e)
#         return False


def check_ip_in_output(last_data, current_data):
    try:
        data_updated = last_data
        ips = [data["ip"] for data in current_data]

        # Validar si hay coincidencias entre las listas
        for e in last_data:
            if e["client"] in ips:
                e["is_currently"] = "Found"
            else:
                e["is_currently"] = "Not Found"

        for last in last_data:
            if (
                last["is_currently"] == "Not Found"
                and last["current_mac"] != "Not Found"
            ):
                last["last_mac"] = last["current_mac"]
                last["current_mac"] = "Not Found"
                break

        return data_updated

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `check_ip_in_output` en el archivo `db_update_devnet`"
        )
        logging.error(e)


def update_mac(last_data, current_data):

    try:

        ip_to_mac = {item["ip"]: item["mac"] for item in current_data}

        # Ahora recorremos last_data y actualizamos current_mac
        for item in last_data:
            client_ip = item.get("client")
            if client_ip in ip_to_mac:
                item["current_mac"] = ip_to_mac[client_ip]
            else:
                item["current_mac"] = "Not Found"

        return last_data

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `update_mac` en el archivo `db_update_devnet`"
        )
        logging.error(e)
        return False


# last_data = [
#     {
#         "device": "Cliente 1",
#         "client": "10.117.125.10",
#         "current_mac": "mac vieja A",
#     },
#     {
#         "device": "Cliente 2",
#         "client": "10.117.125.11",
#         "current_mac": "mac vieja B",
#     },
#     {
#         "device": "Cliente 3",
#         "client": "10.117.125.12",
#         "current_mac": "mac vieja C",
#     },
# ]

# current_data = [
#     {"ip": "10.117.125.10", "mac": "A"},
#     {"ip": "10.117.125.11", "mac": "B"},
#     {"ip": "10.117.125.12", "mac": "C"},
# ]


# a = update_mac(last_data, current_data)

# for item in a:
#     print(
#         f"Device: {item['device']}, Client: {item['client']}, Current MAC: {item['current_mac']}"
#     )
