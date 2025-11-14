const { getFirewalls } = require("../firewalls");
const { FirewallsService } = require("../firewalls");

const Firewalls = new FirewallsService();

async function dashboardFirewalls() {
  let numFwCorpAlive = 0;
  let numFwCorpDown = 0;
  let numFwCommuniAlive = 0;
  let numFwCommuniDown = 0;

  const response = await Firewalls.getFirewalls();

  response.data.forEach((firewall) => {
    if (
      firewall.state &&
      firewall.state === "alive" &&
      firewall.ubication &&
      firewall.ubication === "corporate"
    ) {
      numFwCorpAlive += 1;
    }
    if (
      (firewall.state &&
        (firewall.state.toLowerCase() === "dead" ||
          firewall.state.toLowerCase() === "not found") &&
        firewall.ubication &&
        firewall.ubication === "corporate") ||
      (firewall.state &&
        firewall.state.toLowerCase().includes("error") &&
        firewall.ubication &&
        firewall.ubication === "corporate")
    ) {
      numFwCorpDown += 1;
    }
    if (
      firewall.state &&
      firewall.state === "alive" &&
      firewall.ubication &&
      firewall.ubication === "community"
    ) {
      numFwCommuniAlive += 1;
    }
    if (
      (firewall.state &&
        (firewall.state.toLowerCase() === "dead" || firewall.state.toLowerCase() === "not found") &&
        firewall.ubication &&
        firewall.ubication === "community") ||
      (firewall.state &&
        firewall.state.toLowerCase().includes("error") &&
        firewall.ubication &&
        firewall.ubication === "community")
    ) {
      numFwCommuniDown += 1;
    }
  });

  data = {
    numFwCorpAlive,
    numFwCorpDown,
    numFwCommuniAlive,
    numFwCommuniDown,
  };

  return data;
}

module.exports = { dashboardFirewalls };
