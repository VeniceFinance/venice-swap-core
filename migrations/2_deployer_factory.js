const veniceFactory = artifacts.require('VeniceFactory');
const venicePair = artifacts.require('VenicePair');

// ++++++++++++++++  Main Migration ++++++++++++++++ 
const migration = async (deployer, network, accounts) => {
  await Promise.all([
      deploy(deployer, network, accounts)
  ]);
}

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
module.exports = migration;

async function deploy(deployer, network, accounts) { 
  console.log("[Core] Start deploy on Network= " + network);

  let deployer_account = accounts[0];

  console.log('venicePair bytecode hash:%s ', (web3.utils.keccak256(venicePair.bytecode)).substring(2));

  console.log("[Core] Begin to deploy veniceFactory")
  await deployer.deploy(veniceFactory, deployer_account);
  
  console.log("[Core] End");
}