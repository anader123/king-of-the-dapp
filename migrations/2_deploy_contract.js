const KingDappContract = artifacts.require("KingDappContract");

module.exports = async function(deployer) {
  await deployer.deploy(KingDappContract);
};