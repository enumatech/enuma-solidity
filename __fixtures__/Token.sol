pragma solidity ^0.4.23;

import './SafeMath.sol';

contract Token {
  function balanceOf(address _owner) public view returns (uint256 balance);
}
