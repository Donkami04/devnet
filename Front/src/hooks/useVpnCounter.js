import { useState, useEffect } from 'react';
import { getVpn } from '../utils/Api-candelaria/api';

export function useVpnCounter() {
  const [vpnData, setVpnData] = useState({
    dataVpn1Users: [],
    dataVpn2Users: [],
    dataVpn3Users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vpnDataResponse = await getVpn();
        setVpnData({
          dataVpn1Users: vpnDataResponse.vpn_1,
          dataVpn2Users: vpnDataResponse.vpn_2,
          dataVpn3Users: vpnDataResponse.vpn_3,
        });
      } catch (error) {
        console.error('Error al obtener el listado de Usuarios VPN:', error);
      }
    };
    fetchData();
  }, []);

  return vpnData;
}
