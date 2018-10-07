const Authentication = artifacts.require("./Authentication.sol");

contract('Authentication', function(accounts) {

  it("...should sign up and log in a user.", function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance;

      return authenticationInstance.signup('testuser', {from: accounts[0]});
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function(userName) {
      assert.equal(web3.toUtf8(userName), 'testuser', "The user was not signed up.");
    });
  });
  it("...should update the existing user.", function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance
      
      return authenticationInstance.update('coolUser');
    }).then(function() {
      return authenticationInstance.login.call();
    }).then(function(userName) {
      assert.equal(web3.toUtf8(userName), 'coolUser', "The user was not signed up.");
    });
  });
  
  it("...should destroy the existing user.", function() {
    return Authentication.deployed().then(function(instance) {
      authenticationInstance = instance
      
      return authenticationInstance.destroy();
    }).then(function() {
      // assert.equal(web3.toUtf8(userName), 'testuser', "The user was not signed up.");
    });
  });
});