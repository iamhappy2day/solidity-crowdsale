const Token = artifacts.require("MyToken");
require("dotenv").config({path:"../.env"} );
const chai = require("./chaiSetup");

const expect = chai.expect;
const BN = web3.utils.BN;

contract('MyToken test', async (accounts) => {
    const [deployer, recipient, anotherAccount] = accounts;
    let totalSupply;
    let instance;

    beforeEach( async() => {
        instance = await Token.new(process.env.INITIAL_TOKENS);
        totalSupply = await instance.totalSupply();
    })

    it('All tokens in my account', async () => {
        expect(await instance.balanceOf(deployer)).to.be.a.bignumber.equal(totalSupply);
    });

    it("It's possible to send tokens between accounts", async () => {
        let amount = 1000;
        expect(await instance.balanceOf(deployer)).to.be.a.bignumber.equal(totalSupply);
        await instance.transfer(recipient, amount);
        expect(instance.transfer(recipient,amount)).to.eventually.be.fulfilled;
        expect(await instance.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(amount));
    });

});