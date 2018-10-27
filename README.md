[![Build Status](https://travis-ci.org/FriendlyUser/file-track-Dapp.svg?branch=master)](https://travis-ci.org/FriendlyUser/file-track-Dapp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/FriendlyUser/file-track-Dapp/badge.svg?branch=master)](https://coveralls.io/github/FriendlyUser/file-track-Dapp?branch=master) 
[![GitHub license](https://img.shields.io/github/license/FriendlyUser/file-track-Dapp.svg)](https://github.com/FriendlyUser/file-track-Dapp/blob/master/LICENSE) [![Etherscan] (https://img.shields.io/badge/Etherscan-verified-red.svg)](https://etherscan.io/address/0x4e8fec85a98c03bd6187c1eb96462cd3c5586664#code)


# File-track Dapp 


Simple Dapp that can track files uploaded to IPFS.

Docs at https://FriendlyUser.github.io/file-track-Dapp
App at http://IPFSDapp.surge.sh

![Screenshot](https://gateway.ipfs.io/ipfs/Qmb1ZEhXaTCfzdgVxXmW3WqfcjCRG4ctsieP2zkuhFZRtP)
Built using standard truffle and solidity.
![Dapp Architecture](docs/dapp-arch.png)

Upload and track IPFS files securely on the Ethereum Network, supports UPORT

![Dapp Structure](docs/ipfs-dapp.png)

Images are converted from pdf to png using imagemagick

```sh
convert -density 400 -resize 50% ipfs-dapp.pdf ipfs-dapp.png
```

Uses the css framework bulma and font-awesome for icons.


|Filename                | IPFS Hash| url |
| ---| ---| ---| 
| ENGR001 Report   | QmSE4qrynVfCU1Vevhvaeav6RWtN5vFKSn3KaC3GuSKPvq | [ENGR001](https://gateway.ipfs.io/ipfs/QmSE4qrynVfCU1Vevhvaeav6RWtN5vFKSn3KaC3GuSKPvq) |
| ENGR002 Report  |QmezncgKe3NEMyN9mmitT3BLwLE3adCNyNDUSJssgCqGXb | [ENGR002](https://ipfs.io/ipfs/QmezncgKe3NEMyN9mmitT3BLwLE3adCNyNDUSJssgCqGXb) |
| ENGR003 Report  | QmZb7crH2YYqwvq5d2pCjZxAovzqXkhWwnEE993UM4jikk | [ENGR003](https://gateway.ipfs.io/ipfs/QmZb7crH2YYqwvq5d2pCjZxAovzqXkhWwnEE993UM4jikk) |
| ENGR446 Report  | QmeQegoUZ3YMNpgUvinU424FtrMUYNNHgQafmaThrzG9nZ |[ENGR446](https://ipfs.io/ipfs/QmeQegoUZ3YMNpgUvinU424FtrMUYNNHgQafmaThrzG9nZ) |

## TodoList

- [x] Truffle Test 
- [x] User Registry Contract
- [x] Basic Front End
- [x] Design Auth Contract
- [x] Add front-end for authentication
- [x] Add component for viewing files for self, use bulma table.
- [x] Boilerplate for Front-end testing
- [x] Add component for viewing files for other users
- [ ] Deploy Contracts to main net and then upload a few files.
- [ ] Improve Form Validation and UI
- [ ] Try to add drizzle-front-end testing for components, this ought to be fun, maybe write an medium article about this.
- [ ] Add Contact Us Page, FAQ Page, etc ...
- [ ] Polish app, adding loading icons or render bulma icons, or font-awesome loading icons, add Contact Page.
- [ ] Load different colours based on network

## Installation

1. Install Truffle and Ganache CLI globally. If you prefer, the graphical version of Ganache works as well!
    ```javascript
    npm install -g truffle
    npm install -g ganache-cli
    ```

2. Download the box. This also takes care of installing the necessary dependencies.
    ```javascript
    truffle unbox drizzle
    ```

3. Run the development blockchain, we recommend passing in a blocktime. Otherwise, its difficult to track things like loading indicators because Ganache will mine instantly.
    ```javascript
    // 3 second blocktime.
    ganache-cli -b 3
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // If inside the development console.
    test

    // If outside the development console..
    truffle test
    ```

7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // Run Jest outside of the development console for front-end component tests.
    npm run test
    ```

8. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```javascript
    npm run build
    ```
    
 Other doxity options
```sh
  "interaction": {
    "network": "2",
    "providerUrl": "https://morden.infura.io/sign_up_to_get_a_hash"
  },
  // option to whitelist various data
  "whitelist": {
    // the keyname `all` will be used for whitelist defaults
    "all": {
      "abi": true,
      "methods": true,
      "bytecode": false, // bytecode is false or undefined, it won't be shown
      "source": false // source is false or undefined, won't be shown
    },
    "DigixMath": {
      "source": true // source code uniquely shown for this contract, bytecode still hidden
    }
  }
```

## Example

* https://gateway.ipfs.io/ipfs/QmZb7crH2YYqwvq5d2pCjZxAovzqXkhWwnEE993UM4jikk

## References

* https://github.com/slim12kg/token-zendr-react-interface 
* https://www.npmjs.com/package/classnames