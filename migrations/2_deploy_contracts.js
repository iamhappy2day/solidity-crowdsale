const MyToken = artifacts.require("MyToken.sol");
const MyTokenSale = artifacts.require("MyTokenSale.sol");
const Kyc = artifacts.require("Kyc.sol");
require("dotenv").config({path:"../.env"} );

module.exports = async function(deployer) {
    const addr = await web3.eth.getAccounts();

    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(Kyc);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, Kyc.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
}