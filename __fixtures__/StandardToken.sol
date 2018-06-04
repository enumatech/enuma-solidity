pragma solidity ^0.4.23;

import './Token.sol';

contract StandardToken is Token {
  uint256 public totalSupply;

  function transfer(address _to, uint256 _value) public returns (bool success);
}
