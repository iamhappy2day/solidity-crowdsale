 const MyTokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken");
const KycContract = artifacts.require("Kyc");
require("dotenv").config({path:"../.env"} );

const chai = require("./chaiSetup");
const expect = chai.expect;
const BN = web3.utils.BN

contract('MyTokenSale test', async (accounts) => {
    const [deployer, recipient, anotherAccount] = accounts;

    it("In deployer account should be 0 tokens", async () => {
        let instance = await Token.deployed();
        expect(await instance.balanceOf(deployer)).to.be.a.bignumber.equal(new BN(0))
    });

    it("Check that all tokens are on token sale smart contract", async () => {
        let instance = await Token.deployed();
        expect(await instance.balanceOf(MyTokenSale.address)).to.be.a.bignumber.equal(new BN(process.env.INITIAL_TOKENS))
    });

    it("Check that it's possible to buy tokens", async () => {
        let tokenSaleInstance = await MyTokenSale.deployed();
        let myTokenInstance = await Token.deployed();
        let kycContractInstance = await KycContract.deployed();
        let initialBalance = await myTokenInstance.balanceOf(deployer);
        await kycContractInstance.setKycCompleted(deployer, {from: deployer});
        await tokenSaleInstance.sendTransaction({from: deployer, value: web3.utils.toWei('1', 'wei')})
        expect(await myTokenInstance.balanceOf(deployer)).to.be.a.bignumber.equal(initialBalance.add(new BN(1)));
    });
});