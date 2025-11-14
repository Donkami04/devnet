const { VpnCandelaria } = require("../models/vpn");

class VpnService {
  async getVpn() {
    try {
      const vpnData = await VpnCandelaria.findAll();

      const fw1 = [];
      const fw2 = [];
      const fw3 = [];

      vpnData.forEach((item) => {
        if (item.fw === 1) {
          fw1.push(item);
        } else if (item.fw === 2) {
          fw2.push(item);
        } else if (item.fw === 3) {
          fw3.push(item);
        }
      });

      const data = {
        numUsersFw1: fw1.length,
        numUsersFw2: fw2.length,
        numUsersFw3: fw3.length,
        fw1,
        fw2,
        fw3,
      };

      return {
        statusCode: 200,
        message: "Información de las VPN obtenida exitosamente",
        data: data,
      };
    } catch (error) {
      throw new Error("Error al obtener la información de las VPN");
    }
  }
}

module.exports = { VpnService };
