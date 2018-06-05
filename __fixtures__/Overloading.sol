pragma solidity ^0.4.23;

contract Overload {
  function f(uint _in) public pure returns (uint out);
  function f(uint _in, bytes32 _key) public pure returns (uint out);
}
