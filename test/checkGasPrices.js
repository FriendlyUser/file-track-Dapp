const Authentication = artifacts.require('Authentication')
const FileList = artifacts.require('FileList')
var solc = require('solc')

/**
 * @file check_gasPrices.js 
 * @summary used to check for gas prices of truffle 
 * run with 
 * @example truffle exec check_gasPrices
 */
module.exports = function(callback) {

    Authentication.web3.eth.getGasPrice(function(error, result){ 
        console.log('StoreFront Deployment costs')
        var gasPrice = Number(result);
        console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"
        var AuthenticationContract = web3.eth.contract(Authentication._json.abi);
        var contractData = AuthenticationContract.new.getData({data: Authentication._json.bytecode});
        var gas = Number(web3.eth.estimateGas({data: contractData}))


        console.log("gas estimation = " + gas + " units");
        console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
        console.log("gas cost estimation = " + Authentication.web3.fromWei((gas * gasPrice), 'ether') + " ether \n");
    });

    FileList.web3.eth.getGasPrice(function(error, result){ 
        console.log()
        console.log('FileList Deployment cost.')
        var gasPrice = Number(result);
        console.log("Gas Price is " + gasPrice + " wei"); // "10000000000000"

        var FileList = web3.eth.contract(FileList._json.abi);
        var contractData = FileList.new.getData({data: FileList._json.bytecode});
        var gas = Number(web3.eth.estimateGas({data: contractData}))


        console.log("gas estimation = " + gas + " units");
        console.log("gas cost estimation = " + (gas * gasPrice) + " wei");
        console.log("gas cost estimation = " + FileList.web3.fromWei((gas * gasPrice), 'ether') + " ether");

    });
};