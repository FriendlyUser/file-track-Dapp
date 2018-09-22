pragma solidity ^0.4.23;

// import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/// @author TutorialToken 
contract TutorialToken {
  string public name = "TutorialToken";
  string public symbol = "TT";
  uint public decimals = 2;
  uint public INITIAL_SUPPLY = 12000;
  
  /// @dev cool stuff
  constructor() public {
    // totalSupply_ = INITIAL_SUPPLY;
    // balances[msg.sender] = INITIAL_SUPPLY;
  }
}
