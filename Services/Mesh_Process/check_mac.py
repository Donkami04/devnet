
# import logging
# import mysql.connector
# import traceback
# import os
# from dotenv import load_dotenv



# """
#     Funcion encargada de validar si `current_mac` se repite en algun otro elemento,
#     de repetirse se define el valor de `status` = 'fail', si no se repite se define como 'ok'
# """

# # Configuración básica de logging
# logging.basicConfig(
#     level=logging.INFO, format="%(asctime)s - %(levelname)s: %(message)s"
# )


# def database_connection():
#     try:
#         load_dotenv()
#         env = os.getenv("ENVIRONMENT")
#         if env == "local":
#             mydb = mysql.connector.connect(
#                 host=database["local"]["DB_HOST"],
#                 user=database["local"]["DB_USER"],
#                 password=database["local"]["DB_PASSWORD"],
#                 database=database["local"]["DB_DATABASE"],
#             )

#         else:
#             mydb = mysql.connector.connect(
#                 host=database["production"]["DB_HOST"],
#                 user=database["production"]["DB_USER"],
#                 password=database["production"]["DB_PASSWORD"],
#                 database=database["production"]["DB_DATABASE"],
#             )
#         return mydb

#     except Exception as e:
#         logging.error("Error al conectarse a la base de datos en la funcion CHECK_MAC")
#         logging.error(traceback.format_exc())
#         logging.error(e)


# def check_mac():
#     """
#         Funcion encargada de validar el estado "fail" u "ok" del elemento
#     """
#     try:
#         mydb = database_connection()
#         cursor = mydb.cursor()
#         query = "SELECT * FROM devnet.mesh_process"
#         cursor.execute(query)

#         # Obtenemos la lista con los datos de los diccionarios actualizados
#         column_names = [column[0] for column in cursor.description]
#         data_updated = []
#         for row in cursor:
#             row_dict = {}
#             for i in range(len(column_names)):
#                 row_dict[column_names[i]] = row[i]
#             data_updated.append(row_dict)
            
#         #! DATA TEST    
#         # data_updated = [
#         #     {
#         #         "id": 353,
#         #         "ubication": "Pala 10",
#         #         "device": "Cisco AP",
#         #         "client": "10.117.115.110",
#         #         "last_mac": "A1",
#         #         "current_mac": "A2",
#         #         "note": "No data",
#         #         "last_change_date": "No data",
#         #         "status": "ok",
#         #     },
#         #     {
#         #         "id": 349,
#         #         "ubication": "Camion 318",
#         #         "device": "UMAN",
#         #         "client": "10.117.126.118",
#         #         "last_mac": "No data",
#         #         "current_mac": "A2",
#         #         "note": "No data",
#         #         "last_change_date": "No data",
#         #         "status": "ok",
#         #     },
#         # ]

#         for i, data in enumerate(data_updated):
#             if data["note"] == "NAT":
#                 data["status"] = "ok"
#             else:
#                 current_mac = data["current_mac"]
#                 if (
#                     current_mac != "No data"
#                     and current_mac != "Not Found"
#                     and current_mac != "b827.eb80.f108"
#                 ):
#                     mac_repeated = False
#                     for j, other_data in enumerate(data_updated):
#                         if i != j and other_data["current_mac"] == current_mac:
#                             data["status"] = "fail"
#                             mac_repeated = True
#                             break
#                     if not mac_repeated:
#                         data["status"] = "ok"
#                 else:
#                     data["status"] = "ok"

#         for data in data_updated:
#             if data["client"] != "10.117.126.100":
#                 status = data["status"]
#                 query_mac = f"UPDATE devnet.mesh_process SET status = '{status}' WHERE client = '{data['client']}'"
#                 cursor.execute(query_mac)
#                 mydb.commit()

#         logging.info("CHECK_MAC: Estados de los clientes Actualizado Exitosamente")
#         cursor.close()
#         # return data_updated

#     except Exception as e:
#         logging.error("Error en la funcion CHECK_MAC")
#         logging.error(e)
#         logging.error(traceback.format_exc())
