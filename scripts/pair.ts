import { network, ethers } from 'hardhat';
import { Contract, ContractFactory, BigNumber, utils } from 'ethers';
import { encodeParameters, wait } from './utils';
const { FACTORY_ADDRESS, TOKENS } = require('./config');

async function main() {
    const { provider } = ethers;
    const [ operator ] = await ethers.getSigners();

    const estimateGasPrice = await provider.getGasPrice();
    const gasPrice = estimateGasPrice.mul(3).div(2);
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    const override = { gasPrice };

    console.log(`====================Do your bussiness =======================`)
    // pairFor
    let veniceFactory = await ethers.getContractAt('VeniceFactory', FACTORY_ADDRESS);
    let pairAddress = await veniceFactory.getPair(TOKENS['FRA'][network.name], TOKENS['USDT'][network.name]);
    console.log('usdt-busd pair address is:', pairAddress);

    // reserve
    let venicePair = await ethers.getContractAt('VenicePair', pairAddress);
    let reserves = await venicePair.getReserves();
    console.log('reserve0 is:', reserves[0].toString());
    console.log('reserve1 is:', reserves[1].toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });