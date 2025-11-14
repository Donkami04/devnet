const { getWan } = require("../wan");
const { WanService } = require("../wan");

const Wan = new WanService();

async function dashboardWan() {
  let wan = await Wan.getWan();

  wan = wan.data.map((wanElement) => wanElement.toJSON());

  const adminsWan = [];
  const othersWan = [];

  wan.forEach((wanElement) => {
    if (wanElement.ip.startsWith("10.224.126")) {
      adminsWan.push(wanElement);
    } else {
      othersWan.push(wanElement);
    }
  });

  let othersWanUptimePercentLasthMonth = 0;
  othersWan.forEach(
    (wanElement) =>
      (othersWanUptimePercentLasthMonth += wanElement.last_uptime_percent)
  );
  const totalElementsOthersWan = othersWan.length;
  let otherPercentUptime = othersWanUptimePercentLasthMonth / totalElementsOthersWan;
  otherPercentUptime = parseFloat(otherPercentUptime.toFixed(2));

  const adminPercentUptime = adminWanCalculate(adminsWan);

  const data = {
    kpiAdminWans: adminPercentUptime,
    kpiOtherWans: otherPercentUptime,
  };
  return data;

}

function adminWanCalculate(adminWans) {
  const toNumber = adminWans.map((e) => parseFloat(e.last_uptime_percent));
  const maxValue = Math.max(...toNumber);
  return maxValue;
}

module.exports = { dashboardWan };
