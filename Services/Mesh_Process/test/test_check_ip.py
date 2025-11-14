import unittest
import logging
from unittest.mock import patch
import sys
import os
src_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(src_folder)
from update_current_mac import check_ip_in_output


class TestCheckIpInOutput(unittest.TestCase):
    
    def test_ip_found(self):
        last_data = [
            {"client": "10.0.0.1", "is_currently": "Not Found", "current_mac": "00:11:22:33:44:55", "last_mac": None},
            {"client": "10.0.0.2", "is_currently": "Not Found", "current_mac": "00:11:22:33:44:56", "last_mac": None}
        ]
        current_data = [{"ip": "10.0.0.1"}]
        
        check_ip_in_output(last_data, current_data)
        
        self.assertEqual(last_data[0]["is_currently"], "Found")
        self.assertEqual(last_data[1]["is_currently"], "Not Found")
    
    def test_ip_not_found(self):
        last_data = [
            {"client": "10.0.0.1", "is_currently": "Not Found", "current_mac": "00:11:22:33:44:55", "last_mac": None}
        ]
        current_data = [{"ip": "10.0.0.2"}]
        
        check_ip_in_output(last_data, current_data)
        
        self.assertEqual(last_data[0]["is_currently"], "Not Found")
        self.assertEqual(last_data[0]["current_mac"], "Not Found")
        self.assertEqual(last_data[0]["last_mac"], "00:11:22:33:44:55")
    
    @patch('logging.error')  # Mock logging to verify it was called
    def test_invalid_data(self, mock_logging):
        last_data = [{"client": "10.0.0.1", "current_mac": "00:11:22:33:44:55"}]
        current_data = "invalid_data"  # Data malformada
        
        check_ip_in_output(last_data, current_data)
        
        self.assertTrue(mock_logging.called)
    
    def test_no_match_but_valid_mac(self):
        last_data = [
            {"client": "10.0.0.1", "is_currently": "Not Found", "current_mac": "00:11:22:33:44:55", "last_mac": None}
        ]
        current_data = [{"ip": "10.0.0.2"}]
        
        check_ip_in_output(last_data, current_data)
        
        self.assertEqual(last_data[0]["current_mac"], "Not Found")
        self.assertEqual(last_data[0]["last_mac"], "00:11:22:33:44:55")
    
    def test_match_but_mac_not_updated(self):
        last_data = [
            {"client": "10.0.0.1", "is_currently": "Not Found", "current_mac": "Not Found", "last_mac": "00:11:22:33:44:55"}
        ]
        current_data = [{"ip": "10.0.0.1"}]
        
        check_ip_in_output(last_data, current_data)
        
        self.assertEqual(last_data[0]["is_currently"], "Found")
        self.assertEqual(last_data[0]["current_mac"], "Not Found")  # Should not change
        self.assertEqual(last_data[0]["last_mac"], "00:11:22:33:44:55")

if __name__ == '__main__':
    unittest.main()
