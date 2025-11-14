import logging
import logger_config
import traceback
import os
import requests
from dotenv import load_dotenv


load_dotenv()
env = os.getenv("ENVIRONMENT")

PRTG_USERNAME = os.getenv("PRTG_USERNAME")
PRTG_PASSWORD = os.getenv("PRTG_PASSWORD")


def status_prtg(data):
    try:

        env_map = {
            "local": "localhost",
            "development": "10.224.116.78",
            "production": "10.224.116.14",
        }

        api_env = env_map.get(env, None)

        for client in data:
            ip_client = client["client"]
            if (
                "pala" in client["ubication"].lower()
                and "cisco ap" in client["device"].lower()
            ):
                api_candelaria = os.getenv("API_STATUS_PALA").format(env=api_env)
                response_api_candelaria = requests.get(
                    api_candelaria, verify=False
                ).json()
                pala = next(
                    (
                        mesh_pala
                        for mesh_pala in response_api_candelaria["data"]
                        if mesh_pala["ip"] == ip_client
                    ),
                    None,
                )
                if pala == None or "2" not in pala["status_dispatch"]:
                    client["status"] = "No operando"
                    client["prtg_id"] = 0
                    continue

            api_prtg_getid = os.getenv("URL_GET_ID_PING").format(
                ip=ip_client, username=PRTG_USERNAME, password=PRTG_PASSWORD
            )
            response_api_getid = requests.get(api_prtg_getid, verify=False).json()
            devices = response_api_getid.get("devices")

            if devices == []:
                client["status"] = "Not Found"
                client["prtg_id"] = 0

            if devices != []:
                objid = devices[0]["objid"]
                api_prtg_data = os.getenv("URL_GET_DATA").format(
                    objid=objid, username=PRTG_USERNAME, password=PRTG_PASSWORD
                )
                response_api_data = requests.get(api_prtg_data, verify=False).json()
                prtg_status = response_api_data["sensors"][0]["status"]
                client["status"] = prtg_status
                client["prtg_id"] = objid

        return data

    except Exception as e:
        logging.error(traceback.format_exc())
        logging.error(e)
        logging.error("Error en la funcion `status_prtg` en el archivo `status_prtg`")
        return data
