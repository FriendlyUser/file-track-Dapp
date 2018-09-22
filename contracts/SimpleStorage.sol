pragma solidity ^0.4.23;

/// @dev simpleStorage
contract SimpleStorage {
  event StorageSet(
    string _message
  );

  uint public storedData;
  
  /// @param x an variable
  function set(uint x) public {
    storedData = x;

    emit StorageSet("Data stored successfully!");
  }
}
