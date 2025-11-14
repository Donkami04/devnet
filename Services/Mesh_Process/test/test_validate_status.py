import unittest
import sys
import os
src_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(src_folder)
from validate_status import validate_status


class TestValidateStatus(unittest.TestCase):

    def setUp(self):
        self.maxDiff = None

    def test_general_example(self):
        command_data = {
            "Pala 10": {
                "mac_addresses": ["MAC PALA 10-1", "MAC PALA 10-2", "MAC PALA 10-3"],
                "status_num_clients": "ok",
            },
            "Pala 11": {
                "mac_addresses": ["MAC PALA 11-1", "MAC PALA 11-2"],
                "status_num_clients": "fail",
            },
        }

        mesh_process_data = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
        ]
        expected_result = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "N/A",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "N/A",
            },
        ]

        result = validate_status(mesh_process_data, command_data)
        self.assertEqual(
            result,
            expected_result,
            msg="Expected every ubication with itself mac",
        )

    def test_empty_command_data(self):
        command_data = {}
        mesh_process_data = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
        ]
        expected_result = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "N/A",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "N/A",
            },
        ]

        result = validate_status(mesh_process_data, command_data)
        self.assertEqual(
            result,
            expected_result,
            msg="Expected status_detail_mac and status_num_clients to be 'ok' with empty command_data",
        )

    def test_no_matching_ubication(self):
        command_data = {
            "Pala 15": {
                "mac_addresses": ["000a.750e.4319"],
                "status_num_clients": "fail",
            }
        }
        mesh_process_data = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
        ]
        expected_result = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "N/A",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "N/A",
            },
        ]

        result = validate_status(mesh_process_data, command_data)
        self.assertEqual(
            result, expected_result, msg="Expected no change when no ubication matches"
        )

    def test_one_ubication_ok_one_fail(self):
        command_data = {
            "Pala 10": {
                "mac_addresses": ["MAC PALA 10-1", "MAC PALA 10-2", "MAC PALA 10-3"],
                "status_num_clients": "ok",
            },
            "Pala 11": {
                "mac_addresses": ["MAC PALA 11-1", "MAC PALA 11-2"],
                "status_num_clients": "ok",
            },
        }
        mesh_process_data = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-2",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
        ]
        expected_result = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "ok",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 11",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "fail",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-2",
                "note": "NAT",
                "status": "fail",
                "status_num_clients": "N/A",
            },
        ]

        result = validate_status(mesh_process_data, command_data)
        self.assertEqual(
            result,
            expected_result,
            msg="Expected matching mac in rigth ubication to set status_detail_mac to 'ok'",
        )

    def test_two_ubications_fail(self):
        command_data = {
            "Pala 10": {
                "mac_addresses": ["MAC PALA 10-1", "MAC PALA 10-2", "MAC PALA 10-3"],
                "status_num_clients": "ok",
            },
            "Pala 11": {
                "mac_addresses": ["MAC PALA 11-1", "MAC PALA 11-2"],
                "status_num_clients": "ok",
            },
        }
        mesh_process_data = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 10",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-3",
                "note": "NAT",
                "status": "aaa",
                "status_num_clients": "aaa",
            },
        ]
        expected_result = [
            {
                "ubication": "Pala 10",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-1",
                "note": "NAT",
                "status": "fail",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 10",
                "device": "Device 1",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-1",
                "note": "NAT",
                "status": "fail",
                "status_num_clients": "N/A",
            },
            {
                "ubication": "Pala 11",
                "device": "Cisco AP",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 11-2",
                "note": "NAT",
                "status": "fail",
                "status_num_clients": "ok",
            },
            {
                "ubication": "Pala 11",
                "device": "Device 2",
                "client": "10.117.115.110",
                "current_mac": "MAC PALA 10-3",
                "note": "NAT",
                "status": "fail",
                "status_num_clients": "N/A",
            },
        ]

        result = validate_status(mesh_process_data, command_data)
        self.assertEqual(
            result,
            expected_result,
            msg="Expected matching mac in different ubication to set status_detail_mac to 'fail'",
        )


if __name__ == "__main__":
    unittest.main()
