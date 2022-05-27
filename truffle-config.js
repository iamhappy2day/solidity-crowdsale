const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config({path:"./.env"} );
const mnemonic = process.env.MNEMONIC;
const accountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545", accountIndex)
      },
      network_id: "*"
    },
    goerli_infura: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/3644688c031d434996715f529b0537bf", accountIndex)
      },
      network_id: 5
    },
    ropsten_infura: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/3644688c031d434996715f529b0537bf", accountIndex)
      },
      network_id: 3
    }
  },
  compilers: {
    solc: {
      version: '0.8.6', 
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
