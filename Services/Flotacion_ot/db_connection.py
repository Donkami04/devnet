import logger_config
import mysql.connector
import os
import traceback
import logging
from dotenv import load_dotenv

load_dotenv()
env = os.getenv("ENVIRONMENT")


def devnet_connection():
    # * Base de datos DevNet

    environment = ""
    if env == "production":
        environment = "PROD"
    elif env == "development":
        environment = "DEV"
    else:
        environment = "LOCAL"

    try:

        DB_HOST = os.getenv(f"DB_{environment}_HOST")
        DB_USER = os.getenv(f"DB_{environment}_USER")
        DB_PASSWORD = os.getenv(f"DB_{environment}_PASSWORD")
        DB_DATABASE = os.getenv(f"DB_{environment}_DATABASE")
        db_connector = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE,
        )
        return db_connector

    except Exception as error:
        logging.error(traceback.format_exc())
        logging.error(
            "Error en la función `devnet_connection` en el archivo `db_connections`"
        )
        logging.error(error)
        return None
