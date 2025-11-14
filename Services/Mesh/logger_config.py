import warnings
import logging

# Esto evita que las respuestas de las API tengan warnings.
warnings.filterwarnings("ignore", message="Unverified HTTPS request")

# Configuracion del Logger
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")
file_handler = logging.FileHandler("issues.log")
file_handler.setLevel(logging.WARNING)
file_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
logging.getLogger().addHandler(file_handler)