var FileList = artifacts.require("FileList")
var Authentication = artifacts.require("Authentication")
module.exports = function(deployer) {
  deployer.deploy(FileList)
  deployer.deploy(Authentication)
};
