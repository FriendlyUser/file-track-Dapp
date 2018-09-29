
const HDWalletProvider = require('truffle-hdwallet-provider')
require('dotenv').config()
const mnemonic = process.env.HDWALLET_MNEMONIC
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  ropsten: {
    provider: new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/" + process.env.INFURA_API_KEY),
    network_id: 3,
    gas: 7000000,
    gasPrice: 28921116127
  },
  rinkeby: {
    provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/" + process.env.INFURA_API_KEY),
    network_id: 4,
    gas: 6000000,
    gasPrice: 28921116127
  },
  kovan: {
    provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io/" + process.env.INFURA_API_KEY),
    network_id: 42,
    gas: 4612388,
    gasPrice: 28921116127
  },
  coverage: {
    host: "localhost",
    network_id: "*",
    port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
    gas: 0xfffffffffff, // <-- Use this high gas value
    gasPrice: 0x01      // <-- Use this low gas price
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
