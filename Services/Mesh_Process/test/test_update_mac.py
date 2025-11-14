import unittest
from datetime import datetime
from unittest.mock import patch
import sys
import os
src_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(src_folder)
from update_current_mac import update_mac




# Aquí va la función update_mac

class TestUpdateMacFunction(unittest.TestCase):
    def setUp(self):
        # Datos de ejemplo para las pruebas
        self.last_data = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "last_mac": "Not Found",
                "current_mac": "curren mac pala 10",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.111",
                "last_mac": "Not Found",
                "current_mac": "curren mac pala 11-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.112",
                "last_mac": "Not Found",
                "current_mac": "curren mac pala 11-2",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
        ]

        self.current_data = [
            {'ip': '10.117.115.110', 'mac': 'A1'},  # MAC updated
            {'ip': '10.117.115.111', 'mac': 'A2'}, 
            {'ip': '10.117.115.112', 'mac': 'A3'}
        ]

    @patch('datetime.datetime')
    def test_mac_update(self, mock_datetime):
        # Configuramos la fecha para obtener un valor fijo
        mock_datetime.now.return_value = datetime(2024, 9, 24, 12, 0, 0)

        # Ejecutamos la función con los datos de prueba
        result = update_mac(self.last_data, self.current_data)

        # Comprobamos que se ha actualizado correctamente la MAC
        self.assertEqual(result[0]['current_mac'], 'A1')
        self.assertEqual(result[0]['last_mac'], 'curren mac pala 10')
        self.assertEqual(result[0]['last_change_date'], '2024-09-24 12:00:00')

    def test_no_mac_update(self):
        # Sin coincidencia de MAC, los datos deberían permanecer iguales
        current_data_no_change = [{'ip': '10.117.115.110', 'mac': 'curren mac pala 10'}]
        result = update_mac(self.last_data, current_data_no_change)

        # Verificamos que no se actualizó ninguna MAC
        self.assertEqual(result[0]['current_mac'], 'curren mac pala 10')
        self.assertEqual(result[0]['last_mac'], 'Not Found')
        
    def test_empty_current_data(self):
        # Si current_data está vacío, no debe haber cambios en los datos
        result = update_mac(self.last_data, [])

        # Comprobamos que los datos permanecen iguales
        self.assertEqual(result, self.last_data)

    def test_no_client_match(self):
        # Ningún cliente en last_data debería coincidir con current_data
        current_data_no_match = [{'ip': '10.117.999.999', 'mac': '0080.0701.8111'}]
        result = update_mac(self.last_data, current_data_no_match)

        # Verificamos que no hubo cambios en los datos
        self.assertEqual(result, self.last_data)

    @patch('logging.error')
    def test_exception_handling(self, mock_logging_error):
        # Causamos una excepción enviando un valor incorrecto
        result = update_mac(None, self.current_data)

        # Verificamos que la función maneja la excepción y retorna una lista vacía
        self.assertEqual(result, [])
        self.assertTrue(mock_logging_error.called)


if __name__ == '__main__':
    unittest.main()
